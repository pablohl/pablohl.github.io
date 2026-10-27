> Historical snapshot captured from `661f5ba` on October 27, 2026. This file preserves earlier implementation descriptions, design iterations, and reported checks. Statements such as “current,” “now,” and “passes” refer to their original revision, not the present site. It is not an instruction source or evidence of current compliance. See the [current reference](../system-selection-guide.md) and [documentation index](../README.md). Relative Markdown links have been rebased for this location.

# This Works Here. What Changes Elsewhere?

## Final tightening: recommendations match their conditions

The nickname recommendation now includes both acceptable delay and recognizable, recoverable failure. The uncertain recommendation qualifies corrections as occasional and inexpensive; its assumption paragraph is shortened to the remaining frequency and effort uncertainty. This resolves the practitioner/expert finding that the recommendations omitted conditions present in the discussion, and the designer's concern about repeated explanation. No additional scenario or controls were added. Build, nine regression checks, and whitespace validation pass. Reader transfer remains unvalidated.

## Follow-up: consequences and acceptable delay

Applied the four refinements from the subsequent multi-perspective review. Simplified the opening distinction; separated eventual saving from an acceptable wait; ended the invoice diagram with the possible use of the old address and explained pending saving beneath it; replaced the uncertain case's weakly supported preference with two conditional judgments based on the consequences of stale data. The nickname case now distinguishes simply repeating an edit from investigating an ambiguous failure. Overnight use is explicitly conditional on saving before that read.

These changes address convergent practitioner/reader concerns about concrete consequences and the expert's unique concern about extrapolating from eventual completion or a single known integration. Preserve the three contexts and static layout; no parameters, scores, or additional cases. Reader transfer to an unfamiliar dependency remains untested.

## Current revision: one test, two known contexts and one uncertain context

Intended discovery: the same component result supports different recommendations depending on what uses the value next, the consequences of stale data, and who handles failure. Preserve judgment where dependencies remain unknown. Review conducted through four separate editorial perspectives by one reviewer; these are not independent reader studies.

| Perspective / success | Questions inspected | Strength, weakness, smallest revision, limit |
| --- | --- | --- |
| Practitioner: connect an observation to a usable recommendation | Who needs the new value? Who waits? Who recovers when saving fails? | Nickname and invoice uses make consequences specific. A successful test could conceal recovery work. Preserve the visibility/recovery condition and ownership of the invoicing change. Real operational usefulness untested. |
| Newer reader: understand what changes between cases | Is this one change or three? Does the field name determine risk? What does pending mean? | Shared opening makes the improvement concrete. Different field names could look like unrelated stories. Explicitly hold the change and test result fixed and explain that use determines consequence. Comprehension untested. |
| Expert: distinguish evidence from extrapolation | Does overnight use establish every caller's behavior? Was an incorrect invoice observed? Does eventual saving establish acceptable delays? | Conditional claims avoid manufactured failure. The uncertain case's proposed sequence could accidentally assert ordering. Replace its arrow diagram with an explicit before-or-after question; qualify its recommendation as provisional. No universal safety or delay guarantee follows from the fictional test. |
| Information designer: make assumptions readable | Are known sequences visible? Must anything be opened? Do unknown timings look known? | Static contexts and repeated labels preserve comparison. Avoid three dense columns or controls that hide evidence. Keep vertical sections and responsive diagrams only for established/explicitly conditional sequences. Screen-reader journey untested. |

Shared strength: concrete uses expose the work transferred beyond the component. Convergence: make the invariant test and changing dependencies explicit. Complementarity: practitioner recovery concerns make the expert's evidence boundary tangible. Unique finding: a sequential diagram in the uncertain case would imply the very order we do not know. Tension: provide a decision without presenting weak evidence as decisive; retain a possible, explicitly provisional recommendation with its assumption and the question that could overturn it.

Prioritized changes: differing field names → readers may infer intrinsic risk categories → state that use determines consequence; single known integration → unjustified generalization → name the representativeness assumption; unknown ordering drawn as a sequence → false certainty → ask before or after instead. Rejected: an automatic recommendation, scoring, parameter controls, a preferred architecture, and a second comparison of three architecture options that repeats the contexts.

Validation: build and nine regression checks pass; whitespace check passes. Desktop layout inspected at 1280px and mobile at 390px; diagrams reflow vertically and mobile content width is 382px, with no horizontal overflow. All three contexts are present in the browser accessibility tree. Independent-reader comprehension, browser zoom, and assistive-technology journey remain untested. Older reviews describe superseded designs.

## Previous revision: a story, a diagram, three choices

The intended discovery remains architectural judgment under uncertainty: a local benefit may move responsibility elsewhere, and choosing a design requires interpreting whether those dependencies can accommodate it. The user's reading feedback identified unclear retry wording, test jargon, an interruption detail with no explanatory payoff, and repetitive recommendations.

Separate editorial perspectives from one reviewer, following the multi-perspective guideline:

| Perspective / success | Questions inspected | Assessment and smallest revision |
| --- | --- | --- |
| Practitioner: recognize the decision | Why change? Who depends on confirmation? What would change the recommendation? | The timeout motivates action and invoicing exposes a dependency. Repeated recommendation prose obscured the choice. Retain one short argument, assumption, and challenge for each option. Actual operational usefulness is untested. |
| Newer reader: follow a concrete story | What does the agent see? What was tested? Why could an invoice use an old address? | Start with the screen error and checking the account before resubmitting. Replace trial terminology with test, remove interruption jargon, and show the two sequences. Reader feedback motivates this revision; revised comprehension is not validated. |
| Expert: preserve uncertainty | Is a wrong invoice observed? Does acceptance imply completion? Are two behaviors temporary or permanent? | Explicitly distinguish a predicted consequence from a test failure. Keep saved versus received visible and retain the long-term versus migration distinction. The diagram is conditional on unchanged invoicing behavior, not a claim that background processing necessarily fails. |
| Designer: simplify the reading path | Can the sequences be compared? Are choices recognizable? Must anything be opened to understand them? | Use two static diagram lanes with arrows and vertically stacked mobile steps. Replace architectural labels with new/current/both and remove sample-statement disclosures. Inspect reflow; do not infer comprehension from layout checks. |

Shared strength: the address-to-invoice dependency makes responsibility moving between components concrete. Convergence: abstract labels and repetition hindered the story. Complementarity: the diagram both reduces reading effort and makes confirmation timing precise. Unique expert concern: presenting a hypothetical invoice error as an observed result would manufacture certainty. Tension: brevity versus evidence boundaries; retain the conditional lane label and explicit uncertainty sentence while moving the fictional-example note to the end.

Priorities: unclear opening → reader cannot picture the problem → tell the agent's experience; abstract dependency → consequence is hidden → diagram the two sequences; repeated recommendation blocks → choices feel more complicated than they are → compress to three visible options. Rejected: removing assumptions, naming a winning architecture, adding controls, and suggesting a test proves global safety.

Verification: build and nine regression checks pass; whitespace validation passes. Desktop diagram and choice layout inspected. Mobile layout checked at 390px with no horizontal overflow. Independent-reader comprehension, browser zoom, and a screen-reader journey remain untested. Earlier reviews below describe superseded versions.

## Previous design: architectural judgment under uncertainty

This replaces the measured database reversal. The discovery is that local evidence supports a conditional expectation about the wider platform. A design may move responsibility to callers and operators; interpreting whether they can accommodate it is part of the architectural judgment. The existing route remains `/toolbox/engineering/eligible-is-not-selected/` for preview continuity.

Shared fictional evidence: background processing accepts tested bursts promptly and completes tested updates correctly, including after an interruption. Acceptable completion times across wider conditions remain unestablished. The address update → confirmation → invoice dependency is known; its migration difficulty and coverage across older scripts are uncertain. A possible invoice error is explicitly not an observed failure.

Three intended long-term choices have matched labels: interpretation; recommendation and burden; critical assumption; what would challenge it. Optional native disclosures contain sample review statements. Temporary coexistence during migration is distinguished from permanent support for two guarantees. No winner, score, fabricated benchmark, or pilot-versus-wait framing is presented. Data owns the choices; the dedicated renderer owns the shared narrative. Obsolete numerical model and styling are replaced.

### Multi-perspective review

Applied the engineering and multi-perspective guidelines. These are separate editorial perspectives from one reviewer, not independent reader studies.

| Perspective / success | Questions checked | Strength, weakness, revision, limitation |
| --- | --- | --- |
| Practitioner: explain a recommendation | Why act? What responsibility moves? What changes the recommendation? | Current timeouts give action value; each option carries a burden. Abstract justification was insufficient. Make migration depend on callers the team can coordinate with, and give each option explicit challenging evidence. No real architecture recommendation is validated. |
| Newer reader: follow the dependency | What does success mean? Why does invoicing care? How do options differ? | Concrete address-to-invoice chain precedes the choices. Separate observed dependency from hypothetical invoice failure. Shared evidence appears once. Reader comprehension untested. |
| Expert: bound the claims | Is acceptance confused with completion? Is dual support just migration? Can mixed updates conflict? | Limit trial evidence to tested correctness and prompt acceptance. Define options by long-term guarantees; retain queued-versus-immediate ordering concern. Prior export experience is relevant but incomplete. No claim about actual completion-time adequacy. |
| Designer: expose interpretation | Can labels be compared? Are options ranked? Does optional wording obscure the main path? | Three vertically arranged choices use matching labels and native disclosures. Avoid a wide prose table and duplicate concluding matrix. The assumption and its challenge remain visible without interaction. Screen-reader journey and comprehension untested. |

Synthesis: concrete dependency before alternatives resolves convergent practitioner/new-reader concerns. Expert differentiation of transition versus destination prevents false alternatives. Tension between openness and false equivalence is resolved by explicitly stating that evidence can support assumptions unequally. Priorities applied: bound the trial, show dependency, distinguish architectural destinations, expose assumptions and challenges. Rejected: benchmarks, preferred-option badges, scoring, extra scenarios, and mandatory interactions.

Verification: build, nine regression/structure checks, and whitespace validation pass. Desktop choices and mobile dependency/choice text inspected at 390 × 844, with document width 382px and no horizontal overflow. All three native disclosures opened with Enter. The expanded final statement was visually inspected on mobile. No JavaScript is required for the choices or disclosures. Independent-reader comprehension, screen-reader journey, zoom, and measured contrast remain untested. Historical reviews below are retained as superseded iterations.

## Superseded design: independent changes sharing database capacity

This design replaces the support-assistant story. Each change independently improves the same original system; neither is a repair for a problem introduced by the other. Discovery: independently beneficial changes can interfere when combined because they share a limited resource.

The fictional shop has checkout and order-history services. Each changes independent sequential database reads to concurrent reads. All four configurations replay the same request mix and arrival timing, with the same data and capacity, and both services present. Original average response times are 1.4/1.1 seconds; checkout-only 0.9/1.1; history-only 1.4/0.7; both 2.2/1.8. Results remain correct. These are invented outcomes, not a simulation or production measurements. Increased simultaneous work and database waiting are separately stipulated observations explaining the reversal; latency alone is not claimed to diagnose contention.

### Credibility clarification

The setup now specifies separate service request limits whose combined allowance exceeds the database’s efficient concurrency. Each local change fits within available capacity on its own. Together they increase overlap, creating competition for processing and storage resources; slower active lookups also hold up waiting requests. Query count and customer traffic remain unchanged. This is a possible outcome under the stated conditions, not an inevitable consequence of parallel requests. The follow-up tests a combined limit rather than vaguely adding another per-service limit.

Mechanism references checked: [PostgreSQL connection guidance](https://wiki.postgresql.org/wiki/Number_Of_Database_Connections) and [HikariCP pool-sizing guidance](https://github.com/brettwooldridge/HikariCP/wiki/About-Pool-Sizing). These support the possibility of excessive concurrency degrading performance, not the fictional timings. No numerical or behavioral model was added; this is an explanatory copy revision.

### Review against repo guidelines

Applied the engineering guide pattern, multi-perspective review, and experiment comparison guidance. Separate editorial perspectives from one reviewer:

| Perspective / success | Questions inspected | Strength, weakness, smallest revision, limitation |
| --- | --- | --- |
| Practitioner: identify a real interaction | Does each change help independently? What do they share? What should be investigated? | Both changes help the same baseline; shared capacity provides a concrete causal connection. Avoid implying concurrency limits or more capacity are proven fixes; frame them as candidates to test. Operational usefulness untested. |
| Newer reader: follow the two wins and reversal | What runs at once? Does “only” remove the other service? Which time is better? | Plain-language sequential/concurrent explanation and four rows support the comparison. Explicitly state both services run in every test and label seconds/lower-is-faster. Comprehension untested. |
| Expert: separate observation from explanation | Is workload fixed? Are query counts changed? Does latency prove contention? | Fixed arrivals, data, capacity, and correct results bound the comparison. State that lookup count per customer is unchanged; specify database waiting separately. Synthetic averages do not establish tail behavior, failures, or a universal effect of concurrency. |
| Designer: preserve the four configurations | Are wins before the reversal? Can all configurations be compared on mobile? Are units visible? | Four rows and two response columns fit a compact table. Retain static evidence and one optional disclosure; no toggles needed. Screen-reader journey untested. |

Synthesis: practitioner and expert findings converge on a common baseline and independent single-change tests. Reader concern about “only” reveals a possible workload confound; explicitly keep both services in every run. Unique expert concern: a slowdown does not alone establish the proposed mechanism. Tension between numerical concreteness and false empiricism is resolved with explicit fictional labeling and separately stated database observations. Priorities: genuine independent wins, shared-resource mechanism, all four configurations, broader interaction lesson. Rejected: workaround framing, different baselines, invented production evidence, and interaction controls that merely hide rows.

Verification: full build, nine checks (including independent gains, combined reversal, all four configurations, and static comparison), and whitespace validation pass. Desktop and 390 × 844 mobile comparison inspected; mobile content width 382px within 390px viewport. Native disclosure opens with Enter. Independent-reader comprehension, screen-reader journey, zoom, and measured contrast remain untested. Earlier reviews below are superseded.

## Earlier revision: improvements do not simply add up

This revision supersedes the designs below. The opening establishes two legitimate local successes before revealing their interaction: extra checks raise assistant correctness from 9 to 11 of 12; a fallback reduces paused calls from 6 to 2 compared with extra checks alone. Three explicit columns preserve the different baselines. The combined workflow matches the original’s final correctness and paused-call count, but agent lookup time rises from 10 to 18 minutes. Extra checks alone use 6 minutes of agent lookup time. All figures are invented and effort is independently specified.

The mechanism is overlap: additional assistant checking gives agents more reason to trigger a manual fallback, so both research the same policy. The page’s purpose is to trace that interaction, distinct from the related guide’s task of connecting evidence to a recommendation.

### Separate editorial perspectives

Reviewed against `docs/engineering-toolbox.md`, `docs/multi-perspective-review.md`, and the comparison requirements of `experiments/README.md`. One reviewer adopting separate perspectives; no reader study.

| Perspective / success | Questions checked | Strength, weakness, revision, limit |
| --- | --- | --- |
| Practitioner: see both wins and combined cost | Does each change succeed? What work overlaps? Where would redesign begin? | Two named teams and a refund-policy trace make the interaction concrete. Previous version announced the drawback immediately. Establish both wins first; offer handoff hypotheses only after the mechanism. Actual usefulness untested. |
| Newer reader: follow the discovery | What is the fallback? Why is it helpful? Why do two people/processes do the same lookup? | Plain-language fallback and ordered sections support the sequence. Three comparisons can be confusing. Label the original, extra checks, and combined workflows explicitly. Comprehension untested. |
| Expert: avoid adding incompatible gains | What baseline supports each win? Is combined service actually worse? Are the numbers empirical? | Different baselines are explicitly named, and original versus combined holds final correctness and paused-call count equal while effort increases. No claim that both changes independently beat one common baseline. Fictional evidence does not establish general causality or total cost. |
| Designer: retain the comparison without a reveal gimmick | Does the story precede the table? Are all three columns legible? Can readers inspect the mechanism without clicking? | Sequential prose precedes a static table with all workflows visible. Four columns require phone inspection; row-label width reduced while retaining text and units. Screen-reader journey untested. |

Synthesis: practitioner and reader concerns converge on establishing success before explaining duplication. Expert baseline clarity prevents the narrative from manufacturing a paradox. Designer preserves sequence without hiding essential evidence. Tension: a surprising story versus transparent comparisons; resolve by naming both local baselines immediately, then comparing the combined workflow to the original. Priorities: establish two successes, explain overlap, expose the complete comparison, end on interactions. Rejected: an extra fabricated win, success/failure scoring, mandatory reveal controls, and claiming every metric worsens.

Verification: **Pass** — full build, nine checks including each local baseline and combined outcome, whitespace validation. **Pass** — desktop and 390 × 844 mobile table inspected; document width 382px within 390px viewport; native disclosure opens with Enter. **Not checked** — unfamiliar-reader comprehension, screen-reader journey, zoom, measured contrast. Earlier reviews below describe superseded versions.

## Earlier revision: component gain versus whole-workflow result

The accuracy/timing comparison below is superseded. Current discovery: more accurate assistant output can still leave an agent–assistant workflow doing more work for the same final answer quality.

The fictional comparison now records separate outcomes for the same twelve customer questions and policies. Assistant correctness rises from nine to eleven; final customer-facing correctness stays at twelve because agents correct mistakes; manual lookups rise from four to seven; total agent lookup time rises from ten to eighteen minutes. Lookup effort is an independent fictional observation, not calculated from answer accuracy or latency. No total call duration or satisfaction claim follows. A refund-policy example explains duplication: the agent starts looking while waiting and finds the same policy the assistant later returns.

Review against the engineering, multi-perspective, and comparison guidelines (separate editorial perspectives from one reviewer):

| Perspective / success | Questions checked | Strength, weakness, smallest revision, limit |
| --- | --- | --- |
| Practitioner: compare the service delivered | What did the customer receive? What work did staff do? What did the component gain? | Separately labeled component and workflow rows answer these directly. The previous table ended at output availability. Add final correctness and recorded manual effort; actual operational usefulness remains untested. |
| Newer reader: understand why the result changes | Why look manually? Who corrects mistakes? Why is work duplicated? | The refund call names the same answer and repeated lookup. State that agents check suspicious or missing answers and correct mistakes before replying. This describes the fictional cases, not infallible human review. Comprehension remains untested. |
| Expert: avoid deriving unmeasured outcomes | Is effort inferred from slowness? Is final accuracy measured separately? Does lookup time mean call duration? | Separate fictional inputs establish the example’s comparison. Make their invented status explicit, bound the claim to these cases, and retain possible benefits on other cases. No empirical causal evidence is claimed. |
| Designer: distinguish the two evaluation levels | Can readers see local gain and combined result together? Is the result beside the table? Does the table fit on mobile? | Explicit “Assistant alone” and “Whole workflow” labels replace a timing-only comparison. Keep the static table and immediate consequence; inspect the fourth row at phone width. Screen-reader journey remains untested. |

Synthesis: practitioner and expert concerns converge on observing the combined workflow rather than treating assistant timing as its outcome. The newer reader needs the human compensating action to connect those levels. Unique expert concern: lookup time is not total handling time. Resolve breadth versus simplicity by showing one final quality measure and one human-effort measure with lookup counts explaining the mechanism. Priorities completed: separate outputs from final answers, explain human correction and duplication, state effort independently. Rejected: deriving customer satisfaction or resolution from these counts, claiming latency is always harmful, and adding controls.

Verification: **Pass** — rebuild, all nine checks, and whitespace validation. **Pass** — desktop and 390 × 844 mobile comparison inspected; mobile document width 382px, no horizontal overflow. Native disclosure opens with Enter. **Not checked** — independent-reader comprehension, screen-reader journey, zoom, measured contrast. Earlier verification below applies to superseded versions.

## Earlier support-assistant design · October 27, 2026

This revision replaces the test-scheduling scenario. The historical review below describes superseded content and verification, not the current page.

Discovery: a component’s local improvement does not establish an improvement in the combined result. Its contribution depends on the workflow around it.

Recognizable problem: an agent needs an answer while talking to a customer. Extra checking produces more accurate answers but delays some until after the agent has handled the question. The local gain is explicitly measured as correct answers; the combined outcome is correct answers available while help is still needed. This is an opportunity to help, not proof of successful resolutions.

Format: example-led explanation with a static comparison and an optional native disclosure. Both versions stay visible; there are no controls that merely switch text. Twelve fictional paired questions, fixed points when the agent handles each question, and invented outcomes make the assumptions explicit. Current: nine correct, one of those late, eight timely and correct. New: eleven correct, six of those late, five timely and correct. Late correct answers are a subset of correct answers, not a separate denominator. No production examples, numbers, or metrics are reproduced.

### Separate editorial perspectives

Applied `docs/engineering-toolbox.md`, `docs/multi-perspective-review.md`, and the relevant comparison guidance in `experiments/README.md`. These are perspectives from one editorial reviewer, not independent reader studies.

| Perspective / success | Questions inspected | Evidence, weakness, revision, limitation |
| --- | --- | --- |
| Practitioner: recognize the decision | Why add checks? What improves? What happens to the agent? | Extra checking has a clear purpose; a refund-policy call makes lost assistance tangible. Avoid jumping from answer availability to resolved calls. Track actual use and resolution in a follow-up. This remains a fictional scenario. |
| Newer reader: see the consequence immediately | What are the two versions? Which count improves? Why does usefulness fall? | A three-row comparison keeps the same versions adjacent. “Correct but late” could be mistaken for all late answers; label it “Of those” and explain the inclusion rule. Reader comprehension remains untested. |
| Subject expert: keep the inference bounded | Are questions paired? Is the timing boundary fixed? Are correct answers assumed to resolve calls? | Both versions see the same questions at the same point, with fixed handling points. Real agents may wait or adapt; the fixed replay is explicitly a simplification. State that timely correctness measures an opportunity, not satisfaction or resolution. No empirical causality is claimed. |
| Information designer: expose rather than hide the comparison | Is a control necessary? Is the consequence next to the counts? Can both columns fit on mobile? | A static table removes queue reconstruction and interaction costs. Put the gain and loss directly beneath the table, retain a native disclosure for the email contrast, and inspect narrow rendering. Accessibility beyond native semantics needs separate testing. |

### Synthesis

Shared strength: a familiar human workflow makes the interaction visible without explaining a scheduler. Convergence: present the local gain and loss of timely help together. Complementarity: the expert’s subset requirement also clarifies the counts for a new reader. Unique expert concern: fixed handling points simplify how agents may adapt to a slower assistant. Tension: numerical clarity versus invented precision; resolve with a small, explicitly fictional paired comparison, no timing estimates, and bounded outcome wording.

Priorities completed: replace the scenario; foreground the concrete call consequence; show both versions in one table; connect the ending to dependent people and components. Rejected: accuracy/latency sliders, simulated waiting, and a claim that speed is always preferable. A native email-support disclosure shows that the same component may contribute differently in another workflow without asserting unmeasured results.

Verification: **Pass** — full toolbox build, nine checks including scenario subset validity and complete static comparison, and whitespace validation. **Pass** — desktop comparison and 390 × 844 mobile comparison inspected; mobile content width 382px within 390px viewport. Both versions and the consequence remain visible together. Native disclosure opens with Enter. **Not checked** — independent-reader comprehension, screen-reader journey, zoom, or measured contrast. Historical checks below apply only to the replaced scenario.

---

## Historical design and review (superseded)

# This Part Improved. Did the System?

## Purpose and scope

Route: `/toolbox/engineering/eligible-is-not-selected/`.

Discovery: a local improvement does not establish a system improvement. A component’s contribution depends on its interactions with the rest of the system.

Illustrated mechanism: admitting more useful work can reduce useful work completed when new candidates compete under an unchanged ranking rule and capacity limit. Eligibility, ranking, and capacity describe this example, not the full scope of the lesson.

Starting assumption: including tests for connected features should catch more bugs. Visible counterexample: Invoice totals keeps priority 80 but moves from slot 3 to position 5 when two passing tests become eligible. Receipt email becomes eligible yet remains outside the four-slot limit. Excluded bug-finding tests fall from one to zero; bugs caught before release fall from two to one.

This is a new fictional test-scheduling example. It uses seven tests, four execution slots, three distinct bugs, invented priority scores, and counts of excluded bug-finding tests and bugs caught. It does not reproduce the extraction repository's documents, experiment cases, benchmark counts, percentages, or retrieval metrics. The scheduler does not know the outcomes; those are supplied to the reader from a separate complete check of this fictional build. Every test consumes one slot. No real tests are run by the controls.

## Design brief

Format: interactive illustration within an engineering guide. One scenario develops the mechanism; a second unrelated example is unnecessary.

| Question | Action | Fixed conditions | Visible comparison | Recovery and learning |
| --- | --- | --- | --- | --- |
| Does admitting connected-feature tests improve this pre-release check? | Switch eligibility between directly changed features and both groups. | Same build, test outcomes, priorities, four slots; each failure exposes a distinct bug. | Baseline stays visible; selected queue changes, with labeled Runs/Waits, positions, cutoff, newly eligible tests, and count deltas. | Switch back using the same radio group. The original queue and counts return. Eligibility is only one part of selection. |

Opening: site typography, recognizable situation, prominent distinction. Controls, fixed conditions, and immediate result are adjacent. Desktop: baseline and selected queue appear side by side. Mobile: selected queue precedes the baseline so the changed work stays near the control; count deltas remain above both. No animation, simulated execution, form completion, or random sampling. Both complete states remain readable without JavaScript.

Color roles: inherited green identifies selected configuration, never correctness; ochre edge identifies tests that would expose bugs, accompanied by explicit text. Neutral borders group queue items; a dashed, labeled capacity boundary separates Runs from Waits.

Ending: explain competition for existing slots, then generalize to evaluating the combined outcome and preserved constraints. Acknowledge that accepting a weaker local result can also improve the whole. Limits: narrower eligibility is not universally better; ranking and capacity changes need separate evaluation; this does not establish release safety.

## Multi-perspective review

Applied `docs/engineering-toolbox.md`, `docs/multi-perspective-review.md`, and `experiments/README.md`. These are separate editorial perspectives from one reviewer, not independent reviews or a user study.

### Practitioner

Success: understand what to compare before adopting a broader rule.
Questions: Why consider broadening? What remains fixed? Which useful work is lost? What next investigation follows?
Strength: connected features can break; the proposed change has a legitimate purpose. Fixed capacity makes the displacement concrete.
Weakness: a label change alone did not demonstrate the scheduling consequence in the initial implementation.
Revision: replace highlighting with a selected queue that actually changes alongside a persistent baseline.
Limit: no claim about an actual scheduler or deployment outcome.

### Newer reader

Success: distinguish a test being eligible from running before release.
Questions: What is a slot? Why does a higher score win? How do we know which tests fail? Can fewer exclusions coexist with fewer caught bugs?
Strength: named tests, explicit positions, Runs/Waits, and one slot per test show the chain.
Weakness: revealed outcomes could make the scheduler appear irrationally omniscient.
Revision: explain separate complete checking and explicitly state that the scheduler does not know outcomes. Explain that priority uses past failures.
Limit: comprehension with an unfamiliar reader remains untested.

### Subject expert

Success: hold confounders fixed and avoid universal conclusions.
Questions: Do scores or capacity silently change? Can multiple tests count the same bug? Is broader eligibility necessarily harmful? Is release safety inferred from coverage?
Strength: fixed scores, explicit distinct bugs, and identical capacity support the comparison. Broadening eligibility is the only changed input.
Weakness: treating all runtime costs as equal is a deliberate simplification.
Revision: disclose one slot per test; separate increased capacity and its runtime cost as another investigation. State limits on generalization and release safety.
Limit: deterministic fictional mechanism, not empirical causal evidence.

### Information designer

Success: readers can see what changed without reconstructing an earlier screen.
Questions: Is the baseline retained? Does selection change the queue? Are controls next to results? Does mobile preserve the reading order? Is color essential?
Strength: persistent baseline, position labels, numerical deltas, and named displaced test support direct comparison.
Weakness: initial mobile stacking placed the baseline before the selected queue, separating the control from the changed result.
Revision: put selected state first in DOM and mobile reading order, while placing baseline left on desktop. Use native radios and disclosure, text alternatives, and a short live update.
Limit: keyboard interaction and responsive rendering inspected; screen-reader journey and zoom not tested.

## Synthesis

Shared strength: one plausible proposal produces a visible local gain and downstream loss under stated conditions.
Convergence: clarify the distinction between eligible and executed; keep changed results close to the control.
Complementarity: expert requests for fixed conditions also address the newer reader's question about what the scheduler knows.
Unique expert concern: distinct bugs must be stated to make test failures and bug counts comparable.
Tension: retain detailed comparison without burying the current result on mobile. Resolution: show deltas immediately, selected queue first on narrow screens, baseline alongside it on desktop.

Prioritized changes completed: (1) actual reversible queue selection; (2) explicit outcome knowledge and fixed conditions; (3) mobile selected-first arrangement.
Rejected: additional scoring sliders, simulated test runs, more scenarios, production data, and a universal recommendation to narrow filters. These would distract from the single mechanism or overstate the evidence.

## Verification

- Pass: full toolbox build; nine unittest checks including existing guide preservation, repeatable builds, new scenario arithmetic, fixed capacity, restoration without mutation, and complete static states with unique IDs.
- Pass: browser selection changes the visible queue and counts; keyboard Left restores current eligibility; native disclosure opens with Enter.
- Pass: desktop comparison inspected at 1280 × 900; mobile controls, summary, and queue cards inspected at 390 × 844. Mobile document width is below viewport width; no horizontal overflow observed.
- Pass: baseline remains visible; original and selected states have separate IDs; text identifies outcomes without color; no console warnings or errors observed during the journey.
- Pass (source inspection): no-JavaScript fallback contains both full comparisons and hides unusable controls. JavaScript-disabled browser run not performed.
- Pass: generated guide is in engineering collection and sitemap; related destinations exist; whitespace check clean.
- Not checked: unfamiliar-reader comprehension, screen-reader journey, browser zoom, measured contrast audit.
- Not applicable: randomness, replay sampling, unavailable actions, animation/reduced-motion transitions.

Source: scenario data in `data/engineering-tools.json`; page renderer in `scripts/build_system_selection.py`; progressive enhancement in `js/engineering-selection.js`; scoped styling in `css/engineering-selection.css`. Build via `PYTHONDONTWRITEBYTECODE=1 python3 scripts/build_toolbox.py`.

## Framing revision · October 26, 2026

The original opening promoted the example’s eligibility/selection distinction into the guide’s central idea. The revised title, collection card, distinction, and ending address local versus system outcomes. The eligibility → ranking → execution sequence now belongs to the worked example. The route is retained.

Separate editorial perspectives, assessed before synthesis:

| Perspective / success criterion | Questions inspected | Strength, weakness, revision, and limitation |
| --- | --- | --- |
| Practitioner: apply the lesson outside scheduling | What improved locally? What changed elsewhere? Which overall outcome matters? | The queue gives a concrete causal chain; scheduling-specific closing wording limited transfer. Replace it with three reusable questions. Actual use in a decision remains untested. |
| Newer reader: distinguish idea from illustration | Is this about speed? Is eligibility the main lesson? What does the example demonstrate? | The local gain and overall loss are visible; “System performance” and the opening flow narrowed the subject. Use “Local and system outcomes” and put the flow inside the example. Reader comprehension remains untested. |
| Subject expert: avoid overgeneralizing the counterexample | Is local improvement always harmful? Must every component improve? What constraints matter? | The fixed comparison supports one possible interaction; it does not establish a universal rule. Retain “can” and the example’s limits, and acknowledge that a local sacrifice can benefit the whole. The reverse case is a general possibility, not a result demonstrated by this interaction. |
| Information designer: preserve the idea-to-example hierarchy | Does the title name the lesson? Does the scenario have its own heading? Does the ending add broader insight? | The existing comparison remains useful. Change the opening and ending hierarchy without adding another interaction. Visual layout needs reinspection after the longer closing copy. |

Synthesis: practitioner and newer-reader concerns converge on separating the transferable lesson from the specific mechanism. The designer’s hierarchy change supports that distinction. The expert uniquely identifies the need to allow local sacrifices, avoiding a demand that every measure improve. Resolve the tension between generality and concreteness by keeping one detailed example between a broad opening and closing. Priorities: reframe the title and distinction, relocate the flow, then broaden the ending. Rejected: more metrics, controls, or a second scenario; none is needed to correct this framing.

Revision verification: **Pass** — full rebuild, all nine existing checks, and whitespace validation. **Pass (visual inspection)** — revised opening at 1280 × 900 and expanded closing text at 390 × 844 are readable without visible clipping. **Pass (editorial inspection)** — title and distinction state the broader lesson; the flow belongs to the example; the ending generalizes beyond scheduling. Earlier interaction checks above describe the prior version; no interaction logic was changed in this revision. **Not checked** — independent-reader comprehension, screen-reader journey, zoom, or measured contrast.
