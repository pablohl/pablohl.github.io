# From experimental results to engineering decisions

The guide at `/toolbox/engineering/results-to-decisions/` applies the Decision-Complete lens to technical recommendations. It reuses the hiring guide's page shell, typography, example tabs, comparisons, disclosures, and discussion structure.

Two illustrative examples let readers vary one decision-relevant condition. The on-call story begins with interrupted nights and a proposal to raise the checkout timeout threshold. Replaying a real outage within the fictional scenario reveals why a lower page count does not justify that rule. The database-migration example keeps the rehearsal result fixed while changing whether historical records must move in the next step. Each branch explains the evidence, recommendation, and reason; the guide makes no claims about actual alerting or migration performance.

The native report disclosure contains all 25 checks from the supplied report checklist, grouped into six sections and retaining their explanations. Checkboxes are labeled and are not saved by the site. Private transcript details are not included in the guide.

Content lives in `data/engineering-tools.json`. The shared renderer accepts guide-specific labels with existing hiring defaults. `js/engineering-decisions.js` enhances the static branch content into radio-controlled outcomes; without JavaScript, both examples and all four outcomes remain readable. Native disclosures and checkboxes work without JavaScript. Example tabs retain keyboard navigation and direct fragment links.

Regenerate with `PYTHONDONTWRITEBYTECODE=1 python3 scripts/build_engineering_toolbox.py` or the full `scripts/build_toolbox.py` build. The builder updates the engineering index and sitemap.

Verification: desktop and 390px iframe layouts visually inspected; both example selectors and all four branches checked; keyboard tab selection and native radio controls checked; checklist expansion and selection verified. Static checks cover links, IDs, references, checklist count, fallback content, and repeatable generation. Hiring-guide text remains unchanged apart from generic renderer attributes and shared asset versions.

## Story and communication

The guide now moves from recognizable situations to a concrete question, an interactive change, and only then the reusable Observation → Interpretation → Decision framework. Comparison tables are optional disclosures rather than prerequisites for understanding the stories. The migration story follows a team from a successful rehearsal to a disagreement over the archive. The alert story distinguishes counting interruptions from checking whether customers’ problems would still trigger a response. All events and numbers are fictional. The original report checklist remains unchanged.
