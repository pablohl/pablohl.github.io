# From experimental results to engineering decisions

The guide at `/toolbox/engineering/results-to-decisions/` applies the Decision-Complete lens to technical recommendations. It reuses the hiring guide's page shell, typography, example tabs, comparisons, disclosures, and discussion structure.

Two illustrative examples let readers vary one decision-relevant condition. The lower-cost model example adds evidence about total operating cost, including review. The parser example keeps the experimental result fixed while changing whether the rollout must include scans. Each branch explains the evidence, recommendation, and reason; the guide makes no claims about actual model or parser performance.

The native report disclosure contains all 25 checks from the supplied report checklist, grouped into six sections and retaining their explanations. Checkboxes are labeled and are not saved by the site. Private transcript details are not included in the guide.

Content lives in `data/engineering-tools.json`. The shared renderer accepts guide-specific labels with existing hiring defaults. `js/engineering-decisions.js` enhances the static branch content into radio-controlled outcomes; without JavaScript, both examples and all four outcomes remain readable. Native disclosures and checkboxes work without JavaScript. Example tabs retain keyboard navigation and direct fragment links.

Regenerate with `PYTHONDONTWRITEBYTECODE=1 python3 scripts/build_engineering_toolbox.py` or the full `scripts/build_toolbox.py` build. The builder updates the engineering index and sitemap.

Verification: desktop and 390px iframe layouts visually inspected; both example selectors and all four branches checked; keyboard tab selection and native radio controls checked; checklist expansion and selection verified. Static checks cover links, IDs, references, checklist count, fallback content, and repeatable generation. Hiring-guide text remains unchanged apart from generic renderer attributes and shared asset versions.
