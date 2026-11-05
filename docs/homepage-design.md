# Homepage design

Current reference for the homepage's editorial hierarchy and reader invitations. [Reading comfort](reading-comfort-navigation.md) owns shared visual tokens and navigation; [Toolbox navigation](toolbox-navigation.md) owns collection destinations. The [reader journey](reader-journey.md) owns transition review criteria.

## Intention

Introduce a way of thinking as well as a professional background. The homepage is an invitation into the work: a concrete question near the top, selected writing, and coherent ways to continue. A single compact visual can demonstrate the reasoning; detailed model inputs, cost analysis, and controls belong in the experiment itself. Professional context supports the experience without dominating it.

## Current composition

1. **Introduction:** name and CTO role as a supporting label; “A good result is not always a good decision” as the main serif headline; one paragraph connecting AI work with evidence, constraints, and decisions.
2. **Featured invitation:** “Similar scores. Different mistakes.” introduces The Metric Can Be Right beside one paired-bar visual and a direct link. The two groups show fraud missed and valid payments blocked for Models A and B, with a shared zero-to-80 scale and a caption identifying the illustrative 10,000-payment set. A compact horizontal treatment separates it from the hero without a large filled box. There are no costs, comparison table, choice controls, or homepage state.
3. **Reader index:** three compact columns retain Read an idea / Explore a decision / Borrow a question as links, with only Essays / Examples / Tools as supporting labels. They open selected writing, the shared exploration list, and the Decision tools collection respectively. The index keeps three columns on narrow screens with wrapping labels, and uses no section-sized descriptions or repeated action links. These are navigation alternatives, not a content section or required sequence.
4. **Selected writing:** The Executive Summary Is Not a Summary receives the primary essay treatment, with Kirk/Spock and What Is Worth Learning? as smaller recommendations. This shows range beyond the metric experiment. The essay headline stays quieter than the hero; navigation headings use sans-serif text.
5. **Explore further:** Engineering guides, the Two Clocks experiment, and the Preserve the Option question appear as three rows in one section. Engineering Guides leads with a larger title and more space. Two Clocks follows as a compact title, short context sentence, and links; the decision tool uses its canonical question and links without an additional description. All retain the same category rail and grid. Subtle rules separate them. Category labels stack above content on narrow screens. There are no competing colored panels, oversized interface thumbnails, or separate detached Toolbox feature.
6. **Playground:** a supporting section links to the food game and the Playground collection. It presents small games and creative projects separately from the decision-focused experiments, using the existing editorial row treatment.
7. **Professional context:** one supporting About paragraph and link replace the original three-column “What I work on” summary. Social/contact links remain here; primary navigation remains at the top.

## Feedback used and design response

The original editorial review requested stronger intellectual identity, one prominent experiment, visitor-action paths, and less résumé-like repetition. A new visual-preview family was outside that initial scope. The first local version showed model figures and repeated the metric theme in its dominant essay. Follow-up feedback led to a brief homepage interaction, a different featured essay, a concrete Toolbox question, and quieter typography.

The owner then supplied screenshots and clarified the layout priority: the experiment was too large and detailed; the Engineering Guides and experiment panels competed; the Toolbox appeared detached. That more recent direction determines the current design:

| Feedback | Current response |
| --- | --- |
| Too much detail and too much space for the featured experiment. | Replace the embedded comparison with a compact question, context sentence, and destination link. Remove the homepage controls, model figures, result table, and their now-unnecessary caveat. The full experiment is unchanged. |
| Guides and experiments look like competing boxes. | Use a shared editorial row layout with a common category rail and action treatment, then vary title size and spacing selectively to establish hierarchy. Remove the colored guide panel and large Two Clocks preview from the homepage. |
| The Toolbox does not feel integrated. | Place its actual question in the same list and grid, preserving both the specific-tool link and the collection route. |
| Too many headlines and labels compete for prominence. | Reserve the largest serif type for the hero, keep the featured essay smaller, and give the remaining routes and categories quieter supporting roles. |

After the text-only simplification, the owner asked to compare three compact visual objects. Error tiles, paired bars, and an error-type toggle were built as local variants; the owner selected paired bars. This adds one meaningful object without restoring the large model-choice interface. A solid green bar identifies Model A; a patterned blue bar identifies Model B across both error groups. Direct model labels and numerical counts carry the distinction without color.

The earlier choice/reveal prototype was removed, including its homepage-only script and styles. Its prior checks in the [local review record](history/homepage-editorial-local-2026-11-01.md) describe that discarded version, not current homepage behavior.

The owner subsequently compared three navigation treatments and selected the compact three-column index. This preserves the intention-led routes while reducing repetition with the curated content below.

The owner then found the three equal-weight Explore further entries too mechanical. Three local layouts compared a small experiment visual, a guide-led hierarchy, and a question alongside a collection list. The selected **Guides lead** layout gives Engineering Guides the strongest title and more breathing room, while Two Clocks and Decision Tools become compact supporting entries. This keeps a shared structure without giving every entry identical visual weight or adding another illustration.

## Reusable design notes

- **Distinguish invitation from destination.** A homepage feature should communicate why to open a piece without reproducing its full interface. Use one meaningful object when it helps show the question; do not rebuild the experiment’s interface or spread decorative previews across the page.
- **Group related offerings before styling them separately.** When guides, experiments, and tools are parallel routes, give them a common layout grammar. Different content does not require different box treatments.
- **Integrate through alignment and rhythm.** Shared category positions, text widths, type sizes, row spacing, and separators make the relationship visible. Matching panel heights or adding more imagery is not the only way to balance a page.
- **Vary emphasis within a shared structure.** A common grid need not give every entry the same type size, length, or spacing. Feature one route and shorten supporting entries when equal treatments feel mechanical; do not add cards or imagery merely to create variety.
- **Use visual emphasis selectively.** More content should not create another major feature by default. Preserve one hero and a clear writing hierarchy; give supporting routes enough presence without competing for attention.
- **Keep the invitation truthful.** The featured link opens an interactive experiment; the guide link opens a collection with several formats; the Toolbox question opens its named tool. Static homepage content must not resemble selectable controls or imply a carried choice.
- **Preserve meaningful detail at the right level.** Keep the canonical Toolbox question and concise activity descriptions. The small error comparison is enough to expose the trade-off. Keep cost assumptions and controls at the destination. Label the visual’s population, illustrative status, and consistent scale; never imply that error-only bars show all transactions or that the models have identical accuracy.
- **Review actual composition.** Inspect the feature and the complete lower group together, at desktop and narrow widths. Check wrapping, keyboard focus, anchor arrival, and destinations. Screenshot approval, functional navigation, and reader comprehension are distinct evidence.

## Sources and maintenance

The homepage is directly maintained in [index.html](../index.html); [home.css](../css/home.css) owns its layout. Update the homepage stylesheet reference when that stylesheet changes. Shared shells and experiment code retain their existing owners. No homepage-specific interaction script is needed for this design.

Keep the featured question and bar counts/widths aligned with the [metric experiment](../experiments/the-metric-can-be-right/index.html) and its [model](../experiments/the-metric-can-be-right/model.mjs). The scale is the largest of the four error counts; update all bars together when the model changes. Keep the Toolbox question aligned with its canonical entry in [toolbox.json](../data/toolbox.json). Existing collection routes and the homepage's `selected-writing` and `explore-decision` fragments remain stable.

This describes the intended/current local design, not evidence of reader comprehension. Revision-specific assessments, inspections, and untested items belong in [history](history/README.md).
