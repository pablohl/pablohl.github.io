# From results to engineering decisions

Current guide reference for `/toolbox/engineering/results-to-decisions/`. See [the collection reference](engineering-toolbox.md) for shared purpose and [the historical snapshot](history/results-to-decisions-2026-10-27.md) for prior reviews and revisions.

## Intended discovery

A result answers a particular question. A recommendation must connect that answer to what the next action requires. A gap can limit the scope of a proposal or rule it out, depending on those requirements. Do not imply that every favorable result justifies proceeding or that every unanswered question requires stopping.

The guide states when it is useful and its practical payoff, then presents the distinction and Observation → Interpretation → Decision before the examples. The ending explains what the gaps change and offers reusable wording without repeating the framework.

## Current stories and behavior

The tab labels are **Overnight alerts** and **Active orders and the archive**.

- **Overnight alerts:** an online shop wants fewer interruptions while still noticing purchase failures that need intervention. The proposed rule would have sent four alerts instead of eighteen on the same week's activity. Counting alerts alone leaves the incidents behind the removed alerts unreviewed. Reviewing them can establish that the proposal would miss a failure needing help. The current/proposed rule comparison uses explicit labels as well as blue and ochre accents.
- **Active orders and the archive:** a trial succeeded for active orders while older archive formats remain untested. A limited move is supported only when using both systems, correctness, and safely undoing the move have also been checked. If the new support screen requires active orders and purchase history together, the archive gap blocks that complete move until it is addressed.

Each story preserves a labeled baseline and places the selected condition above **Evidence and next step**. Changing a radio choice changes what the evidence establishes, the next step, and the matching report wording together. Only changed summary rows receive the border and “Changed” label. A compact status message announces the selected condition and summary values.

Detailed reasoning is in **Why this follows**; report wording is a separate native disclosure. The ending connects both situations to the requirement behind the recommendation. Scenario tabs navigate examples; condition choices change fictional premises, not real systems or measured outcomes. The events and numbers are illustrative, not a simulation or validated operational procedure.

Without JavaScript both stories and all four outcomes remain readable. With enhancement, scenario tabs support keyboard navigation and fragment links, and radio choices show the relevant outcome. The condition switch does not introduce automatic scrolling or focus movement.

## Sources and applicable guidance

Content is in [engineering-tools.json](../data/engineering-tools.json); the story renderer in [build_engineering_toolbox.py](../scripts/build_engineering_toolbox.py) is separate from the hiring renderer. [engineering-decisions.js](../js/engineering-decisions.js) owns condition switching, changed-row indicators, and announcements. [engineering-examples.js](../js/engineering-examples.js) owns scenario selection.

Use [Toolbox navigation](toolbox-navigation.md) for destinations, [reading comfort](reading-comfort-navigation.md) for shared presentation, and the [source map](README.md#source-files-and-commands) for build and check commands. Apply [multi-perspective review](multi-perspective-review.md) and the relevant [interaction guidance](../experiments/README.md) for substantive revisions. Historical checks do not establish current reader comprehension.
