# Engineering Toolbox: example-led hiring guide

## Purpose on the website

Show how Pablo reasons through engineering decisions by making the reasoning concrete. The visitor's likely first goal is to understand an idea and decide whether it is useful. A form demanded effort before demonstrating value, and its output merely reformatted the visitor's inputs.

The guide now starts with recognizable interview situations and comparisons that expose where an impression goes beyond the evidence. Its useful result is a better question or a more precise claim for a real hiring discussion. We do not assume visitors will evaluate candidates on this website.

## Information structure

- Toolbox remains in primary navigation; existing decision-lens URLs remain intact.
- Engineering Toolbox introduces the first guide without empty category filters.
- The hiring guide opens with a direct question and two links to examples.
- Each example contains the role and interview scenario, a tempting conclusion, two contrasting cases, what each supports, and an explanation immediately connected to those cases.
- An optional disclosure shows how the reasoning could sound in a hiring discussion and a specific follow-up.
- The closing section pairs a three-part structure (evidence, expectation with support, uncertainty with a next check) with a completed ML example. A reusable sentence shows how the parts form a single hiring expectation, without requiring a worksheet.
- Related decision lenses explain the broader reasoning.

## What changed after review

Removed the six-field form, completion counter, copy control, forecast preview, and detached interpretation notes. Replaced the abstract instruction about consequential behavior with an ML example where noticing a risk either changes the release recommendation or does not. Replaced the abstract missing-evidence warning with a queue example contrasting an unasked question with an observed difficulty. Support needs and uncertainty appear inside a concrete discussion example rather than as six compulsory fields.

The examples are illustrative, not actual candidate evaluations or a validated hiring instrument. They support narrow, contextual claims rather than hire/no-hire recommendations.

## Presentation and reuse

Use the site's existing cream, green, serif headings, and sans serif body text. Comparisons appear as labeled tables at wide widths and as stacked, fully labeled cases below 760px. Optional discussion examples use native disclosures. No JavaScript, visitor input, storage, or clipboard access is required.

`data/engineering-tools.json` contains the guide's scenarios, comparisons, explanations, and discussion questions. `scripts/build_engineering_toolbox.py` renders them with the existing shared site shell. `css/engineering-toolbox.css` owns their presentation. Run `python3 scripts/build_toolbox.py` to regenerate both collections and sitemap entries.

The reusable editorial pattern is situation → tempting conclusion → contrasting evidence → bounded interpretation → discussion. Future tools can use a different interaction if it helps visitors understand the decision; a worksheet is not the default requirement.

## Verification

Desktop layout and example navigation visually inspected. Both comparison cases appear with their labels; discussion disclosures checked. Rebuilding is reproducible; sitemap parses; generated links resolve locally. No form or worksheet script remains in the guide.

Not checked: actual narrow viewport, zoom, independent-reader usability. Responsive card styles are implemented, but their presence does not establish rendered mobile usability.

Work remains local on `codex/engineering-hiring-forecast`; nothing published or pushed.
