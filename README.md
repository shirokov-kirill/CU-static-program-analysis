# Static Program Analysis: Fall2024 Assignments

## Assignments
* [Assignment 1: Writing an AST-based Detector](./assignments/ast-detectors/README.md)

## Submitting assignments

We follow the classic [forking workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/forking-workflow) style, commonly used in software engineering. Here is a breakdown:

1. Fork this repository on GitHub.
2. Clone your fork:
```bash
git clone https://github.com/your-username/fall2024 && cd fall2024
```
3. Create a new Git branch for your assignment:
```bash
git checkout -b <issue-number>-<assignment-name>
```
4. Write your code, commit the changes, and push them to your fork:
```bash
git push origin <issue-number>-<assignment-name>
```
5. Create a PR in the original repository: https://github.com/Static-Homeworks-CUB/fall2024/pulls
6. Ensure there are no issues reported by the CI.

## Assignment eligibility criteria
When reviewing assignment PRs, we consider the following criteria:
1. **Code implements the desired logic and builds successfully.**
2. **No issues reported by the CI:** We run ESLint and Prettier on GitHub actions.
3. **Source code is covered by unit tests:** Include unit tests that demonstrate the code works as expected.
4. **Source code is commented:** Add readable docstrings where needed. Excessive comments often indicate poor design unless the code is particularly complex.
5. **Implementation follows design best practices:** Code should be well-structured, with meaningful variable and function names. Avoid dead code and unneeded essential complexity.

These practices are typical and essential when developing real-world projects.
