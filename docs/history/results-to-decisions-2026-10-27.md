> Historical snapshot captured from `661f5ba` on October 27, 2026. This file preserves earlier implementation descriptions, design iterations, and reported checks. Statements such as “current,” “now,” and “passes” refer to their original revision, not the present site. It is not an instruction source or evidence of current compliance. See the [current reference](../results-to-decisions.md) and [documentation index](../README.md). Relative Markdown links have been rebased for this location.

# From results to engineering decisions

The guide at `/toolbox/engineering/results-to-decisions/` shows that a result answers a particular question, while a recommendation must connect that answer to what the next action requires. The distinction and Observation → Interpretation → Decision framework appear before the examples. The ending names what an evidence gap changes and offers reusable wording without repeating the framework.

## Reading experience

Two fictional situations use everyday language. An online shop wants fewer overnight alerts; the setup explains that alerts bring an engineer in to investigate purchase failures. Counting alerts establishes fewer interruptions, but not reliable detection. Checking a known purchase failure can rule out the proposed change. The second situation concerns moving order records: a successful trial with recent orders can justify a limited move only if using both systems and safely undoing the move have also been checked. If all orders must move together, the untested older records block that plan.

The tab labels are “Overnight alerts” and “Moving order records.” The main path avoids “pages,” timeout percentages, schemas, rollback, and migration terminology. The lower alert count and successful recent-order trial remain valid in both branches; what changes is the evidence or requirement connecting them to the next action. Each branch has its own recommendation, report wording, and follow-up. Optional comparisons expose the contrast without adding another required stage.

## Source and behavior

Content lives in `data/engineering-tools.json`; `scripts/build_engineering_toolbox.py` renders it. The Results to Decisions story renderer remains separate from the hiring renderer. Shared stylesheet URLs are refreshed for the new story distinction spacing; the hiring content is unchanged.

`js/engineering-decisions.js` enhances complete static outcomes into radio-controlled branches. Changing a condition changes the outcome and its report wording together. Without JavaScript, both stories and all four outcomes remain readable with native disclosures. The example selector retains keyboard navigation and fragment links. The events and numbers are fictional; this is an illustrative explanation, not a simulation or a validated operational procedure.

Rebuild with `PYTHONDONTWRITEBYTECODE=1 python3 scripts/build_toolbox.py`. Run `PYTHONDONTWRITEBYTECODE=1 python3 -m unittest discover -s scripts -p 'test_*.py'` for hiring preservation, branch-specific report wording, static fallback, early framework placement, short ending, validation, and repeatability.

## Review using both guidelines · October 26, 2026

Applied `experiments/README.md` and `docs/multi-perspective-review.md`. Discovery: an evidence gap can rule out a proposal or limit its scope, depending on what the next action requires. Starting assumption: a favorable result automatically justifies proceeding, or any unanswered question automatically means stopping.

This is an explanation with reversible scenario choices. The controls change a fictional condition and the recommendation it supports; they do not run real tests. No new controls, scoring, animations, or simulated waiting were added. Numerical model, sampling, replay, and unavailable-action checks are not applicable.

| Situation | Reader action | Fixed baseline | Visible consequence / learning |
| --- | --- | --- | --- |
| Overnight alerts | Select whether only alert count or also a known purchase failure was checked; switch back freely. | Proposed rule sends four alerts instead of eighteen on the same past activity. | Unknown detection calls for a check; evidence that a required failure is missed rules out this version. Fewer interruptions is only one requirement. |
| Moving order records | Select whether a verified limited move is possible or all orders must move together. | Trial succeeded for recent orders; older formats are untested. | The requirement determines whether the gap limits scope or blocks the whole move. Checks for using both systems and undoing the move are explicit additional evidence. |

These are separate editorial perspectives from one reviewer, considered before synthesis; they are not independent user studies.

| Perspective / success criterion | Questions inspected | Strength, weakness, smallest revision |
| --- | --- | --- |
| Practitioner: know what to do next and why | What does the result establish? What does the proposed action need? What could change the recommendation? | Branch-specific actions and reports are useful. Technical vocabulary obscured their practical purpose. Explain the job of the alert and the scope of the record move before interpreting results. |
| Newer reader: understand without engineering vocabulary | Does “pages” mean web pages? Why do purchases matter? What does moving records involve? | Concrete situations give the reasoning a setting. Unexplained terms made even the question hard to follow. Use notifications, purchase failures, trial runs, and recent/older orders; explain a database as the system storing the records. |
| Subject expert: preserve the limits of evidence | Does a lower alert count prove detection? Does a recent-order trial prove safe use of two systems? Is undoing the move separately checked? | The contrasts expose distinct gaps. Simplification could imply a trial alone proves a smaller move safe. Keep additional checks explicit in the selected condition, outcome, and report. |
| Information designer: orient readers before the examples | Where is the central distinction? Do choices change visible conclusions? Does the ending add rather than repeat? | Reversible controls and matching report disclosures work. The framework arrived after technically dense stories. Move the distinction into a prominent opening panel and keep a shorter, transferable ending. |

Convergence: readers need the purpose of the decision before technical conditions. Complementarity: plain-language situations and an early distinction make the same reasoning easier to follow. Unique expert concern: the limited move needs evidence beyond the successful recent-order trial. Tension resolved: simplify vocabulary without removing the conditions that make a recommendation defensible.

Priority / synthesis: ambiguous alert vocabulary → purpose is hidden → purchase failures appear irrelevant → explain notification and intervention first. Technical record-moving detail → reader must decode implementation → the scope distinction is lost → use recent versus older orders while retaining safety checks. Framework only at the end → reader lacks an organizing question → highlight result versus next-step requirements before exploration.

Rejected: adding a universal checklist, more controls, scoring, turning the guide into a simulation, or removing the safety conditions to make the story shorter. Deferred: actual reader testing, zoom, and a screen-reader journey.

Verification: **Pass** — full toolbox build, all six regression checks, and whitespace validation. **Pass** — all four selected outcomes and report statements inspected in the browser; switching removes the prior branch. **Pass** — keyboard scenario selection and native report disclosures. **Pass** — desktop opening and 375px opening/detailed outcome inspected, with no horizontal overflow. **Pass (editorial inspection)** — purchase failures are relevant before the question is asked; limited scope and additional checks stay explicit; the opening distinction precedes examples. **Not checked** — independent-reader comprehension, browser zoom, screen-reader journey. **Not applicable** — stochastic repeatability, model arithmetic, animation, unavailable actions. These checks establish implementation and editorial consistency, not validated comprehension.


## Alert interpretation refinement

The opening tagline is omitted from the visible page. The proposal explicitly attributes the lower count to the less sensitive rule. The scenario choice now distinguishes counting alerts from reviewing their associated incidents: what happened afterward, severity, and whether intervention was needed. A two-row, labeled comparison separates the current rule’s actual alert from the proposed rule’s missed alert. Blue identifies the current rule; ochre identifies the proposed rule. The labels carry the distinction independently of color.

Recommendations now have an explicit “Recommended next step” label; the recommendation itself is normal-weight text. Both scenarios can retain the current rule for different reasons: one needs an incident review, while the other already has evidence requiring revision. The unknown branch’s duplicate explanatory sentence is removed. The reports and optional comparison use the same incident-centered interpretation and omit the arbitrary weekday.

## Visible selection effects and archive wording

The record story now distinguishes **active orders**, handled day to day, from the **historical archive**, completed orders kept in an older format. The selector asks the concrete requirement: must the archive move with the active orders? The limited branch keeps checks for using both systems, record correctness, and safely undoing the move. The complete branch explains that the new customer-support screen needs active orders and purchase history together. The takeaway explicitly says which records can move and when the archive must be tested first; the ending uses the two situations rather than abstract stop/go language.

Each selector is followed by an unchanged baseline and a stable “Evidence and next step” area. Two short rows show what the selected condition establishes and the next step it supports. A change compares the previous row text with the new text and marks only changed rows with both a border and the word “Changed.” The selected condition is named above the rows. Detailed reasoning and the full procedure move into a native “Why this follows” disclosure; report wording remains a separate disclosure. The current/proposed alert-rule comparison remains visible. No animation, automatic scrolling, or focus movement is introduced.

The long live region is replaced with a compact status message containing the selected condition and the two summary values. Complete static branches remain available without JavaScript. Verified keyboard radio switching, changed-row content, unchanged baseline, and the limited branch’s safety explanation in the browser. The alert summary reflows at 375px without horizontal overflow. This implements the experiment guideline’s visible-change requirement and the multi-perspective review’s emphasis on clarity without adding another lesson or control. Comprehension with unfamiliar readers, zoom, and an assistive-technology journey remain untested.
