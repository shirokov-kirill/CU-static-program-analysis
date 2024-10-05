import { ASTDetector } from "@nowarp/misti/src/detectors/detector";
import { CompilationUnit } from "@nowarp/misti/src/internals/ir";
import {
  MistiTactWarning,
  Severity,
} from "@nowarp/misti/src/internals/warnings";
import {
  AstContract,
  AstFieldDecl,
  AstStatement,
} from "@tact-lang/compiler/dist/grammar/ast";

export class ReadonlyFieldIdentifier extends ASTDetector {
  warnings: MistiTactWarning[] = [];
  fields: [AstContract, AstFieldDecl, boolean][] = [];

  async check(cu: CompilationUnit): Promise<MistiTactWarning[]> {
    this.checkFields(cu);
    return this.warnings;
  }

  private checkFields(cu: CompilationUnit): void {
    const fields_loc = new Map<AstContract, AstFieldDecl[]>();
    Array.from(cu.ast.getContracts()).forEach((contract) => {
      cu.ast.getContractFields(contract.id)?.forEach((field) => {
        if (!fields_loc.has(contract)) {
          fields_loc.set(contract, []);
        }
        fields_loc.get(contract)?.push(field);
      });
    });

    for (const contract of fields_loc.keys()) {
      const assignments: AstStatement[] = [];
      cu.ast.getMethods(contract.id)?.forEach((methodId) => {
        cu.ast
          .getFunction(methodId)
          ?.statements.filter((it) => {
            return (
              it.kind === "statement_assign" ||
              it.kind === "statement_augmentedassign"
            );
          })
          .forEach((assignment) => {
            assignments.push(assignment);
          });
      });

      const fieldNamesNotUsed: Set<string> = new Set();
      fields_loc
        .get(contract)
        ?.map((field) => field.name.text)
        .forEach((name) => fieldNamesNotUsed.add(name));

      assignments.forEach((assignment) => {
        const name = this.tryExtractNameFromAssingment(assignment);
        if (fieldNamesNotUsed.has(name)) fieldNamesNotUsed.delete(name);
      });

      fields_loc
        .get(contract)
        ?.filter((field) => fieldNamesNotUsed.has(field.name.text))
        .forEach((field) => {
          this.warnings.push(
            this.makeWarning(
              `Field ${field.name.text} is not modified. Can be made readonly`,
              Severity.INFO,
              field.loc,
            ),
          );
        });
    }
  }

  private tryExtractNameFromAssingment(assignment: AstStatement): string {
    const content = assignment.loc.contents;
    if (assignment.kind === "statement_assign") {
      let fieldName = content.startsWith("self.")
        ? content.replace("self.", "")
        : content;
      fieldName = fieldName.split("=")[0].trimEnd();
      return fieldName;
    } else if (assignment.kind === "statement_augmentedassign") {
      let fieldName = content.startsWith("self.")
        ? content.replace("self.", "")
        : content;
      fieldName = fieldName.split(/[+-/*//%]=/)[0].trimEnd();
      return fieldName;
    }
    return "";
  }
}
