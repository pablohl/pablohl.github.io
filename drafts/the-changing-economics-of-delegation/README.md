# The Changing Economics of Delegation — draft essay

An unpublished essay for senior engineers about the tradeoff between delivering with AI today and developing independent ownership over time.

The page carries a **Local draft** label and `noindex, nofollow` metadata. It is not linked from the homepage or Writing index and is absent from feeds and the sitemap. This repository contains static HTML rather than a draft publishing engine; promotion into `posts/` is a separate editorial step.

## Preview and edit

Serve the repository root so root-relative fonts, navigation, and shared styles resolve:

```sh
python3 -m http.server 8795 --bind 127.0.0.1
```

Open `http://127.0.0.1:8795/drafts/the-changing-economics-of-delegation/`.

- `index.html`: essay, hypothetical before/after AI comparison, three-outcome comparison, four scenarios, responsibility map, and model controls.
- `style.css`: page-specific composition using tokens and fonts from `/css/editorial.css`.
- `visuals.js`: attention model, scenario button selection, and essay section navigation.

The header, footer, fonts, mobile menu, palette, and reading scale reuse existing site assets. Page-specific CSS supports wider comparisons and responsive model controls without changing shared files. The stylesheet URL is versioned to prevent stale styles after edits.

## Examples and model

All numerical examples are illustrative, not observed hiring outcomes. The opening comparison counts only senior-engineer time: doing the task directly falls from 12 to 6 hours, while supporting delegation falls from 8 to 7 hours. Delegation changes from saving four hours to requiring one extra hour despite both options improving.

The interactive model counts the existing team's work avoided, onboarding, and supervision, measured against doing the delegated work directly with AI. It excludes the new hire's own working hours, compensation, recruiting, and learning benefits. The supervision decline is an assumption to explore, not a prediction of a person's development. Scenario buttons restore preset assumptions; sliders create a custom variation.

The responsibility map illustrates leading the reasoning within an agreed area of work, with support and escalation available. It does not imply that the senior engineer gives up accountability for the outcome.

## Validation

- Checked JavaScript syntax, local asset/link destinations, unique IDs, section fragments, draft metadata, and absence from public discovery files.
- Inspected shared fonts/palette, desktop at 1280px, and narrow layouts at 397px, 390px, and 320px during development. No horizontal overflow was observed in those inspected states. The final opening comparison was inspected at 397px.
- Checked all four presets, changed supervision decline, zero work avoided, keyboard activation, and shared mobile Menu/Escape/focus behavior. The permanent-startup preset returns 102.7 hours freed and week-18 payback.
- Editorial review considered student, working-engineer, and senior-engineer perspectives. These were perspectives from one reviewer, not independent reader studies.
- Unfamiliar-reader comprehension, physical devices, a screen-reader journey, and browser zoom remain untested.
