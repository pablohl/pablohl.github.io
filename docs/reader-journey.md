# Full reader journey

Current guideline for the transitions between discovering a piece, opening it, understanding what to do, seeing its contribution, and continuing or leaving. Apply it to reader-facing changes alongside the relevant content, presentation, and interaction standards in [the documentation index](README.md).

The purpose is to help readers find and understand an idea. Do not optimize for clicks, completion, or interaction for their own sake. A reader may reasonably choose another piece, retain their initial view, or finish with uncertainty.

## Scope the journey before proposing changes

Identify the intended reader, their likely question, and what the piece should help them understand differently. Start from a real entry point: a homepage section, collection listing, essay link, or direct URL/fragment. Identify which transitions a change affects, including the invitation and destination on either side of a link. A local text correction does not require re-reviewing the whole site.

Review both the affected browsing path and direct arrival when relevant. Readers following a shared link should not need to visit the homepage or complete another example first. If a fragment opens a later scenario or result, its selected state and necessary context should be understandable there.

Use this sequence as a map, not a required page layout:

**Preview → Arrival → First meaningful step → Observable contribution → Compare or recover → Takeaway and onward route**

Reading, comparison, and recovery can repeat. A short essay may combine several steps in one paragraph. A static guide does not need controls merely to populate the sequence.

## Checks at each transition

| Transition | What the reader should be able to determine | What to inspect |
| --- | --- | --- |
| Preview → destination | Is this relevant? Will I read an essay, compare a worked example, or manipulate an experiment? | The title, description, any image, and link context predict the actual destination and activity. A link to a collection promises a choice of pieces; a link to an individual example promises that piece. |
| Arrival → orientation | Am I where I expected? What is the question and why might this help? | The opening fulfills the preview's promise. The title, purpose, scope, and necessary assumptions are understandable without prior browsing. Navigation identifies the containing collection where useful. |
| Orientation → first meaningful step | What should I read, compare, choose, or change first? | There is a clear reading order or an obvious initial control. Instructions use the interface's actual terms and explain necessary rules before action. Optional detail does not compete with the main path. |
| Step → observable contribution | What did this reading or action establish? What changed, and what did not? | An example exposes the reasoning connecting evidence to interpretation. An interactive action has a discoverable, appropriately labeled consequence. Navigation, predictions, reveals, and model actions are distinguishable. An unchanged result is explained honestly. |
| Contribution → comparison or recovery | Can I compare another case, revise a choice, replay, or return? What state will I keep or lose? | Relevant baselines and alternatives remain understandable. Recovery is discoverable and accurately named. State is preserved where needed for the comparison, or a reset is explicit. Browser Back, fragment links, and collection returns behave as intended. |
| Experience → takeaway and onward route | What does this support, what remains uncertain, and where could I go next? | The ending addresses the original question and respects the evidence limits. Related links explain their relevance or destination. Readers can return to the collection or stop without being forced into another action. |

## Make the invitation truthful and informative

- Describe the reader's activity and its purpose, not only the topic. A conceptual title can be paired with a concrete description rather than replaced.
- Make interactivity apparent in the surrounding text when it matters to the choice. Use an explicit format label, an informative preview, or both; do not require a badge on every piece.
- A preview should show a meaningful control, comparison, or state that remains legible at its displayed size. An unreadable miniature of a whole interface does not establish what the reader can do. Preserve useful text when an image is hidden or unavailable; use appropriate alternative text for informative images and empty alternative text for decorative ones.
- Generic link wording is acceptable only when its surrounding context makes the destination clear. Distinguish browsing a collection from trying a specific experiment. Do not promote one example as the default without explaining why it fits the intended reader.
- Promise only what the piece demonstrates. Do not advertise a static comparison as a simulation, a reveal as a test, or a guide as an automated recommendation. Add reading or completion estimates only when there is a defensible basis for them.
- Use motion only when it explains the activity or change. Readers should be able to understand the invitation without autoplay or hover.

## Adapt the checks to the format

| Format | Meaningful first step and contribution | Relevant recovery or continuation |
| --- | --- | --- |
| Essay | Read a recognizable question and follow the argument or evidence to its implication. | Move through the text, follow a relevant reference, return to Writing, or finish. No input or reset control is required. |
| Decision tool | Recognize a situation and use the canonical question to examine the worked example or one's own decision. | Compare a related question or return to the situation-based collection. Do not require a worksheet or final decision. |
| Static engineering guide | Compare the stated cases or contexts and inspect the evidence supporting each interpretation. | Revisit another context or return to the guide collection. Do not introduce interaction solely for format consistency. |
| Guide with selectable examples or conditions | Distinguish choosing a story from changing a premise; connect the displayed evidence and conclusion. | Switch examples or reverse a condition without confusing which baseline or assumptions apply. |
| Interactive experiment | Make a meaningful choice or manipulation, see its consequence, and compare it with the relevant baseline. | Undo, replay, reset, or try an alternative as the model supports. Distinguish replaying the same conditions from sampling new ones. |

The [Decision Toolbox standard](decision-toolbox.md) owns tool reasoning and audience requirements. [Engineering guides](engineering-toolbox.md) describe their formats and evidence boundaries. The [experiment guidelines](../experiments/README.md) own detailed action, visualization, model, accessibility, and recovery requirements. [Toolbox navigation](toolbox-navigation.md) owns current collection destinations; [reading comfort](reading-comfort-navigation.md) owns shared visual and header behavior. Refer to those owners instead of copying mutable implementation values here.

## Verify transitions, not just isolated screens

Walk the affected path from its actual invitation. Before following a link or activating a control, assess what its wording would lead a reader to expect; afterward, compare that expectation with what appears. Inspect at least one meaningful alternative and recovery path where applicable, including an unchanged or boundary outcome for interactions when relevant. Also check a direct link when the piece is shareable or supports fragments.

Inspect the opening and the state with the most information. Check the transitions on laptop and narrow screens, with enlarged text/zoom and keyboard navigation as relevant. Include focus after a reveal or navigation, result visibility, and any state lost on return. Apply the detailed accessibility requirements in the owning guidance; a successful pointer click alone does not establish access.

Use [multi-perspective review](multi-perspective-review.md) for assessments and synthesis. Record the entry point, task, inspected states, relevant viewport/input conditions, and the evidence supporting a finding. Use **Pass / Needs work / Not checked / Not applicable** with scope and a short reason. A browser inspection can pass a specific destination or state-transition check while comprehension remains not checked. Screenshots of an opening do not establish the rest of the journey.

When an unfamiliar reader is available, ask without coaching:

- Before opening: what do you expect this piece to contain, and why would you choose it?
- On arrival: what is this helping you understand, and what would you do first?
- After reading or acting: what did you learn or change, and what are you comparing it with?
- When trying another path: what do you expect to keep, lose, or reset?
- At the end: what does this support, what does it not establish, and where would you go next?

Record hesitation and behavior separately from your interpretation. A request for clarification is evidence to investigate, not automatic proof of a particular design defect. Mark unavailable reader evidence as not checked; editorial perspectives, automated checks, and historical reviews are not substitutes. Do not invent reader outcomes or make their absence an automatic approval requirement.

These are standards for new or revised reader-facing experiences, not a claim that existing pages have passed them or an instruction to retrofit the site in this documentation change. A review should identify actual gaps before proposing added instructions, controls, or imagery.
