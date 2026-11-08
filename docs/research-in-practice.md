# Research in Practice editorial guideline

**Research in Practice** is a critical research essay that helps readers understand a study, interpret its findings and see what those findings give them a reason to do or investigate next. Published evidence is the foundation; plain explanations, figures and selective interaction make its meaning accessible.

Its promise is: **understand the finding, see what it changes, and know what evidence is still missing.** A piece should be approachable without becoming shallow, and useful without pretending that a benchmark result settles a product decision.

This document owns the format's editorial standard. It is not a certification of an existing prototype or a requirement to create a new published collection. See the [documentation index](README.md) for related guidance.

## Editorial purpose: let the reader investigate a consequential question

Let the reader’s decision or research question determine which evidence appears, in what order and at what depth. The reader should encounter practical relevance before having to reconstruct the experiment. A shorter account of a paper is not sufficient. The piece adds value by connecting a finding to its implications for building, evaluating or understanding a system. The distinction developed in [The Executive Summary Is Not a Summary](../posts/the-executive-summary-is-not-a-summary/index.html) is relevant here: reporting the analysis and explaining what changes because of it serve different purposes.

For each main finding, the reasoning should answer:

- **What changes?** Which expectation, design assumption, evaluation priority or research interpretation should the reader reconsider?
- **What could be tested next?** Which bounded comparison or measurement would address the uncertainty that matters?
- **What evidence is missing?** What prevents the result from supporting a stronger conclusion or transferring to a new setting?

These are responsibilities of the argument, not a mandatory three-row table. Develop them beside the relevant evidence, combine them where findings share an implication, or synthesize them in one clearly identified editorial passage. Do not repeat the same explanation in prose, a callout and a closing checklist.

An implication can justify retaining a baseline, collecting better measurements, trying an alternative or withholding judgment. It need not recommend adoption. A proposed test should follow from a specific finding and uncertainty; “test this on your data” alone does not add enough interpretation.

## Two primary readers, one coherent argument

| Reader | Starting position | What the piece should provide |
| --- | --- | --- |
| CTO or engineer | Technically capable; may lack time or familiarity with the paper. Wants to judge relevance to a system. | Understand what was tested, identify a relevant opportunity or trade-off, and justify a next comparison or measurement. Distinguish a useful hypothesis from a deployment recommendation. |
| Researcher or research-oriented engineer | Can read papers but wants to connect aggregate results to behavior, assumptions and further investigation. | Understand the proposed mechanism, assess the evidence supporting it, recognize alternative explanations and identify what would establish transfer or distinguish competing explanations. |

Use one central question and shared evidence, with different depths of inspection. A builder may need a comparison worth running and criteria for accepting it; a researcher may need a falsifiable explanation and a way to distinguish alternatives. Let both inspect the same result without forcing identical reading depth. Do not split them into disconnected audience modes.

Both readers deserve plain language and substantive analysis. Do not create an elementary main path with all consequential qualifications hidden in an advanced mode. Equally, do not make statistical terminology or exhaustive methodological detail the price of entry.

Students and other readers can benefit, but introductory instruction is not the organizing purpose. Research depth comes from the reasoning and evidence, not from the density of technical vocabulary.

## Choose the evidence that serves the argument

Start with a question the research helps examine. Explain why it matters before introducing an abstract thesis or a list of contributions. The opening should let readers recognize what they will understand differently by continuing.

Choose the paper's findings according to that question. Do not turn every contribution into a section or reproduce the paper's order automatically. A predictor, scaling rule or historical model comparison can be scientifically interesting without belonging in this piece's main path. Omit or link secondary material when it adds more explanation burden than insight.

Preserve enough context to distinguish the selected reading from an exhaustive recap. State which contributions are outside scope where their omission could otherwise mislead.

Use the study's actual tasks, procedures or observations as the concrete foundation when they provide the clearest entry. A business story is optional. Adding a fictional company or role does not itself establish practical relevance. Reject examples that require readers to learn an unfamiliar workflow before they can understand the research question.

Do not replace the source's mechanism with an easier toy mechanism. A constructed example may explain an information boundary, but its authored outcomes cannot establish comparative system performance.

## Explain the work before interpreting the result

Readers need to understand what the evaluated system had to do. For the benchmarks or task groups that matter to the argument, explain:

- What request or input the system receives.
- What information and tools it can use, and what actions it must perform.
- What result counts as success and how that result is checked.
- What baseline and alternatives are compared, and what is held constant.
- Which sample, model range or environment limits affect the comparison.

Describe evaluation in observable terms. “Compare tool actions with expected actions” leaves too much implicit; explain whether the evaluator checks tool calls, their order or inputs, a resulting environment state, a final answer or tests of a code change. Distinguish performing an action from merely describing it.

Give benchmarks unequal prominence when their roles differ. A contrasting pair can carry the argument; a third can challenge the apparent explanation. Introduce the task and success criterion locally before showing each important result. Keep the complete benchmark inventory and architecture definitions in a clearly signposted research-depth section when learning them all would delay the central question. Essential limits must remain beside the claim.

A compact table can introduce several benchmarks more efficiently than separate essays. Use familiar task descriptions; a benchmark name is not an explanation. Use exact benchmark names in later headings and comparisons so readers can connect the discussion to the table.

### Introduce a question early and return to it with evidence

When task structure matters, introduce possible independent work, ordered steps, shared state or verification requirements before using those concepts to explain performance. A short “What might be split?” column can prepare the reader for the later comparison.

Present these descriptions as hypotheses or interpretations where appropriate. Do not use a checkbox, a binary label or an invented score to imply that a whole benchmark is uniformly decomposable. Tasks within one domain can have different dependencies.

Return to the same descriptions in a simplified comparison when that helps readers see whether the predicted relationship holds. Showing that two apparently similar task structures have different outcomes can be more informative than illustrating only confirming cases. A repeated description should advance the argument, not duplicate a large table.

## Write in plain, precise language

Use concrete actors and verbs. Define overloaded terms, such as “agent,” when they first matter. Make clear whether workers, investigators or reviewers are people, model instances or software roles.

Prefer “agents report findings and check each other's answers” to an unexplained statement about redistributing reasoning, information and verification. Introduce the technical distinction after readers can recognize the behavior it describes.

Headings should orient readers to the question or evidence in the section. Avoid slogans that sound insightful before their meaning has been established. Use exact task names when discussing a measured contrast.

Define unfamiliar metrics before relying on them. Explain a statistical qualification in terms of what it changes about the inference. Keep the assumption that changes the conclusion in the main path; reserve derivations and secondary details for optional depth.

## Make comparisons understandable at a glance

Before a figure, identify the comparison: which tasks, baseline, alternatives and measurement are involved. Readers should not have to infer the experiment from the controls or legend.

When many alternatives are compared, consider an overview before detailed inspection. For example, a benchmark-by-architecture comparison may benefit from the lowest and highest architecture averages with the baseline visible, followed by an existing architecture-specific view. Add that context when it answers a useful question; it is not required for every figure.

For important numbers, specify the unit, denominator, aggregation and relevant uncertainty:

- Absolute success percentages, relative percentage changes and percentage-point differences are different quantities.
- A mean across models differs from pooled success across task instances.
- The best architecture average differs from choosing a winner separately for every model or task.
- A maximum allowance differs from realized use; reasoning turns differ from tokens, elapsed time and dollar cost.
- Final task failure differs from a mistake repeated or corrected within an execution trace.

Label selected extremes and their selection rule. Do not imply that a small observed gap establishes a reliable ranking. Keep the baseline visible when switching candidates, and do not combine an overview and a detailed figure in a way that silently changes populations or units.

Use reported costs and error measurements when they materially explain the trade-off. If the paper supplies only a proxy or an aggregate, say what it can and cannot establish for a particular product. Do not convert turns into token bills or trace propagation into final error probabilities without supporting evidence.

## Preserve the evidence-to-interpretation boundary

Keep these roles recognizable through wording, captions, sources and design:

| Role | Requirement |
| --- | --- |
| Measured finding | State the comparison, conditions and population; point to supporting data or the relevant source passage. |
| Authors' explanation | Identify the proposed mechanism and whether the study isolates it. |
| Our interpretation | Explain why the finding could change a reader's reasoning or next evaluation. |
| Proposed next test | Name the uncertainty, comparator, changed condition and evidence that would distinguish outcomes. |

Explain why each material limit matters rather than accumulating generic cautions. Association, isolated causation, within-domain prediction and transfer to a new task answer different questions. A fitted threshold is not automatically a universal operating rule. If capability or a predictor matters to the central decision, explain what it gives the reader a reason to retest, identify its validation population and separate within-domain usefulness from transfer to a new workflow. Do not omit a decision-relevant finding solely because its limitations require explanation, or turn its numerical threshold into an adoption rule.

State a bounded personal interpretation that organizes the evidence, including what the author finds consequential or surprising. Methodologically sound testing advice is useful but does not replace that interpretive contribution. Use local labels and layout to distinguish evidence, explanation and proposed tests without making every paragraph repeat all caveats.

Give substantial author interpretation an editorial treatment distinct from reported evidence. A restrained contrast in background, typography or placement can help. The distinction should remain clear in the prose and without color. Avoid badges on every paragraph or visually promoting speculation above the supporting evidence.

A high headline accuracy needs an understandable target and validation population. Verify the aggregation or selection procedure supporting important claims. If a statistic cannot be reconstructed, identify it as the authors' reported aggregate and state the unresolved detail; do not imply a complete audit.

## Develop a bounded next comparison

Translate the evidence into a test specific enough to evaluate. Name the relevant task population, baseline, candidate behavior, available information, outcome and resource controls. “Add review” is incomplete without explaining what the reviewer receives, can inspect and returns. “Divide the work” is incomplete without explaining the assignments and how findings are combined.

Separate questions that require different evidence. A quality comparison under a matched ceiling does not by itself establish a useful production cost–quality–latency trade-off. A team outperforming a baseline does not isolate whether the gain came from communication, better instructions, extra attempts or checking.

Include a simpler comparator when it would distinguish the mechanism: for example, a single agent with the same evidence-preservation instructions or another self-check. Record corrections and newly introduced errors when assessing review.

Diagnose failure types on development examples, then evaluate on fresh, predefined tasks. Do not silently select a held-out population after seeing where the baseline fails and report its gain as overall performance. A deliberately difficult subset is valid when its selection and narrower target are explicit.

Define worthwhile improvements and practical limits before inspecting held-out results where appropriate. Examine repeated-run variation, uncertainty and failure cases; do not invent sample-size guarantees or promote a small observed gain into a recommendation.

## Build one connected reading experience

A useful progression is:

**Recognizable decision → revealing contrast → investigate a possible explanation → judge whether a gain is worthwhile → choose a bounded test → inspect the research in depth.**

This is an argument, not a required screen sequence. Start with a small amount of concrete evidence that makes the decision consequential. Do not require readers to learn every benchmark and architecture before seeing why they matter. The central question should remain recognizable through each section. Each section should answer a question raised by the previous one and prepare the next. Make the bridge explicit where the connection is not obvious. For example, successful-task counts invite a question about the extra work behind them; extra checking work invites a question about whether it corrects mistakes.

Introduce an idea before using it to explain an outcome. Keep names, reference points and task descriptions consistent across sections. Make direct arrivals to a figure understandable without forcing a guided tour.

Control the reading burden. Compress recurring explanations, combine overlapping implication passages, and omit an additional diagram if its caption and surrounding prose already do its job. A conceptual diagram should occupy space proportional to what it explains; do not give an illustrative budget split the visual weight of a main empirical result.

One clearly marked editorial synthesis may serve the piece better than three identical implication tables. Keep the consequential limits near the findings even when the proposed evaluations are consolidated later. The ending should answer the opening question at the strength the evidence permits, rather than repeat every section.

## Let visuals and interaction earn their place

Use visuals to expose a relationship that is harder to inspect in prose: comparisons, dependencies, information loss, resource use or a validation boundary. Do not add arrows that merely restate the explanation or imply that a hypothesized mechanism has already been demonstrated.

An interaction should have a reason to be used: name the question a reader can investigate and the relationship that changes with the selection. Filtering a chart is useful for evidence inspection but does not by itself create exploration. A small selector can connect a recognizable problem to relevant evidence, a counterexample, a next comparison and its limit. Preserve the selected problem while the reader examines those elements. Label authored decision paths as interpretations, not measured predictions or an architecture recommender. All paths must remain available without JavaScript.

Prefer static figures when they communicate the relationship fully. Use interaction when readers benefit from isolating a candidate or inspecting a different condition while retaining context. State what can be learned by changing the control.

For a small set of important alternatives, prefer visible, directly selectable buttons with clear selection states over a dropdown that hides the available comparisons. Use a dropdown when the number or structure of options warrants it, not as the automatic control for a figure.

No required prediction, staged revelation, scoring, audience toggle or replay loop follows from this format. Avoid fake selectors, invented performance curves and simulations presented as measured agent behavior. Clearly label constructed examples and conceptual allocations.

## Brief and review

Before implementation, write a short brief covering the question and bounded argument, what each reader should gain, selected findings and evidence, the actual work being explained, intended figures or controls, implications and missing evidence, deliberate exclusions and review scope. Keep it proportionate; do not begin with screens and retrofit a thesis.

Use the [multi-perspective review](multi-perspective-review.md), with perspectives suited to both primary readers. Assess at least:

- Can a reader explain what the system had to do and how success was measured?
- Does each comparison have an understandable baseline, unit and population?
- Do sections form a connected argument instead of a succession of findings and disclaimers?
- Can the builder justify a next comparison and say what evidence would make it useful?
- Can the researcher distinguish observations, explanations, alternatives and transfer limits?
- Does the piece explain what changes because of the research, beyond summarizing it?
- Does every repeated table, paragraph, figure or control add enough insight to justify its reading cost?

Assess economy (few elements developing the argument), coherence (each element serves the same question) and completeness (a next test, acceptance criteria and evidence boundary). Where feasible, give a CTO and a research-oriented reader two minutes without coaching, then ask what they would do differently, which evidence supports it and what the paper cannot tell them. Ask the researcher what would test the explanation rather than reproduce the outcome. Remembering benchmark names is not the success criterion. Treat these as proposed reader checks until observed.

Record **Pass / Needs work / Not checked / Not applicable**, with evidence and scope. Separate source verification, editorial assessment, browser exercise and observed reader understanding. Several perspectives considered by one reviewer are not independent reviews. Working controls and fitting layouts do not establish comprehension; unavailable reader evidence is not an automatic approval gate.

## Relationship to other guidance and this project

Use the [reader journey](reader-journey.md) for invitation, orientation and transitions, and [shared presentation](reading-comfort-navigation.md) for reading comfort and access. The [experiment guidelines](../experiments/README.md) apply to an embedded interactive model, not to the essay as if it were a decision exercise or playground.

For agent collaboration, let the decision about adding another agent organize the reading. The Finance Agent–PlanCraft contrast can carry the opening; other benchmarks can challenge and refine the interpretation. Keep benchmark definitions and source data available as depth, rather than making the full inventory the entrance to practical relevance. Task-structure hints and later comparisons should make it possible to inspect that relationship without treating a domain name as an architecture rule. Capability analyses and architecture predictors belong in the main path only when they help answer the selected question; covering every paper contribution is not a requirement.

Prototype revisions and earlier briefs are planning history, not proof that this standard is met. The guideline should guide new editorial judgment rather than freeze one prototype's structure into a template.
