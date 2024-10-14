# Assignment 2: Writing a Gen-Kill Analysis

The goal of the second assignment is to write a gen-kill analysis for Tact using the Misti API.

Use the environment configured for [the previous assignment](../1-ast-detectors/README.md).

## Assignment Steps

1. **Choosing a task:** Choose [one of the unassigned issues labeled `assignment-2`](https://github.com/Static-Homeworks-CUB/fall2024/issues?q=is%3Aissue+is%3Aopen+no%3Aassignee) or [suggest your own detector](https://github.com/Static-Homeworks-CUB/fall2024/issues/new):

   <details>
   <summary>Suggesting your own detector</summary>

   You can find other examples of gen-kill analyses in textbooks, papers, and other compiler/analyzer implementations. Just ensure it is suitable for Tact.

   Textbooks to look at:
   - The Dragon Book (especially ch. 9)
   - [Static Program Analysis](https://cs.au.dk/~amoeller/spa/spa.pdf) by Anders Møller and Michael I. Schwartzbach (2024) – some of the algorithms suggested in ch. 5 can be implemented using the gen-kill approach
   - Khedker – Dataflow Analysis, ch. 3

   </details>

2. **Assigning the issue:** Comment on the chosen GitHub issue that you're taking it.
3. **Examining the source code:** Examine the source code in this directory. You can look at [the `LiveVariables` analysis](./liveVariables) as an example. For this task, we are only interested in printing analysis results, without generating any warnings.

Then, follow the workflow from the previous assignment to accomplish the task.
