# Engineering Toolbox: example-led hiring guide

## Purpose on the website

Show how Pablo reasons through engineering decisions by making the reasoning concrete. The visitor's likely first goal is to understand an idea and decide whether it is useful. A form demanded effort before demonstrating value, and its output merely reformatted the visitor's inputs.

The guide now starts with recognizable interview situations and comparisons that expose where an impression goes beyond the evidence. Its useful result is a better question or a more precise claim for a real hiring discussion. We do not assume visitors will evaluate candidates on this website.

## Information structure

- Toolbox remains in primary navigation; existing decision-lens URLs remain intact.
- Engineering Toolbox introduces the first guide without empty category filters.
- The hiring guide opens with the gap between observing interview behavior and predicting future work. A concise Evidence → Expectation → Uncertainty relationship and three questions introduce the proposed distinction.
- An accessible selector defaults to ML evaluation and displays one example at a time. Each example contains the role and interview scenario, a tempting conclusion, two contrasting cases, what each supports, and an explanation immediately connected to those cases.
- An optional disclosure shows how the reasoning could sound in a hiring discussion and a specific follow-up.
- The closing discussion draws three concise lessons about consequential reasoning, technical gaps, and the limits of predictions from both examples. It then pairs a three-part structure (evidence, expectation with support, uncertainty with a next check) with a completed ML example. A reusable sentence shows how the parts form a single hiring expectation, without requiring a worksheet.
- Related decision lenses explain the broader reasoning.

## What changed after review

Removed the six-field form, completion counter, copy control, forecast preview, and detached interpretation notes. Replaced the abstract instruction about consequential behavior with an ML example where noticing a risk either changes the release recommendation or does not. Replaced the abstract missing-evidence warning with a queue example contrasting an unasked question with an observed difficulty. Support needs and uncertainty appear inside a concrete discussion example rather than as six compulsory fields.

The examples are illustrative, not actual candidate evaluations or a validated hiring instrument. They support narrow, contextual claims rather than hire/no-hire recommendations.

## Presentation and reuse

Use the site's existing cream, green, serif headings, and sans serif body text. The problem and distinction share a two-column opening on wide screens and stack below 760px. Reduced section gaps, heading sizes, panel padding, and repeated text keep the examples close to the introduction. The structured synthesis keeps its questions and examples without repeating the explanatory hints. Comparisons appear as labeled tables at wide widths and as stacked, fully labeled cases below 760px. Optional discussion examples use native disclosures. A small progressive enhancement script provides the example selector, including arrow keys, Home/End, roving focus, and direct example links. Without JavaScript, both complete examples remain visible. No visitor input, storage, or clipboard access is used.

`data/engineering-tools.json` contains the guide's scenarios, comparisons, explanations, and discussion questions. `scripts/build_engineering_toolbox.py` renders them with the existing shared site shell. `css/engineering-toolbox.css` owns their presentation. Run `python3 scripts/build_toolbox.py` to regenerate both collections and sitemap entries.

Each example's `conditions` hold any notes about prompting or role expectations. Its `application` contains a label and one example answer per shared discussion question, in the same order. The builder emits a matching `data-example-summary` block for every example tab so selection switches both the scenario and its application. Edit these source fields rather than the generated HTML.

When the contrasting cases need different discussion conclusions, use `discussionCases` with a label, `boundedConclusion`, and `followup` for each case. Match the labels to the comparison columns so readers can tell which evidence each conclusion addresses. Otherwise, the example's single `boundedConclusion` and `followup` remain supported.

Run `PYTHONDONTWRITEBYTECODE=1 python3 -m unittest discover -s scripts -p 'test_build_engineering_toolbox.py'` to check that rebuilding preserves the published guide, every tab has a readable static panel and matching application, and repeated builds are stable.

The reusable editorial pattern is recognizable problem → proposed distinction → selectable examples → discussion. Each example contains a situation, tempting conclusion, contrasting evidence, and bounded interpretation. Future tools can use a different interaction if it helps visitors understand the decision; a worksheet is not the default requirement.

## Verification

Desktop layout and example selection visually inspected. ML defaults to selected, switching hides the other panel, arrow-key and End navigation change selection, Tab enters the selected panel, and direct system-design links select that example. Both comparison cases appear with their labels; discussion disclosures checked. Rebuilding is reproducible; sitemap parses; generated links resolve locally. No form or worksheet script remains in the guide.

Not checked: actual narrow viewport, zoom, independent-reader usability. Responsive card styles are implemented, but their presence does not establish rendered mobile usability.

The first version was merged in PR #50. This follow-up revision uses `codex/engineering-toolbox-explanation` in the same isolated worktree.
