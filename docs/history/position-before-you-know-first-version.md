# Position Before You Know first version

Local prototype review on October 28, 2026, branch codex/position-before-you-know. This records the first implementation, not a certification of future revisions. No publication or unfamiliar-reader study was performed.

## Separate editorial perspectives

These are four perspectives considered by one reviewer, not independent reviewers or a user study.

| Perspective | Success criterion and questions | Findings and smallest change | Limits |
| --- | --- | --- | --- |
| Practitioner | Does this show preparation across different next states? Does a forward position help in one continuation and hurt in another? Can the comparison inform reasoning without an overall score? | Both trade-offs are exposed by travel distance under one speed/window. Keep probabilities and an overall best-position score out. | No evidence that readers transfer the insight to real decisions. |
| Newer reader | Can someone begin without football knowledge? Are Y, T, D, A, and C explained? Is the first action clear? | Instructions name dragging and the sliders; text key explains player identities and destination shapes. Added short A/C descriptions and top-to-bottom slider direction. | Comprehension by a reader unfamiliar with football remains not checked. |
| Subject matter | Are geometry and movement assumptions explicit? Does arrival claim too much? Does replay isolate position? | The model exposes direct travel and fixed destinations; arrival is only opportunity to help. No claim about scoring, defending successfully, optimal tactics, or likely continuations. Solid route now stops at the reachable endpoint, with dotted remaining distance. | No football expert validation; illustrative geometry is not match data. |
| Interaction design | Can the reader compare states? Recover? Operate without dragging? Can the model, action, and result stay readable on small screens? | Previous/current arrival margins, paths, and numeric delta persist. Restore and reset have distinct behavior. Native sliders work with keyboard. Intro compacts after first test; mobile identity labels remain outside the small pitch. | Mobile stacks pitch, controls, and results; seeing all simultaneously is not possible. No screen-reader or physical-device user study. |

## Synthesis

Shared strength: one consequential action changes a visible, deterministic arrival comparison. Complementary concerns about graphic readability and model honesty led to reachable endpoints, dotted shortfalls, and an external identity key. A tension between football realism and a small model is resolved by disclosing fixed paths and avoiding success claims. Deferred: commitment timing, additional scenes, opponent adaptation, random sampling, scoring, and a homepage feature card. The Experiments index and essay supply direct invitations without displacing existing homepage entries.

## Verification record

| Check | Status | Evidence |
| --- | --- | --- |
| Model invariants and edge cases | Pass | Six Node tests: opposite trade-offs, common speed/window, arrival boundary before rounding, deterministic replay/immutability, bounds/invalid input/zero travel, unchanged margin. |
| Existing repository Python checks | Pass | Nine existing tests passed. |
| Entry paths | Pass | Browser followed new Experiments listing link and contextual essay link; direct arrival was also inspected. Collection return works. |
| Position and replay | Pass | Pointer drag changed coordinates. Same-continuation replay preserved conditions and showed previous/current margins. |
| Boundary and unchanged results | Pass | (52,20) toward A reports exactly on time. (60,18) and (60,22) report unchanged arrival margin. |
| Restore, switch, reset | Pass | Restore returned across-position 18; switching continuation preserved (60,18); reset returned (60,26), cleared paths and comparisons, and focused the first slider. |
| Ending | Pass | Testing both continuations from the same coordinates revealed the comparison, bounded takeaway, and essay link. |
| Desktop rendering | Pass | Inspected 1440×1000 opening and 1366×900 comparison. No horizontal overflow. |
| Narrow rendering | Pass | Inspected 390×844 full comparison. Controls and text reflow without horizontal overflow; visible buttons/sliders have 44px height. |
| Keyboard positioning | Pass | Home and ArrowRight changed native forward slider from its minimum 25 to 26. Reset focus verified. |
| Enlarged text | Pass | Browser root font enlarged to 200%; no horizontal overflow; turnover action and result remained usable. This is text enlargement, not a full browser zoom/assistive-technology audit. |
| Reduced motion | Pass | Browser reduced-motion emulation produced zero route animations; results and ending remained available. |
| Contrast pairs | Pass | Calculated WCAG ratios for body and secondary text, player and defender labels exceed 4.5:1; target shapes and previous routes exceed 3:1 against their actual backgrounds. |
| Independent screen-reader and physical touch testing | Not checked | Browser inspection and native controls are not substitutes. |
| Unfamiliar-reader understanding | Not checked | User can now try the prototype without coaching; no comprehension observations have been collected. |

Screenshots inspected locally: position-opening.png, position-mobile.png, and position-desktop.png in the parent workspace. These are local review evidence, not website assets.

## October 29 player identification refinement

Replaced player letters with person silhouettes and direct You, Teammate, and Opponent labels. Replaced A/C destination codes with Receive pass and Cover the break throughout the interface. The arrival marker also uses a person silhouette. Updated the preview and its alternative text. Desktop (1366×900) and narrow (390×844) opening screenshots were inspected; no horizontal overflow. Browser checks confirmed both continuation buttons, pointer dragging of the person, keyboard positioning, and the arrival icon. JavaScript syntax check passed. This is a visual and labeling revision, with no model rule changes; unfamiliar-reader comprehension remains not checked.

## October 29 consequence polish

User feedback: the prior result required reading and mentally connecting the late arrival with distance on the pitch. Added a teal/reachable, amber/shortfall, slate/boundary outcome role map separate from team identity. Destination halos/status symbols and a warm shortfall band connect the gap to the result; cross-continuation chips expose the trade-off. Pointer, model, and replay rules are unchanged. Browser inspection passed for reachable and late desktop states, 390px narrow layout with no horizontal overflow, exact-boundary feedback, draft-position clearing, and reset. Reduced-motion mode retained all static cues. Text/icon contrast pairs against actual surfaces exceed 4.5:1. Syntax check passed. Unfamiliar-reader understanding of the new cues remains Not checked.
