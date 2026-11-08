# Research in Practice: worked editorial examples

These examples document editorial choices for particular articles. They are a reference for reasoning, not additional requirements, a reusable screen sequence or evidence that readers understood the result. The [core editorial standard](research-in-practice.md) owns the principles; [research communication techniques](research-in-practice-craft.md) owns the general methods.

## Agent collaboration: the intended change in understanding

Article: [When does adding agents help?](../posts/when-does-adding-agents-help/index.html).

- **Before:** More agents can bring additional capabilities and improve performance.
- **After:** The benefit depends partly on whether separate work produces useful information or introduces coordination difficulties, and this needs to be evaluated against a capable baseline.

This describes a change in the reader’s mental model, rather than only an instruction to run a test. It is the intended outcome of the article, not an observed comprehension result.

## Why the Finance Agent–PlanCraft contrast carries this article

The opening compares the same centralized arrangement on Finance Agent and PlanCraft. Short task descriptions establish what the agents do and how success is checked before the results are interpreted. The diagrams distinguish separate investigations from ordered inventory actions. They illustrate a possible explanation; the benchmark contrast does not isolate its cause.

BrowseComp-Plus challenges the simplest interpretation: it also involves multiple information sources, yet its gains differ. The full benchmark inventory and architecture comparisons remain available at another depth. A “What might be split?” column describes possible task structure, not a measured decomposability score or a uniform property of every task.

For this article, the reading order moves from the decision through the contrast and possible explanations to cost, proposed tests and research detail. That order serves this question. An article about a misleading metric, an unexpected scientific result or an unresolved theoretical issue may need a different structure; it does not inherit this sequence.

## Concrete language in the agent-collaboration essay

| Editorial problem | Choice in this article | Why the detail matters |
| --- | --- | --- |
| “State is visible” leaves the action implicit. | Say that the agent can inspect the current inventory and look up the recipe directly. | Readers can understand which checks delegation would add. |
| “Budget ceilings were aligned” compresses the comparison conditions. | Explain that one agent and the team have the same total reasoning-token allowance, shared across the team. | Readers can assess the resource comparison. |
| “A turn is an execution step” substitutes one abstraction for another. | Use the paper’s definition of reasoning turns as reasoning–response exchanges and distinguish counts from tokens, time and financial cost. | The overhead chart must not be read as a bill or latency measurement. |
| “Outputs are combined” omits the actor. | State that the system combines independent agents’ answers without peer review or discussion. | Readers can distinguish independence from having no aggregation. Do not invent voting or synthesis details. |
| “Held-out evaluation” assumes methodological familiarity. | Describe representative tasks not used to develop the workflow, and repeated runs to inspect variation. | Readers can distinguish evaluation from improvement on familiar examples. |

These examples illustrate the concrete-language test, not a requirement to explain every technical term. Explain a term when its meaning affects the finding, implication or limit.

## Evaluation choices for this article

The proposed comparisons name assignments and aggregation when dividing research, and compare a separate reviewer with the original agent checking its own answer. The checking matrix records corrections, unresolved errors, newly introduced errors and retained correctness. It is a proposed evaluation, not reported study outcomes.

The article distinguishes a matched token allowance from actual usage, model and tool charges, and elapsed time. Its benchmark averages and selected architecture extremes require an explicit aggregation rule. These details matter here because they affect the architecture comparison; another paper should select its own consequential controls and measurements.

The three workflow-problem buttons connect a recognizable difficulty to evidence, a proposed comparison and its limit. They select authored interpretations rather than predict performance. The architecture buttons retain a single-agent reference while readers inspect alternatives. Neither control is a default requirement for future essays.
