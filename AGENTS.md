# Repository instructions

This repository publishes the website as checked-in HTML, CSS, JavaScript, and data. Read the relevant current documentation before proposing or implementing a change. Start with [the documentation index](docs/README.md); do not infer requirements from archived design iterations.

## Choose the applicable guidance

| Change | Read before working |
| --- | --- |
| Shared typography, colors, layout, header, or keyboard navigation | [Reading comfort and shared navigation](docs/reading-comfort-navigation.md) |
| Homepage Toolbox routes, collection links, breadcrumbs, or return destinations | [Toolbox navigation](docs/toolbox-navigation.md), plus the shared presentation reference |
| Decision-tool content or examples | [Decision Toolbox](docs/decision-toolbox.md) |
| Engineering-guide content, examples, or controls | [Engineering guides](docs/engineering-toolbox.md) and the relevant guide reference linked there |
| Experiments or changes to explanatory interactions | [Experiment guidelines](experiments/README.md); apply the interaction requirements relevant to the format |
| Substantive explanatory or experience review | [Multi-perspective review](docs/multi-perspective-review.md), alongside the relevant content/interaction guidance |
| Essay or other page changes | Shared presentation guidance; add the relevant collection guidance if changing its links or relationships |
| Documentation only | [Documentation ownership and maintenance](docs/README.md#documentation-ownership-and-maintenance), plus the documents being revised |

Apply only relevant requirements. A static guide does not need a simulation or additional controls. Preserve each piece's central distinction and evidence limits; more interactivity or actionability is not itself an improvement.

## Edit the source that owns the change

- Follow the [source-file map and commands](docs/README.md#source-files-and-commands). Toolbox pages are generated: change their data or builders, then regenerate affected output. Other pages may be maintained directly as static HTML.
- Preserve stable routes, IDs, and target anchors unless the task explicitly changes them.
- When shared CSS or navigation changes, keep asset versions consistent in the generators, shell applicator, and affected published pages.
- Use a `codex/` branch for new work. Keep unrelated working changes out of the PR.

## Keep documentation and evidence accurate

- Update the current reference that owns a changed behavior in the same PR. Link to it from other documents instead of repeating mutable values or instructions.
- Keep design history and past verification in [docs/history](docs/history/README.md), with revision context. Historical reports do not establish current behavior or override current guidance.
- Distinguish intended standards, current implementation descriptions, and observed validation. If they disagree, identify the discrepancy; do not silently treat the implementation as proof that the standard is satisfied.
- Multiple perspectives considered by one reviewer are editorial perspectives, not independent reviewers or user studies. Say what was actually inspected, inferred, tested, or left unchecked.
- A passing build, resolving link, or fitting viewport does not establish comprehension. Mark unavailable reader evidence as not checked; do not invent it or treat it as an automatic approval requirement.

## Verification scope

For changed behavior, run the relevant existing checks and inspect the affected rendered experience, using the applicable guidelines. Report the limits of that verification. Documentation-only edits need checks of links, consistency, and scope; do not regenerate the website or imply a new browser/user review when the rendered experience has not changed.
