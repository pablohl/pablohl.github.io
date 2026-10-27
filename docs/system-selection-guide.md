# Architectural consequences guide

Current reference for **This Works Here. What Changes Elsewhere?** at `/toolbox/engineering/eligible-is-not-selected/`. The route is stable even though the title and design evolved. Earlier scored options, support-assistant stories, and database benchmarks are [historical designs](history/system-selection-guide-2026-10-27.md), not specifications for this guide.

## Intended discovery

The same component result supports different recommendations depending on what needs the value next, the consequences of stale data, and who handles delay or failure. A successful local test does not establish that a wider change is appropriate. Preserve uncertainty where dependencies are only partly understood.

## Current reading experience

The opening states when the guide is relevant and its practical payoff. A support agent edits an account, waits, and checks whether a timed-out request saved. A proposed change immediately acknowledges receipt and marks saving as pending. In the fictional test, every tested update eventually saves correctly and the screen responds promptly. Eventual saving alone does not establish an acceptable delay for every use.

Hold that proposed change and result fixed across three visible contexts:

1. **An internal nickname:** a delay may be acceptable if users can recognize and recover from failure. Distinguish repeating an edit from investigating an ambiguous outcome.
2. **A billing address used for the next invoice:** the invoice can use the old address if it reads before pending saving completes. Preserve the difference between “received” and “saved,” the assumed sequence, and responsibility for any coordinating change. A wrong invoice is a possible consequence, not an observed test failure.
3. **A contact address with partly understood uses:** a known overnight integration does not establish what every other system does. Unknown read ordering is stated as a before-or-after question rather than drawn as an established sequence. Recommendations remain conditional on the consequences and frequency of stale-data corrections.

Each context presents known use, interpretation, a critical assumption, and a possible recommendation; the uncertain context includes a follow-up question. Two figures illustrate known or explicitly conditional sequences. The closing discussion asks what work a local improvement moves elsewhere and labels the story and test results fictional.

All contexts and recommendations are visible in static vertical sections. There is no scenario selector, scoring, preferred-option badge, parameter input, model simulation, or required interaction. Do not add those merely to match another guide's format.

## Sources and applicable guidance

The `system-selection` entry in [engineering-tools.json](../data/engineering-tools.json) owns the contexts. [build_system_selection.py](../scripts/build_system_selection.py) renders the story through the engineering builder. [engineering-selection.css](../css/engineering-selection.css) owns the dependency diagrams and their responsive behavior; their breakpoint is separate from the comparison-table breakpoint documented in [reading comfort](reading-comfort-navigation.md).

Use the [engineering collection reference](engineering-toolbox.md), [Toolbox navigation](toolbox-navigation.md), [multi-perspective review](multi-perspective-review.md), and [source map and commands](README.md#source-files-and-commands). Apply experiment guidance only where relevant to the explanatory comparison; simulation and replay checks do not apply to this static guide. Prior reviews and browser checks remain in history and do not certify reader understanding or transfer to an unfamiliar dependency.
