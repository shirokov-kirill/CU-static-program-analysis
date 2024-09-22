import { ASTDetector } from "@nowarp/misti/dist/src/detectors/detector";
import { CompilationUnit } from "@nowarp/misti/dist/src/internals/ir";
import {
  MistiTactWarning,
  Severity,
} from "@nowarp/misti/dist/src/internals/warnings";
import {
  AstContract,
  AstFieldDecl,
  AstStatement,
} from "@tact-lang/compiler/dist/grammar/ast";

/**
 * This detector highlights the use of single-letter identifiers, including constants,
 * contract fields, function names and arguments, and local variables.
 *
 * ## Why is it bad?
 * Single-letter names are usually less readable and make code harder to understand.
 *
 * ## Example
 * ```tact
 * fun calculateFee(a: Int): Int {
 *   let f: Int = (a * 2) / 100;
 *   return f;
 * }
 * ```
 *
 * Use instead:
 * ```tact
 * fun calculateFee(amount: Int): Int {
 *   let fee: Int = (amount * 2) / 100;
 *   return fee;
 * }
 * ```
 */
export class ReadonlyFieldIdentifier extends ASTDetector {
  warnings: MistiTactWarning[] = [];
  fields: [AstContract, AstFieldDecl, boolean][] = [];

  async check(cu: CompilationUnit): Promise<MistiTactWarning[]> {
    this.checkFields(cu);
    return this.warnings;
  }

  /**
   * Finds all fields of all the contracts defined in the compilation unit.
   */
  private checkFields(cu: CompilationUnit): void {
    const fields = new Map<AstContract, AstFieldDecl[]>();
    Array.from(cu.ast.getContracts()).forEach((contract) => {
      cu.ast.getContractFields(contract.id)?.forEach((field) => {
        if (!fields.has(contract)) {
          fields.set(contract, []);
        }
        fields.get(contract)?.push(field);
      });
    });

    for (const contract of fields.keys()) {
      const assignments: AstStatement[] = [];
      cu.ast.getMethods(contract.id)?.forEach((methodId) => {
        cu.ast
          .getFunction(methodId)
          ?.statements.filter(
            (it) =>
              it.kind === "statement_assign" ||
              it.kind === "statement_augmentedassign",
          )
          .forEach((assignment) => {
            assignments.push(assignment);
          });
      });

      const fieldNamesNotUsed: Set<string> = new Set();
      fields
        .get(contract)
        ?.map((field) => field.name.text)
        .forEach((name) => fieldNamesNotUsed.add(name));

      assignments.forEach((assignment) => {
        const name = this.tryExtractNameFromAssignment(assignment);
        if (fieldNamesNotUsed.has(name)) fieldNamesNotUsed.delete(name);
      });

      fields
        .get(contract)
        ?.filter((field) => fieldNamesNotUsed.has(field.name.text))
        .forEach((field) => {
          this.warnings.push(
            this.makeWarning(
              `Field ${field.name.text} should have a more meaningful name`,
              Severity.INFO,
              field.loc,
            ),
          );
        });
    }
  }

  private tryExtractNameFromAssignment(assignment: AstStatement): string {
    const content = assignment.loc.contents;
    if (assignment.kind == "statement_assign") {
      let fieldName = content.startsWith("this.")
        ? content.replace("this.", "")
        : content;
      fieldName = fieldName.split("=")[0].trimEnd();
      return fieldName;
    } else if (assignment.kind == "statement_augmentedassign") {
      let fieldName = content.startsWith("this.")
        ? content.replace("this.", "")
        : content;
      fieldName = fieldName.split(/[+-/*//%]=/)[0].trimEnd();
      return fieldName;
    } else {
      return "";
    }
  }
}
