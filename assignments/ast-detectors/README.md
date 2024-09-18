# Assignment 1: Writing an AST-based detector

The goal of the first assignment is to write a simple AST-based detector for [Misti](https://github.com/nowarp/misti) to set up the environment and become familiar with the detectors' API.

## Context

[Misti](https://nowarp.io/tools/misti) is a static analyzer for the [Tact](https://tact-lang.org) smart-contract language. Some details about it:

- It has a small source code base written in TypeScript.
- It targets a statically-typed language used in production.
- It is well-documented; the [documentation](https://nowarp.io/tools/misti/docs/next/) and the [API reference](https://nowarp.io/tools/misti/api/) are available.
- It provides an API to write custom detectors to implement AST-based, dataflow, and Datalog-based analyses.

All of this enables us to practice writing simple analyses on a small yet real-world project.

## Assignment steps

1. **Choosing a task:** Choose [one of the issues labeled `assignment-1`](https://github.com/Static-Homeworks-CUB/fall2024/issues?q=label%3A%22assignment-1%22) or suggest your own detector:
   <details>
   <summary>Suggesting your own detector</summary>

   You can suggest your own AST-based detector: [https://github.com/Static-Homeworks-CUB/fall2024/issues/new?assignees=jubnzv&labels=triage%2Cassignment-1&projects=&template=assignment-1-suggestion.md](https://github.com/Static-Homeworks-CUB/fall2024/issues/new?assignees=jubnzv&labels=triage%2Cassignment-1&projects=&template=assignment-1-suggestion.md).
   The detectors used in the first assignment should be simple and use the program's AST representation.

   They don't have to address real-world problems, but it is always beneficial if your detector represents an idea applicable to real-world projects.
   You can get inspiration for such detectors by reading various coding standards and the documentation of other static analyzers.

   - MISRA C/C++ and AUTOSAR C++ rules: coding standards used in development of embedded safety-critical systems
   - Slither detector documentation: [https://github.com/crytic/slither/wiki/Detector-Documentation](https://github.com/crytic/slither/wiki/Detector-Documentation)
   - SmartCheck rules: [https://github.com/smartdec/smartcheck](https://github.com/smartdec/smartcheck)

   If you have any idea, please [create an issue](https://github.com/nowarp/misti/issues/new?assignees=&labels=triage&projects=&template=assignment-1-suggestion.md&title=), and we will approve it ASAP.

   </details>

2. **Assigning the issue:** Assign yourself to the chosen issue in the GitHub interface: ![](../../img/assign-github.png)
3. **Examining the source code:** Examine the source code in this directory. You could take a look at [the `SingleLetterIdentifier` detector](./single-letter-identifier) here as an example.
4. **Writing the detector:** Create your own detector following the same code structure as the existing ones.
5. **Writing tests:** Write unit tests to show that your implementation works correctly. Use `*.spec.ts` files in this directory as an example.
6. **Running linters and tests:** Ensure the ESLint linter and the Prettier formatter don't report on your code and your detector passing tests: `yarn test-all`
7. **Committing changes:** Commit and push changes to your fork. Create a pull request to the main repo: [https://github.com/Static-Homeworks-CUB/fall2024/pulls](https://github.com/Static-Homeworks-CUB/fall2024/pulls)

## Resources

1. https://nowarp.io/tools/misti/docs/next/ – Misti Documentation
2. https://nowarp.io/tools/misti/api/ – Misti API reference
3. https://docs.tact-lang.org/ – Tact Documentation
4. https://github.com/tact-lang/tact/blob/main/src/grammar/ast.ts – Tact AST
