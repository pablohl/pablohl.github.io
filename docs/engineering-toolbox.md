# Engineering guides

Current collection and implementation reference. For documentation roles, see [the index](README.md). Past design iterations and reported verification are retained in the [historical snapshot](history/engineering-toolbox-2026-10-27.md).

## Purpose and format

Show how Pablo reasons through engineering decisions by making the reasoning concrete. Readers should recognize a situation, understand the distinction, and decide whether it helps their own reasoning. Do not assume visitors will evaluate candidates or run an operational procedure on this website.

Use a recognizable problem → proposed distinction → examples or exploration → discussion pattern. An example needs a situation, a plausible initial interpretation, relevant evidence or conditions, and a bounded interpretation. The discussion should add a broader insight rather than repeat a completed example. Choose interactions only when they serve that purpose; a worksheet, score, or simulation is not the default.

Use the [full reader journey](reader-journey.md) to review the invitation, arrival, reading or action, contribution, recovery, and onward destination. A guide card must set expectations for its actual format. Static contexts, selectable stories, and changeable premises are distinct experiences; do not promise a simulation or require extra controls to make them uniform. A reader arriving at a guide or scenario fragment should have enough context without first reading its siblings.

The collection has three guides:

| Guide | Current format and intended distinction |
| --- | --- |
| [What Did the Interview Actually Tell You?](../toolbox/engineering/hiring-forecast/index.html) | Two selectable interview examples; distinguish observed evidence, conditional expectations about work, and remaining uncertainty |
| [What Does This Result Let Us Decide?](results-to-decisions.md) | Two selectable stories with reversible conditions; connect a result to what the next action requires |
| [This Works Here. What Changes Elsewhere?](system-selection-guide.md) | Three visible static contexts; interpret the same local result through dependencies and consequences |

Each guide states when it is relevant and what the reader will be able to do. The collection opens with “What does the evidence actually justify?” and presents situation-led questions, HTML/CSS previews, secondary formal guide titles, and format-specific invitations. Hiring previews distinguish observation, support, and untested transfer; technical-results previews show the illustrative alert-rule comparison; the system preview asks whether an update has saved before the next invoice needs it. These are linked previews, not live controls or additional test results. The architectural card explicitly describes three static contexts; the collection does not label every guide interactive.

The `collection` fields in `engineering-tools.json` own the card questions, situations, formats, and actions. The builder owns the corresponding preview compositions, and `engineering-collection.css` applies only to the collection page. Keep the alert counts in that preview and card consistent with the guide's illustrative baseline when revising its scenario.

[Toolbox navigation](toolbox-navigation.md) owns destinations and collection roles. [Reading comfort](reading-comfort-navigation.md) owns shared type, widths, comparison breakpoints, and header behavior; do not copy those mutable values into this reference.

## Collection design intention

The collection should feel like a small, deliberately chosen set of engineering questions worth examining. Before opening a guide, readers should be able to recognize the situation, see the distinction it explores, and anticipate whether they will compare responses, change a condition, or read through dependencies. The visual design should contribute to that understanding rather than simply decorate a directory.

The October 2026 feedback identified four design weaknesses: similar article cards hid the differences between guides; repeated orientation text competed for attention; the collection title named the section without expressing its shared idea; and generic links obscured the different reading and interaction formats. The [design-feedback record](history/engineering-collection-local-2026-10-31.md#design-feedback-and-how-it-was-used) explains the resulting choices and the recommendations that needed qualification. This was editorial feedback, followed by the owner's approval of the local appearance, not evidence from unfamiliar-reader testing.

### Current visual composition

- **Introduction:** a small collection label identifies the section, a larger serif question expresses its common idea, and one supporting paragraph introduces the experiences. The introduction stays compact so the guides appear soon afterward.
- **Card hierarchy:** a topic label and situation-led question establish relevance first. A short description explains the investigation. The formal guide title is secondary, followed by the format and a specific linked invitation. The collection avoids repeating the detail page's full “Use this when / You’ll be able to” structure.
- **Preview composition:** hiring uses successive labeled evidence statements; technical results uses a numerical comparison and an unanswered question; system consequences uses connected steps with saving still in question. These different structures express different reasoning, within one shared card frame.
- **Color:** quiet blue, ochre, and green surfaces distinguish the compositions while retaining the site's cream, green, and dark-text palette. They identify topics, not good/bad outcomes, candidate ratings, or a sequence to complete. Text and structure carry the distinction independently of color.
- **Typography and spacing:** serif questions provide editorial emphasis; sans-serif descriptions, labels, and actions support scanning. Reuse shared type and color tokens. Preview text stays readable at its displayed size, with space around each comparison or step rather than a miniature of the whole guide.
- **Layout and affordance:** previews sit beside the invitation on wider screens and above it on narrow screens. A card is one link with visible focus and an underlined action, rather than a collection of nested or pretend controls. Its accessible name identifies the question and its description names the format. The current previews are hidden from assistive technology because the invitation supplies the necessary meaning; revisit that choice if future previews add information needed to choose a guide.

### Reusable design guidelines

These are principles for future guide invitations, not requirements to copy the current three illustrations or colors.

| Design note | How to apply it | Review question |
| --- | --- | --- |
| Show the distinction before the destination | Extract one meaningful contrast, dependency, or uncertainty from the guide and give it a legible visual form. | What does the preview help someone notice beyond the title alone? |
| Vary the composition, preserve the family | Choose a structure that fits the reasoning; keep the shared frame, type roles, spacing rhythm, and link treatment. | Do the guides feel related while remaining easy to tell apart? |
| Give every text layer a job | Lead with the recognizable question; use supporting copy for context, the formal title for continuity, and the action for what comes next. Remove layers that only repeat another. | Can someone scan the situation and action without reading a learning-objective paragraph? |
| Let the introduction express the collection's idea | Use a concise editorial question with the collection name as orientation. Judge its size and spacing against how soon the first guide becomes visible. | Does the introduction help readers choose, or delay their encounter with the guides? |
| Make uncertainty part of the graphic | Label proposed results, unknown orderings, and untested capabilities in the preview itself. Use questions or qualified wording where the guide is conditional. | Could the composition imply a measured improvement, guaranteed capability, or established sequence that the guide does not show? |
| Match visual affordance to actual behavior | Use a specific invitation and a truthful format description. An illustrated control should not appear independently operable when the whole card only opens a guide. | Does the destination deliver the activity the card appears to offer? |
| Use restraint to support attention | Add a visual because it explains a relationship, not to fill space. Avoid introducing motion, decoration, or discovery controls without a demonstrated need. | What becomes harder to understand if this element is removed? |
| Design at reading size, including narrow screens | Check labels, number comparisons, wrapping, reading order, and focus in the actual rendered card. Keep the invitation meaningful when the preview is unavailable. | Can the relationship still be understood without tiny text, color alone, hover, or a wide screen? |

### Repeatable design pass

1. Write a short brief: the reader's situation, the guide's central distinction, its actual format, and the bounded promise the card can make.
2. Sketch the smallest preview that exposes that distinction. Choose its structure before selecting topic colors. Check its facts and qualifications against the guide.
3. Draft the question, context, formal title, format, and action as separate layers. Read them together and remove repetition. Do not create a new conceptual sequence unless the collection actually needs one.
4. Apply the shared visual language and inspect the card alongside its siblings. Use the owning source files above; collection-specific styling should not unexpectedly change detail pages.
5. Inspect the rendered hierarchy and preview legibility on wider and narrow screens, including keyboard focus and enlarged text/zoom. Follow each invitation to confirm the promised experience and a predictable return. The [reader-journey guideline](reader-journey.md) owns the broader transition criteria.
6. Record the feedback, design response, rejected alternatives, and observed checks separately from assumptions about reader understanding. Use the [multi-perspective review](multi-perspective-review.md) for substantive revisions. An attractive screenshot, an owner's approval, and comprehension evidence answer different questions.

## Hiring guide

The opening separates observation from prediction. The distinction panel introduces Evidence → Expectation → Uncertainty with three questions. The ML evaluation and System design examples use different contrast labels because they test different evidence gaps; consistency does not require identical conclusions.

- ML evaluation compares naming a leakage risk with acting on it. Recommending release without resolving an identified risk is observed behavior in that answer; response to guidance remains unknown. A retest must use information available at payment time, not merely later transactions.
- System design separates an untested reliability capability from an observed reasoning difficulty. Unfamiliarity with a particular queue product does not itself establish inability to reason about repeated deliveries and recovery.
- Optional native disclosures contain explicitly labeled sample wording for the hiring discussion, matching each compared case. Prompting, role expectations, support, and follow-up questions remain contextual.
- Closing lessons stand without reading both scenarios. Reusable wording accommodates an expectation or concern, with a separate variant for a capability that was not tested. Related decision tools explain the broader reasoning.

The selector defaults to ML evaluation unless a valid scenario fragment selects another panel. Enhancement supports arrow keys, Home/End, roving tab focus, and fragment links. Without JavaScript both complete examples remain readable. The fictional scenarios support contextual claims, not hire/no-hire verdicts or a validated hiring instrument.

The enhanced selector has a visible “Choose an interview scenario” instruction describing the comparison. The instruction stays hidden with the selector when enhancement is unavailable, so the complete static examples do not promise absent controls.

Blue and ochre identify the two cases across table headers, narrow-screen cards, prose references, and sample statements. Labels carry the meaning independently of color; the accents do not rate candidates.

## Sources and review

[engineering-tools.json](../data/engineering-tools.json) owns scenarios, comparisons, discussion wording, and orientation fields. Edit those fields rather than the generated pages. `discussionCases` supports a matched statement and follow-up for each contrast; `boundedConclusion` and `followup` also support a single discussion statement. `discussionTemplate` and `insufficientEvidenceTemplate` own reusable wording. See the [source map and rebuild commands](README.md#source-files-and-commands).

For substantive changes, apply [multi-perspective review](multi-perspective-review.md). For controls and comparisons, also apply the relevant [experiment guidance](../experiments/README.md), identifying inapplicable simulation requirements explicitly. Past editorial and browser checks in the history are not a fresh review or proof of comprehension.
