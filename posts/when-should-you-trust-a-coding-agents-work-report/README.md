# When should you trust a coding agent’s work report?

Research in Practice essay prepared for publication on November 22, 2026. The reviewed local draft is now integrated into the Writing collection, both feeds, sitemap, related-reading graph, adjacent-post navigation, and social-preview manifest. These changes are proposed in a pull request; no live publication is claimed.

## Sources and maintenance

- `index.html` owns the article, authored evidence records, and embedded skill source.
- `style.css` owns article-specific evidence and skill panels; the prior Research in Practice article’s stylesheet supplies the consistent essay typography and controls. No shared styles were changed.
- `app.js` owns the evidence selector and skill-copy enhancement. All evidence cases remain readable without JavaScript; native skill disclosure and download remain available.
- `verify-work-report/SKILL.md` is the author-supplied skill with its optional-reference section removed for this standalone download. Its text must match the escaped `skill-source-text` element when edited.
- The paper is Yang et al., [Characterizing and Detecting Unfaithful Work Reports by Coding Agents](https://arxiv.org/html/2611.25760). Reported sample proportions and detector scores are distinct measurements. Constructed records are explanatory examples, not study data. Skill use is the author’s statement; effectiveness remains unmeasured.
- The social preview uses the existing author-photo layout; its manifest entry is in `data/post-social-images.json`. The Writing thumbnail is a crop of that existing photo.

Reading estimate: 1740 words across article text, all evidence alternatives, controls, and navigation, excluding the optional full skill text; rounded up at 200 words/minute to 9 minutes. This is an estimate, not observed reading time.

The [editorial review](../../docs/history/work-report-post-review-2026-11-22.txt) records local draft review before integration. Browser checks do not establish comprehension or skill effectiveness. Publication-branch verification is recorded below when complete.

## Publication branch verification — November 22, 2026

Fresh checks on the integrated branch covered Writing → Research filter → new article, keyboard switching through all evidence records and back, skill disclosure and exact copy-handler payload (clipboard double), local article links and stylesheet/script assets, related reading and the previous essay’s incoming recommendation. The social author preview was inspected at 1200 × 630. At initial publication, the supplied skill matched both embedded and downloaded text exactly; see the standalone-download revision below. Article draft/noindex markers are removed; canonical, publication date, feed entries and sitemap use the public route.

The nine existing Python tests, social-preview and related-reading freshness checks, article JavaScript syntax, XML parsing, identity/signing hook, and whitespace check passed. Reflow passed at 390/320px; 200% text on 390px passed after making the new post’s adjacent navigation wrap. No page errors were observed. No shared stylesheet change was needed.

The earlier local review’s no-JavaScript and clipboard-fallback checks are historical evidence, not fresh checks on this branch. Reader comprehension, full screen-reader behavior, real OS clipboard access, detector/skill effectiveness, production publication and social-platform rendering were not tested. This branch is prepared for PR review, not proof of live deployment.

## Standalone skill download — November 22, 2026

At the author’s request, removed the optional-reference section from both the displayed skill and downloadable SKILL.md, and removed the article’s note about unavailable reference files. The remaining instructions are unchanged. Embedded text and the download were compared for exact equality; article JavaScript and whitespace checks passed. This supersedes the initial verbatim-source statements for the skill.

## Wording and explanatory diagrams — November 22, 2026

Added context before the executive-summary argument; clarified what a passing build fails to establish; named the coding agent explicitly; connected report accuracy to task success with concrete contrasts; replaced the abstract sample-percentage takeaway. Added an explanatory schematic of the paper’s startup case and a check → record → conclusion diagram in each constructed evidence state. The startup schematic separates the user’s restart from later diagnostic inspection. These diagrams are explanatory, not measured performance or reproduced execution traces. Raw records remain available through native disclosures. The skill text is unchanged.

Fresh inspection covered desktop and mobile diagram layout, all three selected record diagrams, and 200% text at 390px with no horizontal page overflow. Whitespace, JavaScript syntax and existing related/social freshness checks passed. No reader-comprehension or skill-effectiveness evidence was collected.

## Detector-section edit — November 22, 2026

Shortened the main detector discussion to its definition, matched comparison, scores, and practical limit. Removed the lockfile false-alarm example and repeated evaluation explanation; optional method details and the skill’s caution against unnecessary checking remain. This supersedes the earlier rationale for retaining that example. Article structure, interactions, and skill source are unchanged.

## Implementation comparison — November 22, 2026

Added a short comparison between the authors’ runner-based audit of saved records and the reusable review skill, with a direct link to their published detector implementation. Based on inspection of the replication package; no detector run or equivalence claim.

## Author-practice treatment — November 22, 2026

Section 5 is labeled “My practice” and uses a pale green background with a green left border to distinguish the author’s adaptation from reported research. Existing heading/prose typography and the skill panel remain. Navigation uses the same label. Article-specific styling only; shared assets and skill text are unchanged.

Inspected the new panel at 1280px and 390px, with reflow checks at 320px and 200% text at 390px. Long words wrap within the narrower panel. No horizontal page overflow in the final enlarged-text check; whitespace check passes.
