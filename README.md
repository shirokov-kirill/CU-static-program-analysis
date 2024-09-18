# Static Program Analysis: Fall2024 Assignments

## Assignments
* [Assignment 1: Writing an AST-based Detector](./assignments/ast-detectors/README.md)

## Getting started
The instructions below assume you are working on a Unix-like system, preferably Linux.

### Using docker
If you don't want to waste your time on setting up the Node.js development environment, you could use the prepared docker container:

```bash
docker pull jubnzv1/cub-fall2024:latest
```

Then you could introduce your changes in the `assignments` directory and switch to the Docker container in order to build the project:
```bash
docker run -it --rm -v $(pwd)/assignments:/home/student/assignments cub-fall2024
```

In the docker container the following commands are available:
* `yarn build` – Build the project
* `yarn fmt` – Check formatting
* `yarn lint` – Run ESLint
* `yarn test ./assignments/your-detector.spec.ts` – Run your unit tests
* `yarn misti --detectors ./assignments/your-detector.ts:YourDetectorClassName /path/to/contract.tact` – Running Misti solely with your detector

### Installing locally
1. Install Node.js version 22 or higher. You can do this using `nvm`:
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
nvm install v22.2.0 && nvm alias default v22.2.0
```
2. Install Soufflé according to the [official installation instructions](https://souffle-lang.github.io/install)
3. Install Yarn: `npm install -g yarn`
4. Install the latest version of Misti:
```
git submodule update --init --recursive
pushd ./deps/misti/
yarn install && yarn build
popd
```
5. Build the npm dependencies: `yarn install`

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
6. Ensure there are no issues reported by CI.

## Assignment eligibility criteria
When reviewing assignment PRs, we consider the following criteria:
1. **Code implements the desired logic and builds successfully.**
2. **No issues reported by the CI** We run ESLint and Prettier on GitHub actions.
3. **Source code is covered by unit tests:** Include unit tests that demonstrate the code works as expected.
4. **Source code is commented:** Add readable docstrings where needed. Excessive comments often indicate poor design unless the code is particularly complex.
5. **Implementation follows design best practices:** Code should be well-structured, with meaningful variable and function names. Avoid dead code and unneeded essential complexity.

These practices are typical and essential when developing real-world projects.
