# Engineering guides

Current collection and implementation reference. For documentation roles, see [the index](README.md). Past design iterations and reported verification are retained in the [historical snapshot](history/engineering-toolbox-2026-10-27.md).

## Purpose and format

Show how Pablo reasons through engineering decisions by making the reasoning concrete. Readers should recognize a situation, understand the distinction, and decide whether it helps their own reasoning. Do not assume visitors will evaluate candidates or run an operational procedure on this website.

Use a recognizable problem → proposed distinction → examples or exploration → discussion pattern. An example needs a situation, a plausible initial interpretation, relevant evidence or conditions, and a bounded interpretation. The discussion should add a broader insight rather than repeat a completed example. Choose interactions only when they serve that purpose; a worksheet, score, or simulation is not the default.

The collection has three guides:

| Guide | Current format and intended distinction |
| --- | --- |
| [What Did the Interview Actually Tell You?](../toolbox/engineering/hiring-forecast/index.html) | Two selectable interview examples; distinguish observed evidence, conditional expectations about work, and remaining uncertainty |
| [What Does This Result Let Us Decide?](results-to-decisions.md) | Two selectable stories with reversible conditions; connect a result to what the next action requires |
| [This Works Here. What Changes Elsewhere?](system-selection-guide.md) | Three visible static contexts; interpret the same local result through dependencies and consequences |

Each guide and its index card states when it is relevant and what the reader will be able to do. [Toolbox navigation](toolbox-navigation.md) owns destinations and collection roles. [Reading comfort](reading-comfort-navigation.md) owns shared type, widths, comparison breakpoints, and header behavior; do not copy those mutable values into this reference.

## Hiring guide

The opening separates observation from prediction. The distinction panel introduces Evidence → Expectation → Uncertainty with three questions. The ML evaluation and System design examples use different contrast labels because they test different evidence gaps; consistency does not require identical conclusions.

- ML evaluation compares naming a leakage risk with acting on it. Recommending release without resolving an identified risk is observed behavior in that answer; response to guidance remains unknown. A retest must use information available at payment time, not merely later transactions.
- System design separates an untested reliability capability from an observed reasoning difficulty. Unfamiliarity with a particular queue product does not itself establish inability to reason about repeated deliveries and recovery.
- Optional native disclosures contain explicitly labeled sample wording for the hiring discussion, matching each compared case. Prompting, role expectations, support, and follow-up questions remain contextual.
- Closing lessons stand without reading both scenarios. Reusable wording accommodates an expectation or concern, with a separate variant for a capability that was not tested. Related decision tools explain the broader reasoning.

The selector defaults to ML evaluation unless a valid scenario fragment selects another panel. Enhancement supports arrow keys, Home/End, roving tab focus, and fragment links. Without JavaScript both complete examples remain readable. The fictional scenarios support contextual claims, not hire/no-hire verdicts or a validated hiring instrument.

Blue and ochre identify the two cases across table headers, narrow-screen cards, prose references, and sample statements. Labels carry the meaning independently of color; the accents do not rate candidates.

## Sources and review

[engineering-tools.json](../data/engineering-tools.json) owns scenarios, comparisons, discussion wording, and orientation fields. Edit those fields rather than the generated pages. `discussionCases` supports a matched statement and follow-up for each contrast; `boundedConclusion` and `followup` also support a single discussion statement. `discussionTemplate` and `insufficientEvidenceTemplate` own reusable wording. See the [source map and rebuild commands](README.md#source-files-and-commands).

For substantive changes, apply [multi-perspective review](multi-perspective-review.md). For controls and comparisons, also apply the relevant [experiment guidance](../experiments/README.md), identifying inapplicable simulation requirements explicitly. Past editorial and browser checks in the history are not a fresh review or proof of comprehension.
