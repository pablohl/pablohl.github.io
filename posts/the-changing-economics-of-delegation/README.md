# When It’s Faster to Do It Myself — essay

A personal essay for senior engineers about how AI changes the time saved by delegation. The essay lives at `/posts/the-changing-economics-of-delegation/`.

The page is included in Writing, both RSS feeds, and the sitemap. It has publication metadata and a canonical URL. The pull request remains a draft until it is ready to merge.

## Preview and edit

Serve the repository root so root-relative fonts, navigation, and shared styles resolve:

```sh
python3 -m http.server 8795 --bind 127.0.0.1
```

Open `http://127.0.0.1:8795/posts/the-changing-economics-of-delegation/`.

- `index.html`: essay, hypothetical before/after AI bar comparison, four scenarios, responsibility map, and model controls.
- `style.css`: page-specific composition using tokens and fonts from `/css/editorial.css`.
- `visuals.js`: attention model, scenario button selection, and essay section navigation.

The header, footer, fonts, mobile menu, palette, and reading scale reuse existing site assets. Page-specific CSS supports wider comparisons and responsive model controls without changing shared files. The stylesheet URL is versioned to prevent stale styles after edits.

## Examples and model

All numerical examples are illustrative, not observed hiring outcomes. The opening comparison counts only senior-engineer time: doing the task directly falls from 12 to 6 hours, while supporting delegation falls from 8 to 7 hours. Delegation changes from saving four hours to requiring one extra hour despite both options improving.

The interactive model sits in an optional section after the essay’s conclusion, expanded by default. It counts the existing team's work avoided, onboarding, and supervision, measured against doing the delegated work directly with AI. It excludes the new hire's own working hours, compensation, recruiting, and learning benefits. The supervision decline is an assumption to explore, not a prediction of a person's development. Scenario buttons restore preset assumptions; sliders create a custom variation.

The four imagined settings are shortened and specify how assignments, support, and decision-making opportunities differ. They are not evidence that company size causes independence. A real mentoring exchange, paraphrased from the author’s local transcripts, shows evidence brought by the intern and questions the author still supplied; it does not claim a measured before/after progression.

The responsibility map illustrates leading the reasoning within an agreed area of work, with support and escalation available. It does not imply that the senior engineer gives up accountability for the outcome.

## Validation before the editorial revision

- Checked JavaScript syntax, local asset/link destinations, unique IDs, section fragments, draft metadata, and absence from public discovery files.
- Inspected shared fonts/palette, desktop at 1280px, and narrow layouts at 397px, 390px, and 320px during development. No horizontal overflow was observed in those inspected states. The final opening comparison was inspected at 397px.
- Checked all four presets, changed supervision decline, zero work avoided, keyboard activation, and shared mobile Menu/Escape/focus behavior. The permanent-startup preset returns 102.7 hours freed and week-18 payback.
- Earlier editorial review considered student, working-engineer, and senior-engineer perspectives. These were perspectives from one reviewer, not independent reader studies.
- Unfamiliar-reader comprehension, physical devices, a screen-reader journey, and browser zoom remain untested.

## Editorial revision verification

- Checked section targets, unique IDs, and whitespace errors after the rewrite; JavaScript syntax still passes.
- Inspected the revised ending and optional-model invitation in the browser, and the opening at 390px. No horizontal overflow was observed; scenario columns compute as a single column at 390px.
- Opened and closed the optional model and selected the permanent-startup preset: 102.7 hours freed, with the first offset in week 18.
- The real exchange is paraphrased, with names and internal model identifiers omitted. It supports a description of the discussion, not a claim of measured development over time.
- These checks do not establish unfamiliar-reader comprehension or screen-reader access.

## Reading time

The essay and its static comparisons contain approximately 1,180 words before the optional model. The displayed estimate is six minutes at 200 words per minute; time spent exploring the model is additional. The same estimate appears in Writing and the article header.

## Writing thumbnail

`/img/posts/thumbnails/the-changing-economics-of-delegation.webp` is a 256 × 144 WebP displayed at 128 × 72 using the existing Writing card treatment. Generated with the built-in image tool: two people’s hands over a cream sheet with a pencil-drawn plan, one drawing and the other reviewing; soft warm side light, muted olive green, no legible text. The decorative image uses empty alt text because the linked title and summary carry the article’s meaning.

## Related reading and response controls

Related reading is owned by `data/related-reading.json` and rendered using `scripts/build_related_reading.py`. The email reply uses this essay’s title and canonical URL. Copy link and native Share reuse `/js/post-actions.js`; Share is shown only where the browser supports it.

## Opening figure

The opening comparison uses paired horizontal bars on matching 0–12 hour scales, direct values, and net outcomes (four hours saved before AI; one extra hour with AI). It counts only senior-engineer time. The old table and three-outcome figure are removed. Solid and hatched bars distinguish direct work and support without depending on color.
