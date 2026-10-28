# Interactive previews and first steps · local review

Reviewed October 28, 2026 in the local working copy on `codex/interactive-previews-local`, based on `6bf79ed`. These are local changes, not a published release. This record describes that revision and is not an instruction source or certification. Applicable standards: [reader journey](../reader-journey.md), [experiment guidelines](../../experiments/README.md), and [multi-perspective review](../multi-perspective-review.md).

## Intended discovery and affected paths

Before opening a piece, readers should be able to predict the activity. On arrival they should recognize a meaningful first step and see its consequence. The experiments retain their existing learning mechanisms: information versus available options, accuracy versus the wider model decision, and placement versus customers' and competitors' responses. Guides retain their existing evidence distinctions.

Scope: the two homepage experiment cards, all three Experiments index entries, the three experiment openings, and the two guides with controls. The architectural guide remains static; only its shared engineering stylesheet version changes on rebuild. Existing models, numerical assumptions, outcomes, and navigation destinations are preserved.

## Separate editorial perspectives

These assessments were made by one reviewer considering four perspectives, not independent reviewers or unfamiliar-reader sessions.

| Perspective / success criterion | Questions inspected | Finding and smallest revision |
| --- | --- | --- |
| Practitioner: predict a relevant activity | What decision is this about? What will I do? Does the destination fulfill that invitation? | The existing model and vendor descriptions are concrete, but Two Clocks still advertised building/testing/stopping instead of its job-offer story. Correct the invitation, name the activity, and preserve the useful existing controls. |
| Newer reader: identify a first step | What does Start enable? How does the initial model choice advance? Is dragging required? | Useful questions and controls already exist. Add a short opening cue where needed; name the actual rendered action, and make the vendor position slider visible in the instruction. Comprehension remains untested. |
| Information designer: connect invitation, action, and consequence | Are previews legible at their displayed size? Do instructions stay beside the relevant control? Is switching a story distinguishable from changing a premise? | Small abstract homepage diagrams and text-only index entries offer limited evidence of the activity. Add labeled native SVG previews and consistent invitation styling; explain scenario tabs separately from condition changes. |
| Subject expert: preserve the meaning of the experience | Do previews imply unobserved results? Are changes to conditions or reveal actions misrepresented as real tests? Are existing qualifications preserved? | Use the actual opening model accuracies and a conceptual time/choice diagram; keep models and evidence limits unchanged. Keep a static guide static and preserve the results guide's baseline and Changed indicators. |

Convergence: invitations and first steps should describe the same activity. Complementarity: legible previews reduce the need for repeated explanation on arrival. A browser-specific finding was that the model experiment replaces the HTML's initial Continue text with “Reveal the outcomes”; the new instruction and static button label were corrected to match that rendered action. Tension: add enough instruction to orient a new reader without duplicating the existing setup; keep cues short, and hide the Two Clocks opening hint after Start.

Rejected: adding autoplay, new controls, a simulation to the architectural guide, estimated completion times, or new model rules. Deferred: unfamiliar-reader comprehension testing and any redesign of later experiment stages.

## Verification and limits

- **Pass — existing checks:** nine Python guide checks and all 50 existing experiment model/journey tests. Syntax checks pass for touched interaction scripts. No new implementation-mirroring tests were added.
- **Pass — invitation and arrival inspection:** followed a homepage Two Clocks preview and Experiments index model link. Confirmed their opening activities and named actions; reviewed desktop index/homepage diagrams and the vendor entry's activity description.
- **Pass — Two Clocks first step/recovery:** Start enables the run and hides the opening hint; Pause stops it; declining reaches the ending; Start again restores the ready state and hint. This browser path did not wait for all timed conversations or exercise every timing scenario.
- **Pass — model journey:** initial Model A choice, error prediction, cost consequences, keyboard adjustment to the high-cost boundary, both human-review reveals, final current-evidence decision and takeaway, then reset. The final comparison truthfully retains Model A under the tested high-cost assumption. Reset requires a new initial choice.
- **Pass — vendor journey:** keyboard sliders for A and B, visible customer totals, demand change and reversal, final Not sure prediction/reveal, and reset. A movement that retained the same customer count and a later move that changed it were both observed. Pointer dragging was not newly tested.
- **Pass — guides:** a direct migration-scope fragment selects the intended story; condition changes update evidence/next step while preserving the baseline, and reversing the choice restores the alternative. A direct System design fragment selects that scenario; Home selects ML evaluation. New instructions appear with the enhanced controls.
- **Pass — reflow inspection:** actual 1280px desktop and 375px phone viewports; all seven affected page types fit without horizontal overflow at 375px. Phone preview widths are 285px on the homepage and 327px in the index. SVGs load and their labels remain visible.
- **Pass — static output inspection:** guide instruction hooks retain hidden attributes before enhancement; the existing complete examples/outcomes remain in static HTML. This is structural evidence, not a JavaScript-disabled browser journey.
- **Not checked:** unfamiliar-reader understanding, assistive-technology journey, enlarged browser zoom, reduced-motion journey, and a full pointer-drag journey. The preview diagrams introduce no animation. Desktop/mobile rendering and model tests do not establish these untested properties.

See the local working copy and its saved screenshots for the inspected revision. Rebuild instructions and source ownership remain in the [documentation index](../README.md#source-files-and-commands).
