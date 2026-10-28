# Repository documentation

Use this index to find the current guidance before proposing, reviewing, or implementing changes. [AGENTS.md](../AGENTS.md) routes repository work to these documents.

## Current references and ownership

| Document | Owns |
| --- | --- |
| [Full reader journey](reader-journey.md) | Expectations and transitions from preview and direct arrival through reading/action, consequence, recovery, and onward navigation |
| [Reading comfort and shared navigation](reading-comfort-navigation.md) | Shared presentation defaults, responsive comparison behavior, global header, and keyboard navigation |
| [Toolbox navigation](toolbox-navigation.md) | Homepage destinations, collection roles, breadcrumbs, and collection return links |
| [Decision Toolbox](decision-toolbox.md) | General-audience tool content, worked examples, completeness, and relationships |
| [Engineering guides](engineering-toolbox.md) | Engineering collection purpose, content pattern, hiring-guide behavior, and links to other guide references |
| [Results to decisions](results-to-decisions.md) | The current two-story guide, condition changes, baselines, and evidence limits |
| [Architectural consequences](system-selection-guide.md) | The current static three-context guide and its evidence limits |
| [Experiment guidelines](../experiments/README.md) | Experiment design, meaningful interactions, model honesty, accessibility, and experience verification |
| [Multi-perspective review](multi-perspective-review.md) | Perspective selection, separate assessments, synthesis, and review limitations |

These documents have different roles: guidelines state intended standards; guide references describe current content and behavior; [history](history/README.md) preserves past designs and checks. A current implementation description is not a certification that all applicable standards have been met.

## Documentation ownership and maintenance

- Keep a mutable rule or behavior in its owning reference above. Other documents should link to that reference rather than duplicate breakpoints, routes, or commands.
- Change the owning reference when behavior changes. Check inbound references for outdated names, destinations, or assumptions in the same PR.
- Separate prior reviews and implementation events from current instructions. Preserve their revision context under `history/`; do not present an old pass or an old unchecked item as a fresh assessment.
- When guidance and implementation disagree, state whether the change repairs the implementation or reconciles an outdated description. Do not rewrite a standard merely to declare an existing implementation compliant.
- Preserve evidence boundaries: editorial inspection, automated checks, browser journeys, and unfamiliar-reader observations answer different questions.
- Keep review-process/template changes and additional automation explicit in their own scope. A written guideline does not by itself introduce a PR template, a new test runner, or automated enforcement.

## Source files and commands

| Area | Source files |
| --- | --- |
| Homepage | [index.html](../index.html), [home.css](../css/home.css) |
| Experiment invitations and opening hints | [Experiments index](../experiments/index.html), homepage experiment cards, [interactive-previews.css](../css/interactive-previews.css), activity diagrams under [img/experiments](../img/experiments/), and each experiment's page/interaction script |
| Shared presentation | [editorial.css](../css/editorial.css), with collection/experiment-specific sheets where needed |
| Shared static shell | [apply_editorial_shell.py](../scripts/apply_editorial_shell.py) |
| Global and collection current-state behavior | [editorial-nav.js](../js/editorial-nav.js) |
| Decision tools and starting points | [toolbox.json](../data/toolbox.json), [toolbox-starting-points.json](../data/toolbox-starting-points.json), [build_toolbox.py](../scripts/build_toolbox.py) |
| Engineering guides | [engineering-tools.json](../data/engineering-tools.json), [build_engineering_toolbox.py](../scripts/build_engineering_toolbox.py), [build_system_selection.py](../scripts/build_system_selection.py) |
| Guide presentation and controls | [engineering-toolbox.css](../css/engineering-toolbox.css), [engineering-selection.css](../css/engineering-selection.css), [engineering-examples.js](../js/engineering-examples.js), [engineering-decisions.js](../js/engineering-decisions.js) |
| Experiments | Each directory under `experiments/` owns its page, styles, interaction code, and any model/journey tests |

Run from the repository root when rebuilding toolbox content or its shell:

```sh
python3 scripts/build_toolbox.py
python3 scripts/apply_editorial_shell.py
```

Existing Python checks:

```sh
PYTHONDONTWRITEBYTECODE=1 python3 -m unittest discover -s scripts -p 'test_*.py'
```

For experiment model/journey changes, use the relevant existing `*.test.mjs` files with `node --test`. For navigation JavaScript edits, `node --check js/editorial-nav.js` checks syntax; it does not check keyboard behavior or reader understanding. Choose the rendered checks required by the relevant guidelines. Documentation-only changes do not require a site rebuild.
