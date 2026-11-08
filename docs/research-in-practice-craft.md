# Research in Practice: research communication techniques

This is the detailed reference supporting the [editorial principles](research-in-practice.md). Consult the sections relevant to the piece; it is not an article template or a list of components to include. Narrative patterns, tables, controls and depth arrangements are techniques to choose, adapt or omit. Evidence integrity and accessible, truthful presentation remain requirements whenever those techniques are used.

## Plan only enough to establish the argument

In a short editorial brief, answer: **What should the reader understand differently after reading this piece?** Describe the initial intuition and the intended understanding, then identify the selected evidence, independent interpretation and evidence boundary. A next action can follow, but does not replace the change in understanding. Add figure or interaction plans only when they serve that distinction. A brief need not become a separate deliverable for a small revision. Do not begin with screens and retrofit a thesis.

## Two primary readers, one coherent argument

| Reader | Starting position | What the piece should provide |
| --- | --- | --- |
| CTO or engineer | Technically capable; may lack time or familiarity with the paper. Wants to judge relevance to a system. | Understand what was tested, identify a relevant opportunity or trade-off, and understand what to reconsider, investigate or do differently. Distinguish a useful hypothesis from a deployment recommendation. |
| Researcher or research-oriented engineer | Can read papers but wants to connect aggregate results to behavior, assumptions and further investigation. | Understand the proposed mechanism, assess the evidence supporting it, recognize alternative explanations and identify what would establish transfer or distinguish competing explanations. |

Use one central question and shared evidence, with different depths of inspection. A builder may need to reconsider a system choice or choose a comparison; a researcher may need to question an assumption, distinguish explanations or recognize what the evidence cannot determine. Let both inspect the same result without forcing identical reading depth. Do not split them into disconnected audience modes.

Both readers deserve plain language and substantive analysis. Do not create an elementary main path with all consequential qualifications hidden in an advanced mode. Equally, do not make statistical terminology or exhaustive methodological detail the price of entry.

Students and other readers can benefit, but introductory instruction is not the organizing purpose. Research depth comes from the reasoning and evidence, not from the density of technical vocabulary.


## Choose the evidence that serves the argument

Start with a question the research helps examine. Explain why it matters before introducing an abstract thesis or a list of contributions. The opening should let readers recognize what they will understand differently by continuing.

Choose the paper's findings according to that question. Do not turn every contribution into a section or reproduce the paper's order automatically. A predictor, scaling rule or historical model comparison can be scientifically interesting without belonging in this piece's main path. Omit or link secondary material when it adds more explanation burden than insight.

Preserve enough context to distinguish the selected reading from an exhaustive recap. State which contributions are outside scope where their omission could otherwise mislead.

Use the study's actual tasks, procedures or observations as the concrete foundation when they provide the clearest entry. A business story is optional. Adding a fictional company or role does not itself establish practical relevance. Reject examples that require readers to learn an unfamiliar workflow before they can understand the research question.

Do not replace the source's mechanism with an easier toy mechanism. A constructed example may explain an information boundary, but its authored outcomes cannot establish comparative system performance.


## Explain the work before interpreting the result

Readers need to understand what the study examined and what its observations mean. For the study procedures, tasks or observations that matter to the argument, explain:

- What request or input the system receives.
- What information and tools it can use, and what actions it must perform.
- What result counts as success and how that result is checked.
- What baseline and alternatives are compared, and what is held constant.
- Which sample, model range or environment limits affect the comparison.

Describe evaluation in observable terms: the actions, outputs or observations that are checked and the criteria used. An abstract statement that outputs match expectations leaves the relevant procedure implicit.

Introduce the essential context locally before an important result. When a full inventory would delay the argument, signpost it as optional depth while keeping consequential limits beside the claim. Use exact names consistently so readers can connect explanations to evidence. A compact table can help when several procedures must be compared; it is not a required format.

Introduce a proposed explanation before relying on it, and return to it with evidence that could challenge it. Describe inferred properties as hypotheses or interpretations rather than inventing a score or binary label. Repeated material should develop the argument rather than duplicate an earlier table.

## Write in plain, precise language

Explain what actually happens. When introducing an unfamiliar process, measurement, or comparison, make it possible for a technically capable reader to reconstruct the relevant actions. Identify who or what acts, what changes, what is measured, and why it matters. Replacing a technical term with another abstract expression does not count as an explanation.

Apply this test particularly to figure introductions, comparisons, and proposed experiments. Do not explain terminology that the reader does not need to understand the argument.

Use concrete actors and verbs. Define an overloaded term when its meaning changes the interpretation. Introduce the technical distinction after readers can recognize the behavior it describes. The [worked examples](research-in-practice-examples.md#concrete-language-in-the-agent-collaboration-essay) show how this test was applied to one article.

Headings should orient readers to the question or evidence in the section. Avoid slogans that sound insightful before their meaning has been established. Use exact task names when discussing a measured contrast.

Define unfamiliar metrics before relying on them. Explain a statistical qualification in terms of what it changes about the inference. Keep the assumption that changes the conclusion in the main path; reserve derivations and secondary details for optional depth.


## Make comparisons understandable at a glance

Before a figure, identify the comparison: which tasks, baseline, alternatives and measurement are involved. Readers should not have to infer the experiment from the controls or legend.

When many alternatives are compared, consider an overview before detailed inspection. An overview may show the range across alternatives with the reference visible, followed by a detailed view of one alternative. Add that context when it answers a useful question; it is not required for every figure.

For important numbers, specify the unit, denominator, aggregation and relevant uncertainty:

- Absolute success percentages, relative percentage changes and percentage-point differences are different quantities.
- An average across groups differs from pooling all individual observations.
- The best average alternative differs from selecting a winner separately for every case.
- A maximum allowance differs from realized use; a proxy for effort differs from time or financial cost.
- A failed final result differs from an intermediate mistake that may later be corrected.

Label selected extremes and their selection rule. Do not imply that a small observed gap establishes a reliable ranking. Keep the baseline visible when switching candidates, and do not combine an overview and a detailed figure in a way that silently changes populations or units.

Use reported costs and error measurements when they materially explain the trade-off. If the paper supplies only a proxy or an aggregate, say what it can and cannot establish for a particular product. Do not convert a proxy into a different outcome or cost without supporting evidence.


## Preserve the evidence-to-interpretation boundary

Keep these roles recognizable through wording, captions, sources and design:

| Role | Requirement |
| --- | --- |
| Measured finding | State the comparison, conditions and population; point to supporting data or the relevant source passage. |
| Authors' explanation | Identify the proposed mechanism and whether the study isolates it. |
| Personal interpretation | Explain the consequential distinction the author sees and why it could change the reader’s reasoning. |
| Proposed next test | Name the uncertainty, comparator, changed condition and evidence that would distinguish outcomes. |

Explain why each material limit matters rather than accumulating generic cautions. Association, isolated causation, within-domain prediction and transfer to a new task answer different questions. A fitted threshold is not automatically a universal operating rule. If a predictor matters to the central question, explain what it gives the reader a reason to retest, identify its validation population and separate within-domain usefulness from transfer to a new workflow. Do not omit a decision-relevant finding solely because its limitations require explanation, or turn its numerical threshold into an adoption rule.

State a bounded personal interpretation that organizes the evidence, including what the author finds consequential or surprising. Methodologically sound testing advice is useful but does not replace that interpretive contribution. Use local labels and layout to distinguish evidence, explanation and proposed tests without making every paragraph repeat all caveats.

Give substantial author interpretation an editorial treatment distinct from reported evidence. A restrained contrast in background, typography or placement can help. The distinction should remain clear in the prose and without color. Avoid badges on every paragraph or visually promoting speculation above the supporting evidence.

A high headline accuracy needs an understandable target and validation population. Verify the aggregation or selection procedure supporting important claims. If a statistic cannot be reconstructed, identify it as the authors' reported aggregate and state the unresolved detail; do not imply a complete audit.


## Develop a bounded comparison when the conclusion calls for one

Use this section when the article leads to an empirical choice. A reinterpretation of a metric, a hidden assumption or an unresolved explanation may be a sufficient consequence without a new experiment.

Translate the evidence into a test specific enough to evaluate. Name the relevant population, reference condition, changed condition, available information, outcome and controls. Specify the actual intervention rather than giving it only a label.

Separate questions that require different evidence. A quality comparison under a matched resource ceiling does not by itself establish a useful production cost–quality–latency trade-off. A changed system outperforming its reference does not isolate which of several changed behaviors produced the gain.

Include a simpler comparator when it would distinguish the mechanism. Inspect both intended benefits and newly introduced failures; the [worked examples](research-in-practice-examples.md#evaluation-choices-for-this-article) illustrate this for answer checking.

Diagnose failure types on development examples, then evaluate on fresh, predefined tasks. Do not silently select a held-out population after seeing where the baseline fails and report its gain as overall performance. A deliberately difficult subset is valid when its selection and narrower target are explicit.

Define worthwhile improvements and practical limits before inspecting held-out results where appropriate. Examine repeated-run variation, uncertainty and failure cases; do not invent sample-size guarantees or promote a small observed gain into a recommendation.


## Build one connected reading experience

Let the structure follow the evolution of the reader’s understanding. Possible patterns include:

- A system choice → contrasting outcomes → possible explanations → a comparison worth running.
- An impressive score → what the metric actually measures → a mismatch → a revised meaning of progress.
- A reasonable expectation → an unexpected failure → competing explanations → what remains unresolved.
- An unanswered question → one revealing experiment → the inference it permits and the boundary it leaves.

These are examples, not prescribed sequences or a menu that exhausts the form. Use the order that develops this piece’s insight. Each section should answer or sharpen a question raised earlier. Keep the consequential question recognizable; introduce connections where they would otherwise be unclear.

Introduce an idea before using it to explain an outcome. Keep names, reference points and task descriptions consistent across sections. Make direct arrivals to a figure understandable without forcing a guided tour.

Control the reading burden. Compress recurring explanations, combine overlapping implication passages, and omit an additional diagram if its caption and surrounding prose already do its job. A conceptual diagram should occupy space proportional to what it explains; do not give an illustrative allocation the visual weight of a main empirical result.

One clearly marked editorial synthesis may serve the piece better than repeated implication tables. Keep the consequential limits near the findings even when the proposed evaluations are consolidated later. The ending should answer the opening question at the strength the evidence permits, rather than repeat every section.


## Let visuals and interaction earn their place

Use visuals to expose a relationship that is harder to inspect in prose: comparisons, dependencies, information loss, resource use or a validation boundary. Do not add arrows that merely restate the explanation or imply that a hypothesized mechanism has already been demonstrated.

An interaction should have a reason to be used: name the question a reader can investigate and the relationship that changes with the selection. Filtering a chart is useful for evidence inspection but does not by itself create exploration. A small selector can connect a recognizable problem to relevant evidence, a counterexample, a next comparison and its limit. Preserve the selected problem while the reader examines those elements. Label authored decision paths as interpretations, not measured predictions or an automated recommendation. For authored text paths, keep the content available without JavaScript; this is a fallback for that technique, not a requirement to add paths.

Prefer static figures when they communicate the relationship fully. Use interaction when readers benefit from isolating a candidate or inspecting a different condition while retaining context. State what can be learned by changing the control.

For a small set of important alternatives, prefer visible, directly selectable buttons with clear selection states over a dropdown that hides the available comparisons. Use a dropdown when the number or structure of options warrants it, not as the automatic control for a figure.

No required prediction, staged revelation, scoring, audience toggle or replay loop follows from this format. Avoid fake selectors, invented performance curves and simulations presented as observed behavior. Clearly label constructed examples and conceptual allocations.

