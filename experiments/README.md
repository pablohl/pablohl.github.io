# Designing Interactive Experiments

Current experiment-design and interaction guideline. [The documentation index](../docs/README.md) maps related content and review guidance. [Reading comfort and shared navigation](../docs/reading-comfort-navigation.md) owns shared presentation defaults and header behavior; experiment-specific composition and verification requirements remain here.


Version 2 · October 2026

Experiments on this site are small interactive models for exploring an idea by changing something and seeing what happens. The default is an **explorable explanation**: let a reader experience a question, make a choice, notice a consequence, and revise their understanding. Some experiments connect to an essay; others stand on their own.

Use interaction when it reveals a relationship more effectively than a paragraph or static figure. The defining loop is **act → see the change → understand the consequence → try an alternative**. A sequence of buttons that only reveals paragraphs is usually an illustrated essay.

These guidelines apply to new experiments and revisions. They describe design requirements, not a requirement to retrofit every existing page immediately. Existing experiments are references to learn from, not proof that every requirement has been met.

Apply the [full reader journey](../docs/reader-journey.md) before and around the experiment: its homepage or collection invitation should predict the actual activity, and direct arrival should provide enough context to begin. That guideline owns cross-page expectations and onward movement; the sections below own the experiment's consequential learning loop. Assess the invitation and the rendered destination together instead of assuming a working experiment is discoverable.

## 1. Choose one discovery and the right format

Write the central discovery in one sentence. Identify the reader's likely initial assumption and the visible event that could challenge it. Keep adjacent lessons out of the main path unless they are necessary for that discovery.

| Format | Use it when | Design priority |
| --- | --- | --- |
| Interactive illustration | One manipulation clarifies a relationship. | Make the relationship immediately visible. |
| Explorable explanation | A sequence of discoveries develops an idea. | Preserve one problem while widening the reader's understanding. |
| Interactive laboratory | The reader needs to investigate independently. | Make controls, assumptions, and repeatability explicit. |

Choose a primary format. A focused explanation can offer an optional laboratory after its conclusion. More settings, distributions, and scenarios do not automatically make an explanation better.

## 2. Design a consequential learning path

Open with a question, a short setup, and one obvious action. Introduce rules when they become necessary. Each stage must deepen the question or change an important condition, not merely expose another interface mode. Do not impose a fixed number of stages.

For each stage, specify:

| Field | Required design decision |
| --- | --- |
| Question | What is the reader trying to understand now? |
| Action | What can they change, choose, predict, or reveal? |
| Fixed conditions | What remains the same for this comparison? |
| Visible consequence | What changes on the graphic and in the result? |
| Comparison | Which previous state or expectation remains visible? |
| Recovery | How can the reader undo, replay, or try an alternative? |
| Learning | What does this stage add to the central discovery? |

Carry earlier choices forward. If a stage resets a scenario, changes assumptions, or starts a new random sample, say so at the transition. Distinguish navigation from model actions: Next changes the lesson; Test spends time or budget in the model.

### Make action labels truthful

- **Action:** “Build now” must execute a build or explicitly open its confirmation/preview. It must not silently record a preference and force a different path.
- **Prediction:** “What would you choose?” or “What do you expect?” records an expectation. Compare that expectation with the later evidence visibly.
- **Reveal:** “Show the review steps” can uncover an explanation. “Inspect the case” should expose evidence the reader can actually inspect.
- **Scenario change:** Name the changed condition and preserve a baseline. Make important comparisons reversible, such as Even demand / Clustered demand.

Use neutral choice labels. Do not imply that a choice is foolish or correct before the reader has explored the evidence. Include “Not sure” when uncertainty is a legitimate prediction. Do not gate progress with a question whose answer is never used.

## 3. Show change, not just the latest state

The immediate result should answer **what changed, by how much, and why** without requiring a paragraph.

Use the comparison appropriate to the model:

- Before → after, with an explicit numerical difference.
- Previous-position markers, motion paths, or a reversible overlay.
- Predicted versus observed, or baseline versus alternative.
- Action availability before and after a resource or deadline change.

Keep the baseline labeled: “before this test,” “before B moved,” or “if competitors stayed.” Do not silently switch between comparison with the initial state and comparison with the last action.

An unchanged total can still conceal a meaningful change. Explain it directly: “Same total; different customers.” If nothing relevant changed, say so rather than implying a discovery.

Put one short explanation beside the affected graphic or result. Avoid repeating the same number and explanation in the sidebar, a lower panel, and a conclusion. Preserve persistent before/after evidence; animation alone is insufficient.

When an action becomes unavailable, show the reason where the action was: “Build unavailable: only 7 weeks remain; building needs 8.” A faded button alone does not explain a consequence.

## 4. Design the visualization for the comparison

Choose visual encodings around the relationship the reader needs to see, not around a decorative metaphor.

- Keep identities, units, denominators, and comparison scales consistent across stages. Explicitly label any necessary change of scale or population.
- If a dot aggregates cases, state its unit: “One dot represents 10 transactions.” Do not describe aggregated marks as individual observed cases.
- Rare but important events need a legible detail view. A large population of tiny marks can establish rarity, but should not be the only way to compare error types.
- Label important quantities directly. Legends supplement the result; they should not require repeated visual searching.
- If highlighting marks nearly everything, offer a more focused comparison, such as customers gained or lost by A.
- Explain ties, fractional allocation, uncertainty, and overlapping marks where they occur. Keep overlapping controls distinguishable and operable.
- Retain spatial context when useful, but do not let an empty center or decorative background crowd out actions and results.
- If an axis rescales, make that change explicit. Prefer a stable scale for direct before/after comparisons.

A visual transition must reflect a real model change. Do not add simulated waiting or decorative motion that suggests a mechanism the model does not contain.

## 5. Keep action, model, and result together

The visual priority is: **current question → primary action and model → immediate result → explanation → secondary settings and methods**.

The opening may use an editorial title and introduction. Later stages should not repeatedly spend the top of the screen on that introduction. Use a compact header or navigate to the active stage while retaining enough context to orient the reader.

On a typical laptop, aim to show the active task, its main control, and its immediate result together. On narrow screens, keep them adjacent in a logical reading order. Do not achieve this by shrinking labels or clipping content. Size large diagrams with available height as well as width.

Use one consistent content grid and align navigation with the active stage. Reserve cards and borders for meaningful groups; not every paragraph needs a container. Keep reset secondary and distinguish “Replay this scenario” from “Start a new scenario.”

Do not automatically scroll on every slider change or drag. After a stage transition or deliberate reveal, manage focus and scrolling so the result is discoverable without losing the relevant comparison.

## 6. Use the site's visual language with semantic roles

Reuse the shared theme tokens in [editorial.css](../css/editorial.css), including background, surface, text, accent, spacing, and fonts. Source Serif 4 supports questions and editorial headings; DM Sans supports controls, labels, and dense numerical comparisons. Avoid adding fonts or independent copies of theme values without a specific reason.

Establish a small type hierarchy. Large type should emphasize the question or the decisive result, not every explanatory section. Align comparable numbers and use tabular numerals where values update.

Define a small color-role map before implementation:

| Role | Rule |
| --- | --- |
| Entity identity | A model or vendor keeps its identity across stages. |
| Outcome category | Error types or other categories retain the same encoding in every chart. |
| Interaction state | Selected, focused, disabled, and actionable states remain distinguishable. |
| Change | Gains, losses, or changed assignments have a clear, labeled treatment. |
| Context | Background and decorative features stay subordinate to data. |

Do not reuse the same accent for unrelated meanings within a comparison. Do not use green to imply that an option is objectively best when it is merely selected. Color must have a text, shape, pattern, or position counterpart; verify essential distinctions without color.

## 7. Make interaction accessible

- Provide a keyboard-operable equivalent for dragging and connect it visibly to the graphic's coordinates or labels.
- Use appropriate native semantics: buttons for actions, radio groups for exclusive choices where applicable, and associated labels for sliders and inputs.
- Show keyboard focus, selected states, and disabled reasons. Keep touch targets usable without precise pointing.
- Provide a text equivalent for important graphic states and changes. Announce meaningful updates without reading a long panel on every small input change.
- Respect reduced-motion preferences and preserve the final comparison without animation.
- Check text and essential graphical/control contrast against applicable WCAG AA criteria; do not assume a muted palette is accessible.
- Verify reflow, zoom, keyboard order, and touch use. A slider existing in the markup is not evidence that the complete journey is accessible.

## 8. Keep the model and its claims honest

State the simplified rules and the source or inspiration of an adapted model. Show rules needed to make the current choice before the reader acts; put secondary calculations and implementation detail in methods.

Distinguish observed evidence, synthetic examples, assumptions, predictions, counterfactuals, expected values, and realized outcomes. Do not present an illustrative review time as an empirical average or a model's preferred action as a universal recommendation.

For stochastic models, provide a way to replay the same scenario separately from sampling a new one. Hold relevant random conditions fixed when comparing choices, and identify what is held fixed. A curated teaching example is acceptable when labeled; do not disguise it as an unselected random outcome.

A guided example must not depend on luck to make its main idea understandable. Include truthful feedback for null effects, opposite outcomes, and unexpected choices instead of forcing the story to claim a reversal that did not occur.

## 9. Close the loop and connect to writing

End near the final result with a concise comparison: the initial choice or prediction, the new evidence, and what the reader would consider now. Do not require a changed opinion when the evidence supports the original choice.

State the transferable insight and the boundary of the model separately. An experiment about competitors choosing locations does not establish that their goals are unknown; an essay can extend the question to that uncertainty.

Link to an essay when it develops the same idea, and add a contextual return link from the essay when appropriate. Optional sampling, sensitivity analysis, or additional scenarios belong after the main conclusion or behind clearly labeled controls. They should not be necessary to find the takeaway.

## 10. Brief before building

Keep this brief short enough to guide implementation:

1. **Primary format and discovery:** one sentence each, with the intended entry point and the preview's promise identified using the reader-journey guideline.
2. **Reader's starting assumption:** what might the interaction challenge?
3. **Stage plan:** use the table in section 2; omit unnecessary stages.
4. **Visual comparison:** baseline, change encoding, units, and color roles.
5. **Screen composition:** sketch opening, changed state, and final state at laptop and narrow widths.
6. **Rules and limits:** what must be visible before action, and what belongs in methods?
7. **Recovery and uncertainty:** replay, reset, alternate results, and randomness.
8. **Ending:** what is demonstrated, what remains unproven, and any related essay.
9. **Verification:** the journeys, edge cases, and reader questions that will establish clarity.

If the brief cannot identify a consequential action and a visible comparison, reconsider whether an interactive experiment is the right form.

## 11. Review and verification

Review the rendered experience, not only the source or screenshots of the opening. Record checks as **Pass / Needs work / Not checked / Not applicable**, with brief evidence. Do not claim compliance from the presence of a control or a methods paragraph alone.

Start from the affected preview or contextual link and also inspect direct arrival where relevant. Use the [reader-journey transition checks](../docs/reader-journey.md#checks-at-each-transition) to verify that the invitation, opening, first action, result, recovery, and ending form one understandable path. Preserve the distinction between a predictable destination, a functioning interaction, and evidence that an unfamiliar reader understands either.

For a complementary review of the central idea from practitioner, newer-reader, subject-matter, and interaction-design perspectives, use the [Multi-Perspective Review Guideline](../docs/multi-perspective-review.md).

### Core acceptance checks

- [ ] A new reader can identify what to do first without a tutorial.
- [ ] Action labels match what actually happens; predictions and reveals are explicit.
- [ ] After an action, the reader can identify what changed and what stayed fixed without reading an explanatory paragraph.
- [ ] The baseline, result, and meaningful difference are visible together or directly comparable.
- [ ] The main action and result remain adjacent on laptop and narrow layouts, without tiny text or clipping.
- [ ] Units, populations, color meanings, and scales remain consistent or their changes are explicit.
- [ ] Every required stage contributes to the central discovery; optional exploration does not bury the conclusion.
- [ ] Going back, replaying, or changing a condition preserves or explicitly resets the intended state.
- [ ] Rules necessary for prediction are available before acting; claims and uncertainty match the model.
- [ ] The conclusion closes the reader's original question and names the model's boundary.

### Functional and visual checks

Walk the full journey with at least one alternative choice and an unchanged or boundary result where possible. Test unavailable actions, ties, extreme inputs, resets, and repeated reveals as relevant. Use model tests for arithmetic and meaningful invariants, and journey checks for state transitions. Tests cannot establish that the explanation is understandable.

Inspect representative laptop and narrow viewports, enlarged text/zoom, keyboard-only interaction, focus after transitions, and reduced motion. Check labels and diagrams in the states with the most information, including overlapping markers and long results. Save representative screenshots or other evidence with the review when useful.

Ask someone unfamiliar with the experiment to try it without coaching:

- What can you change here?
- What just changed, and why?
- What stayed fixed?
- What are you comparing the result against?
- What would you try next?
- What does this demonstrate, and what does it not establish?

Record where they hesitate and revise the interface before adding explanatory prose. If no unfamiliar reader has tried it, mark that check **Not checked** rather than assuming clarity.

## 12. Lessons from the existing experiments

These are design lessons, not certifications of the current implementations.

| Experiment | Preserve | Guard against |
| --- | --- | --- |
| [Ice Cream Vendors](ice-cream-vendors/index.html) | Direct manipulation, fixed conditions, persistent choices, prediction versus outcome. | An oversized diagram separating controls from results; automatic demand changes without a reversible comparison; highlighting almost every customer. |
| [The Metric Can Be Right](the-metric-can-be-right/index.html) | Widening the same decision; a cost assumption that can reverse the comparison; explicit projection limits. | Tiny rare-event marks, shifting denominators, reveal buttons that promise inspection, and a final question disconnected from the initial choice. |
| [Two Clocks](two-clocks/index.html) | The tension between learning and losing options; explicit model assumptions. | A nominal action that only records a preference; new totals without deltas; a deadline that barely changes visually; optional lessons overwhelming the main discovery. |

The standard is not how many stages, controls, or explanations an experiment contains. It is whether the reader can act, see a meaningful consequence, and use that experience to understand the question more clearly.
