import { ASTDetector } from "@nowarp/misti/dist/src/detectors/detector";
import { CompilationUnit } from "@nowarp/misti/dist/src/internals/ir";
import {
  MistiTactWarning,
  Severity,
} from "@nowarp/misti/dist/src/internals/warnings";
import { forEachStatement } from "@nowarp/misti/dist/src/internals/tactASTUtil";

/**
 * The detector that highlights variable definitions that use local type inference.
 *
 * ## Context
 * Tact supports local type inference for variables. This means the developer can write both:
 * ```tact
 * let a: Int = 42;
 * let a = 42;
 * ```
 *
 * This detector should highlight untyped `let` definitions, as the explicit definition
 * may be more readable.
 *
 * ## Example
 * ```tact
 * let a = 42; // Highlighted
 * ```
 *
 * Use instead:
 * ```tact
 * let a: Int = 42;
 * ```
 */
export class UntypedLetDetector extends ASTDetector {
  warnings: MistiTactWarning[] = [];

  async check(cu: CompilationUnit): Promise<MistiTactWarning[]> {
    this.checkLocalVariables(cu);
    return this.warnings;
  }

  private checkLocalVariables(cu: CompilationUnit): void {
    cu.ast.getProgramEntries().forEach((entry) => {
      forEachStatement(entry, (stmt) => {
        if (stmt.kind === "statement_let" && stmt.type == null) {
          this.warnings.push(
            this.makeWarning(
              `Local variable ${stmt.name.text} should have explicit type`,
              Severity.INFO,
              stmt.loc,
            ),
          );
        }
      });
    });
  }
}
