# Homepage editorial hierarchy · local review

Local revision on `codex/homepage-editorial-paths`, based on `e20d9d3`, reviewed November 1, 2026. Uncommitted work; no publication implied. Current intent and source ownership are in [Homepage design](../homepage-design.md).

The owner supplied a homepage review and requested items 1, 2, 4, and 5: stronger intellectual introduction, a prominent interactive example, visitor-action paths, and less résumé-like repetition with stronger editorial rhythm. The supplied review identified its lack of pixel-accurate screenshot inspection. Its design proposals were hypotheses, not verified visual defects.

## Editorial perspectives

One reviewer considered these perspectives; they are not independent reviewers or unfamiliar-reader observations.

| Perspective | Criterion, finding, and design response |
| --- | --- |
| Engineering practitioner | Show relevant substance quickly while retaining professional context. The model comparison makes the decision question concrete; the regulated-financial-workflow context and role remain visible without a three-column résumé summary. |
| Less experienced reader | Explain what each route offers and what happens after clicking. Read / Explore / Borrow distinguish intentions; the two exploration formats and essay/experiment links remain explicit. Comprehension has not been tested with unfamiliar visitors. |
| Subject expert | Preserve the scope of the invented figures. Accuracy and running cost match the destination's same 10,000-transaction set; the caption labels the invented figures and incomplete cost comparison. The preview accepts no choice and makes no claim of actual deployment suitability. |
| Information designer | Establish hierarchy through editorial scale, grouped navigation, and unequal emphasis among selected work. One experiment appears near the top, one essay has a larger treatment, and supporting selections are quieter. Existing preview vocabulary is reused. |

Convergence: the introduction's point of view needs a concrete demonstration and an understandable onward path. Tension: a featured example prioritizes one piece, while earlier navigation guidance avoids arbitrarily selecting a single guide. Resolution: explain why the metric example is featured, keep Engineering guides as a collection link, and let the Explore path offer both formats. Another tension is repeating the same subject in an essay and experiment; labels distinguish the activities and the duplicate lower experiment card is removed.

Item 3's broader visual-preview family is deferred. Existing navigation destinations and the Two Clocks SVG remain. No new model behavior, embedded choice, extra forms, animations, imagery series, or professional claims were introduced.

## Observed verification and limits

- **Pass:** homepage local HTML links, assets, fragments, and unique IDs checked (33 references). Featured accuracy/running-cost figures and transaction count agree with the experiment model. Whitespace check passes.
- **Pass:** rendered homepage at desktop and 375px/320px phone widths without horizontal overflow. The removed headline line break initially joined two words on phone; a text-space correction was inspected after reload.
- **Pass:** featured homepage link opens the matching model comparison; Model A choice and the first reveal work, reset returns to a disabled reveal until a new choice. This is an entry/recovery check, not the full unchanged experiment journey.
- **Pass:** Read and Explore paths update the intended local fragments; the Explore target settles at its scroll margin. Engineering guides opens the collection; Borrow opens the Decision tools fragment; the featured essay opens the corresponding essay. Browser Back restores the homepage.
- **Pass:** keyboard movement from the featured action reaches the first reader path with visible focus. Normal link semantics and the existing skip target are preserved.
- **Not checked:** browser zoom, assistive-technology journey, unfamiliar-reader interpretation, every social/external link, or the complete unchanged experiment journey. Viewport fitting and numerical agreement do not establish those properties.

The website was not regenerated: the homepage and its stylesheet are directly maintained. Other pages and experiment code are unchanged.

## Follow-up local design revision

After reviewing the first version, the owner requested follow-up items 1, 2, 3, and 5. The feedback was that Model A dominated both visible dimensions without offering an immediate action, the featured essay repeated the same metric idea, the Toolbox lacked an actual question, and too many headings/labels competed for attention. Item 4's guide/experiment visual balancing was not requested for this revision.

Design response: add a short two-choice reveal on the homepage; move the caveat into a readable footnote after the action; feature the executive-summary essay with Kirk/Spock and learning as supporting selections; show Preserve the Option's canonical question and booking context; reduce essay headline scale, use sans-serif navigation/About headings, tighten the hero gap, and remove repeated visible labels. The exploration region keeps its accessible heading. Existing guide-panel and Two Clocks preview compositions remain.

The new interaction is a choice/reveal, not a deployment simulation. Either selection reveals the same error comparison, retains the original scores, and identifies the selected model without scoring it correct. The counts come from the existing experiment model; cost assumptions and human review remain in the full experiment. Reset clears selection and hides the reveal, returning focus to the first choice. No selection is handed off; that boundary is stated beside the full-experiment link. Static HTML keeps the error comparison and link available without enhancement.

Editorial perspectives: the practitioner needs the actual trade-off rather than two headline scores; the newer reader needs an immediately usable control and clear continuation; the subject expert needs unchanged counts and no invented winner; the information designer needs less repetition and more selective hierarchy. These were considered by one reviewer. The resolution is one compact reveal, broader selected topics, and quieter supporting typography—not a full embedded simulator or a new graphic for every section.

### Follow-up verification

- **Pass:** six existing metric-model tests, new module syntax, and whitespace checks.
- **Pass:** browser Model A and Model B choices, switching from B to A with Space, exclusive pressed states, visible count comparison, reset hiding the result, and focus returning to Model A.
- **Pass:** revealed comparison at 320px without horizontal overflow; desktop layout at 1280px fits. The revealed table remains adjacent to the model choices in reading order.
- **Pass:** full experiment opens with no initial choice, the executive-summary essay opens its expected page, and the direct Toolbox link matches Preserve the Option's canonical question. Browser Back returns to the homepage.
- **Pass — structural fallback check:** static HTML contains the complete comparison and full-experiment link while the enhancement-only choice/reset controls begin hidden. This is not a JavaScript-disabled browser journey.
- **Not checked:** unfamiliar-reader understanding, full screen-reader journey, browser zoom, and an actual JavaScript-disabled browser journey. No animation or randomized results were added; this is not a fresh reduced-motion journey test.

## Screenshot-driven layout simplification

The owner then supplied screenshots showing the detailed model feature and the lower guide/experiment panels. The instruction was to remove the experiment specifics because the feature was too large, resolve the competing boxes, and integrate the detached Toolbox question. This supersedes the choice/reveal prototype above; its earlier checks describe discarded behavior.

The current feature is a compact editorial invitation with a question, one sentence, and a link. All model figures, choice controls, reveal content, and the unused homepage module/styles were removed. The experiment itself remains unchanged. Without numerical claims or homepage state, the preview no longer needs their detailed footnote.

The lower area is one “Explore further” section with Engineering guides, Two Clocks, and the actual Toolbox question as three rows. A shared category rail, title scale, content width, link treatment, spacing, and subtle separators integrate them. The colored guide panel and large experiment image were removed instead of adding another visual to balance competing panels. Categories stack above content on phone widths.

Design reasoning: the earlier revisions optimized individual features but accumulated too much visual weight. The screenshot feedback shifted the priority to the relationships among sections. The reusable lesson is to establish a shared layout grammar before assigning each offering its own box or visual emphasis. The current [homepage design reference](../homepage-design.md) owns these notes.

Observed checks: at 1280px the featured invitation is approximately 158px tall and contains no input/buttons; the lower section has three shared rows. At 375px and 320px the layout fits without horizontal overflow and the rows stack as intended. Existing fragment targets and destination links remain. These checks are local layout/navigation evidence, not unfamiliar-reader comprehension or a new zoom/screen-reader assessment.


## Selected visual: paired bars

The owner next requested three compact visual alternatives because the simplified page had become almost entirely textual. Local variants compared an error mosaic, paired bars, and an error-type toggle, all derived from the metric experiment. The owner selected paired bars. This selection is implemented on the local homepage, with the rest of the simplified layout preserved.

One static visual compares missed fraud and blocked valid payments on the same zero-to-80 scale, with direct Model A/B labels, counts, and a brief illustrative-population caption. The solid/patterned treatment distinguishes model identity without color alone. There are no costs, choice controls, or large numerical setup. The model trade-off is visible before opening the experiment.

Checks: all four counts and proportional bar widths agree with the experiment model; the homepage has no dependency on the local comparison pages. Browser reflow checks at 1280px and 320px found no horizontal overflow. The desktop feature is about 263px high. Unfamiliar-reader understanding, browser zoom, and a screen-reader journey were not newly tested.


## Selected navigation: compact three-column index

After comparing three local navigation treatments, the owner selected the three-column index. It now uses one primary link plus a one-word format label per column, with the earlier descriptions and repeated CTA lines removed. The paired-bar feature and curated collection remain unchanged. The three destinations are preserved and checked. Browser inspection confirms three columns and no horizontal overflow at 320px; at 1280px the index is approximately 94px tall. The local comparison pages remain review artifacts, not production dependencies.

## Selected lower collection hierarchy

The owner selected Guides lead from three local Explore further alternatives. Applied its larger guide heading and spacing, compact experiment summary, and question-only decision-tool entry to the homepage. Existing destination links and section IDs remain unchanged; no additional preview image is used. Updated the current homepage design reference with the feedback and reusable hierarchy principle.

Observed the applied page at 1280px: guide title 30.4px, supporting titles 18px. At 320px no horizontal overflow was observed. The Explore a decision index link reached `/#explore-decision`. `git diff --check` passed. No new unfamiliar-reader, screen-reader, or enlarged-text review was performed for this selection. Changes remain local.
