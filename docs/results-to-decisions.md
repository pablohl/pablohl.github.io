# From results to engineering decisions

The guide at `/toolbox/engineering/results-to-decisions/` applies the Decision-Complete lens to technical recommendations. Its central discovery is that a useful recommendation connects an observed result to what the next action requires, including what the evidence leaves open.

## Reading experience

Two fictional stories establish why that connection matters. An on-call team considers a quieter checkout alert; replaying a known outage changes what they can recommend. A database team debates whether untested historical records block a migration; the answer depends on which records must move and whether split access and rollback have been verified.

The stories precede the formal Observation → Interpretation → Decision framework. Each branch contains its own recommendation, report wording, and follow-up. Changing the selected condition hides the previous branch together with its report wording. Comparisons remain optional disclosures. The ending contains one transferable explanation and reusable wording, without repeating a completed example or adding another lesson list.

The report disclosure retains all 25 supplied checks and their explanations. Checkboxes are labeled and are not saved. The stories contain no private transcript details. All events and numbers are fictional.

## Source and integration

Content lives in `data/engineering-tools.json`. The shared builder keeps the current hiring renderer and adds a separate story renderer; it does not rewrite the hiring HTML with string substitutions. Main's hiring data and generated page are preserved exactly. Shared styles retain main's revisions and add scoped story and decision controls.

`js/engineering-decisions.js` enhances complete static outcomes into radio-controlled branches. Without JavaScript, both stories and all four outcomes remain readable, with native report disclosures and checkboxes. The example selector retains keyboard navigation and fragment links.

Rebuild with `PYTHONDONTWRITEBYTECODE=1 python3 scripts/build_toolbox.py`. Run `PYTHONDONTWRITEBYTECODE=1 python3 -m unittest discover -s scripts -p 'test_build_engineering_toolbox.py'` for hiring preservation, branch-specific reports, static fallback, short-ending, validation, and repeatability checks.

## Explanatory review

Reviewed under `docs/multi-perspective-review.md`. Interactive-experiment guidance is outside this guide's scope, as requested. These are separate editorial perspectives from one reviewer, not independent user studies.

| Perspective and success criterion | Questions inspected | Finding and smallest revision |
| --- | --- | --- |
| Practitioner: recommendation follows the selected evidence | What is known? What action follows? Does the report say the same thing? | The stories make the decision recognizable. Fixed report wording contradicted selected conditions. Put a report statement and next check inside every branch. |
| Newer reader: understand the situation before terminology | What is waking the engineer? Are the four remaining pages proven useful? Must both stories be read? | The overnight situation provides a reason to continue. The former title implied the retained pages were useful. Ask whether the new rule still detects an outage; make the ending stand alone. |
| Subject expert: distinguish result from assumptions | Does counting pages establish detection? What did the rehearsal test? What enables a staged move? | The examples expose evidence limits. Safe split access and rollback are additional conditions, not consequences of a successful rehearsal. Keep those conditions explicit in the branch and matching report. |
| Information designer: each section adds value | Does a branch switch update the quotation? Is the ending repetitive? Do both guides still rebuild? | Native controls and stories remain useful. Repeated synthesis and divergent renderer assumptions added risk. Shorten the ending and separate story rendering from the preserved hiring path. |

Convergence: evidence and report wording must remain aligned. Complementarity: a clearer title and a shorter ending support the same reading path. Unique expert finding: a successful rehearsal does not establish safe operation across two databases. Tension resolved: retain the stories before the named framework while removing repeated worked synthesis. Rejected: simulation, scoring, additional controls, or applying the interactive-experiment requirements. The checklist remains an optional application aid.

Verification establishes implementation and editorial consistency. Independent-reader comprehension, screen-reader use, and browser zoom still require separate validation.

Verification for this integration: **Pass** — full toolbox build and all six regression checks, including missing report validation and correct wording for each of the four branches. **Pass** — main's hiring source data and generated HTML match exactly. **Pass** — all four report statements checked in the browser; switching branches removes the previous statement; keyboard scenario navigation checked. **Pass** — expanded report wording and shortened ending inspected at desktop and 390px iframe width. **Pass** — local links, fragment references, unique IDs, accessibility references, and sitemap entry. **Not checked** — independent-reader comprehension, screen-reader journey, and zoom. No interactive-experiment compliance is claimed or required.
