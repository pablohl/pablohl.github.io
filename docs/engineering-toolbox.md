# Engineering Toolbox: example-led hiring guide

## Purpose on the website

Show how Pablo reasons through engineering decisions by making the reasoning concrete. The visitor's likely first goal is to understand an idea and decide whether it is useful. A form demanded effort before demonstrating value, and its output merely reformatted the visitor's inputs.

The guide now starts with recognizable interview situations and comparisons that expose where an impression goes beyond the evidence. Its useful result is a better question or a more precise claim for a real hiring discussion. We do not assume visitors will evaluate candidates on this website.

## Information structure

- Toolbox remains in primary navigation; existing decision-lens URLs remain intact.
- Engineering Toolbox introduces the first guide without empty category filters.
- The hiring guide opens with the gap between observing interview behavior and predicting future work. A concise Evidence → Expectation → Uncertainty relationship and three questions introduce the proposed distinction.
- An accessible selector defaults to ML evaluation and displays one example at a time. Each example contains the role and interview scenario, a tempting conclusion, two contrasting cases, what each supports, and an explanation immediately connected to those cases.
- An optional disclosure explains that its statements are sample wording for the hiring team. Both compared responses have a matching statement and specific follow-up.
- The closing discussion draws four lessons that stand on their own without requiring both examples. Reusable wording accommodates a specific expectation or concern, with a separate variant for a capability that has not been tested. The worked conclusions appear only beside their examples, without a repeated application table in section 4.
- Related decision lenses explain the broader reasoning.

## What changed after review

Removed the six-field form, completion counter, copy control, forecast preview, and detached interpretation notes. Replaced the abstract instruction about consequential behavior with an ML example where noticing a risk either changes the release recommendation or does not. Replaced the abstract missing-evidence warning with a System design example contrasting an unasked question with an observed difficulty. Support needs and uncertainty appear inside a concrete discussion example rather than as six compulsory fields.

The examples are illustrative, not actual candidate evaluations or a validated hiring instrument. They support narrow, contextual claims rather than hire/no-hire recommendations.

## Presentation and reuse

Use the site's existing cream, green, serif headings, and sans serif body text. The problem and distinction share a two-column opening on wide screens and stack below 760px. Reduced section gaps, heading sizes, panel padding, and repeated text keep the examples close to the introduction. Comparisons appear as labeled tables at wide widths and as stacked, fully labeled cases below 760px. Optional discussion examples use native disclosures, with two matching columns on wide screens and stacked statements on narrow screens. Section 3 uses one visible heading, a compact tempting conclusion, the comparison, and a short interpretation. Prompting and role notes appear inside the optional discussion rather than interrupting that sequence. A small progressive enhancement script provides the example selector, including arrow keys, Home/End, roving focus, and direct example links. Without JavaScript, both complete examples remain visible. No visitor input, storage, or clipboard access is used.

`data/engineering-tools.json` contains the guide's scenarios, comparisons, explanations, and discussion questions. `scripts/build_engineering_toolbox.py` renders them with the existing shared site shell. `css/engineering-toolbox.css` owns their presentation. Run `python3 scripts/build_toolbox.py` to regenerate both collections and sitemap entries.

Each example's `conditions` hold notes about prompting or role expectations. The guide’s `discussionTemplate` supports an expectation or concern; `insufficientEvidenceTemplate` handles an untested capability. Section 4 contains shared lessons and reusable wording, so the selector only switches the example panels. Edit these source fields rather than the generated HTML.

When the contrasting cases need different discussion conclusions, use `discussionCases` with a label, `boundedConclusion`, and `followup` for each case. Match the labels to the comparison columns so readers can tell which evidence each conclusion addresses. Otherwise, the example's single `boundedConclusion` and `followup` remain supported.

Run `PYTHONDONTWRITEBYTECODE=1 python3 -m unittest discover -s scripts -p 'test_build_engineering_toolbox.py'` to check that rebuilding preserves the published guide, every tab has a readable static panel, and repeated builds are stable.

The reusable editorial pattern is recognizable problem → proposed distinction → selectable examples → discussion. Each example contains a situation, tempting conclusion, contrasting evidence, and bounded interpretation. Future tools can use a different interaction if it helps visitors understand the decision; a worksheet is not the default requirement.

## Verification

Desktop layout and example selection visually inspected. ML defaults to selected, switching hides the other panel, arrow-key and End navigation change selection, Tab enters the selected panel, and direct system-design links select that example. Both comparison cases appear with their labels; discussion disclosures checked. Rebuilding is reproducible; sitemap parses; generated links resolve locally. No form or worksheet script remains in the guide.

The October 24 readability revision was also inspected at 375px: comparisons and discussion statements stack without horizontal overflow. Not checked: browser zoom, independent-reader usability. Editorial inspection and regression checks do not establish reader comprehension.

The first version was merged in PR #50. PR #60 continues the revisions on `codex/hiring-discussion-cases` in an isolated worktree.


## Readability review · October 24, 2026

Reviewed using `experiments/README.md` and `docs/multi-perspective-review.md`. This is an explanatory guide with scenario navigation and optional reveals; simulation, stochastic replay, and numerical model checks are not applicable. Central discovery: an interview observation supports a conditional expectation about work, not a general verdict about a person.

These are separate editorial perspectives from one reviewer, not independent user studies. Each was considered before synthesis; none establishes that a new reader will understand the page.

| Perspective / success criterion | Questions inspected | Strength; weakness; smallest revision |
| --- | --- | --- |
| Practitioner: usable hiring discussion | Which response is being described? What work does it suggest? What would I ask next? | Bounded expectations and follow-ups remain useful. One ML statement versus two System design statements made the purpose uneven. Give each compared response matched sample wording and label the purpose explicitly. |
| Newer reader: a clear first reading | What is leakage here? What should I read next? Must I read the other example? | Concrete interview situations help. Abstract leakage wording, several competing questions, and references to an unseen example hindered reading. Use a payment-time example, one reading sequence, and standalone closing lessons. |
| Subject expert: evidence matches the claim | Is leakage established or only suspected? Does a later-data test exclude unavailable inputs? Is untested ability being confused with observed difficulty? | Conditional claims and role context are preserved. A later-data test alone would not remove leaked information. Explicitly restrict the retest to information available at payment time; retain different column labels for different contrasts. |
| Information designer: consistent comparison | Do both examples share row labels? Are conclusions matched to the columns? Do optional statements reflow and work by keyboard? | Existing tabs and static fallback support navigation. Repeated headings and unmatched statements created competing paths. Remove redundant titles, share row labels, and pair statements using the same labels as the comparison. |

Shared strength: recognizable scenarios connect observed behavior to a limited expectation and a next check. Convergence: terminology and visual repetition obscured that connection. Complementary finding: the abstract leakage definition also hid what a valid follow-up test would do. Unique expert finding: later transactions alone are insufficient if the retest still uses later-known inputs.

Priority and synthesis: competing headings → unclear reading order → readers lose the comparison → remove scenario questions and comparison/takeaway subheadings. Mismatched discussion examples → unclear relationship to the evidence → readers cannot map conclusions → give both examples two labeled statements. Abstract leakage and cross-example references → assumed context → readers cannot follow a single scenario → use a concrete payment-time explanation and standalone lessons.

Tension resolved: consistency of presentation does not require identical evidence categories. Preserve ML evaluation’s risk-naming/action distinction and System design’s untested/observed-difficulty distinction. Rejected: forcing identical column headings, adding controls or another explanatory stage, or replacing the guide with a candidate-scoring form.

Verification: **Pass** — rebuilt output matches the source; three regression tests pass; both tabs, arrow-key navigation, Enter disclosure operation, and matching application blocks checked in the browser. **Pass** — expanded sample statements visually checked at desktop and 375px, with no horizontal overflow; both comparisons retain their labels. **Pass (editorial inspection)** — the main path uses the same situation → comparison → interpretation → optional wording order, and closing lessons do not depend on an unseen scenario. **Not checked** — independent-reader comprehension, assistive-technology journey, browser zoom. **Not applicable** — simulation arithmetic, animation, randomness, reset, and numerical comparison encodings.


## Follow-up: precise claims and a shorter ending

The earlier readability review above records the intermediate version; this follow-up supersedes its application-table design. Applied both guidelines again to the same discovery: distinguish what an interview showed, the conditional prediction it supports, and the remaining uncertainty.

| Editorial perspective | Questions checked | Assessment and smallest change |
| --- | --- | --- |
| Practitioner | Can the wording express a concern? Can it name support? Can it admit insufficient evidence? | Contextual statements and follow-ups work; a positive-only template did not cover all cases. Generalize it and add an explicit untested-capability variant. |
| Newer reader | What was observed in ML evaluation? What is unknown? Does section 4 add something new? | Concrete scenarios and matched labels remain useful. “Untested” understated the observed release recommendation, and the ending repeated a completed conclusion. State the concern directly and remove the repeated application. |
| Subject expert | Did they merely name a risk? What recommendation followed? What does the interview establish about revision with guidance? | The candidate actually recommended release without resolving the identified risk. That supports a concern about this answer; response to guidance remains unknown. Make this distinction in the comparison, takeaway, and sample statement. |
| Information designer | Do the tabs still select complete panels? Are conclusions repeated? Does the shortened ending reflow? | Preserve the paired sample statements and native disclosures. Remove the redundant synthesis table and its selector dependency, source fields, and styles. Keep broader lessons and reusable wording at the end. |

These are separate editorial perspectives from one reviewer, not independent user studies. Convergence: make each section add value rather than restating a conclusion. Complementarity: a neutral template accommodates the expert’s narrower interpretation. Unique expert finding: a problematic recommendation is observed evidence, even when ability to improve with guidance is unknown.

Priority / synthesis: observed recommendation described as missing evidence → misleading distinction → name the local concern and separate the unknown response to guidance. Positive-only template → pressure to invent a contribution → allow expectations, concerns, or explicit insufficient evidence. Repeated worked synthesis → extra reading without a new comparison → retain the worked statements by each example and shorten section 4. Rejected: adding more controls, identical contrast categories, a scoring form, or another explanatory stage. Tension resolved: remove redundant repetition while preserving the three-part framework in the opening and the paired, concrete discussion statements.

Verification: **Pass** — build and three regression checks; keyboard scenario selection and disclosure operation; both static panels preserved for readers without JavaScript. **Pass** — desktop and 375px inspection of the changed ML statement and shorter ending, with no horizontal overflow. **Pass (editorial inspection)** — observation, concern, and uncertainty are separate; the reusable wording handles all three evidence situations; section 4 no longer repeats a completed example. **Not checked** — independent-reader comprehension, browser zoom, screen-reader journey. **Not applicable** — simulation arithmetic, random sampling, replay, or animation. These checks establish implementation and editorial consistency, not validated comprehension.
