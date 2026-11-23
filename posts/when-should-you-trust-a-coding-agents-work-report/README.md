# When should you trust a coding agent’s work report?

Research in Practice essay prepared for publication on November 22, 2026. The reviewed local draft is now integrated into the Writing collection, both feeds, sitemap, related-reading graph, adjacent-post navigation, and social-preview manifest. These changes are proposed in a pull request; no live publication is claimed.

## Sources and maintenance

- `index.html` owns the article, authored evidence records, and embedded skill source.
- `style.css` owns article-specific evidence and skill panels; the prior Research in Practice article’s stylesheet supplies the consistent essay typography and controls. No shared styles were changed.
- `app.js` owns the evidence selector and skill-copy enhancement. All evidence cases remain readable without JavaScript; native skill disclosure and download remain available.
- `verify-work-report/SKILL.md` is the author-supplied skill, preserved verbatim. Its text must match the escaped `skill-source-text` element when edited. The two optional reference files were not supplied; their absence is disclosed in the article.
- The paper is Yang et al., [Characterizing and Detecting Unfaithful Work Reports by Coding Agents](https://arxiv.org/html/2611.25760). Reported sample proportions and detector scores are distinct measurements. Constructed records are explanatory examples, not study data. Skill use is the author’s statement; effectiveness remains unmeasured.
- The social preview uses the existing author-photo layout; its manifest entry is in `data/post-social-images.json`. The Writing thumbnail is a crop of that existing photo.

Reading estimate: 1510 words across article text, all evidence alternatives, controls, and navigation, excluding the optional full skill text; rounded up at 200 words/minute to 8 minutes. This is an estimate, not observed reading time.

The [editorial review](../../docs/history/work-report-post-review-2026-11-22.txt) records local draft review before integration. Browser checks do not establish comprehension or skill effectiveness. Publication-branch verification is recorded below when complete.

## Publication branch verification — November 22, 2026

Fresh checks on the integrated branch covered Writing → Research filter → new article, keyboard switching through all evidence records and back, skill disclosure and exact copy-handler payload (clipboard double), local article links and stylesheet/script assets, related reading and the previous essay’s incoming recommendation. The social author preview was inspected at 1200 × 630. The supplied skill still matches both embedded and downloaded text exactly. Article draft/noindex markers are removed; canonical, publication date, feed entries and sitemap use the public route.

The nine existing Python tests, social-preview and related-reading freshness checks, article JavaScript syntax, XML parsing, identity/signing hook, and whitespace check passed. Reflow passed at 390/320px; 200% text on 390px passed after making the new post’s adjacent navigation wrap. No page errors were observed. No shared stylesheet change was needed.

The earlier local review’s no-JavaScript and clipboard-fallback checks are historical evidence, not fresh checks on this branch. Reader comprehension, full screen-reader behavior, real OS clipboard access, detector/skill effectiveness, production publication and social-platform rendering were not tested. This branch is prepared for PR review, not proof of live deployment.
