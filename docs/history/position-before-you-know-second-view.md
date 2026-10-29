# Position Before You Know second view review

October 29, 2026. Local implementation on codex/position-before-you-know. Current design: experiments/position-before-you-know/run-brief.md. No publication performed.

## Editorial perspectives

One reviewer considered these perspectives separately; they are not independent reviewers or a reader study.

| Perspective | Success criterion and questions | Finding and recommendation | Limits |
| --- | --- | --- | --- |
| Practitioner | Does the second view add commitment rather than repeat positioning? Can an early or late action have different costs? | Holding the initial position shrinks reach; a run moves that region and can lose the other post. Timing changes arrival with the cross fixed. Keep it distinct from a real-time reaction task. | Transfer to practical decisions not tested. |
| New reader | Are the controlled person, two destinations and first actions clear without view 1? What does shading mean? | Direct You/Near/Far labels, step rules, clock and availability chips provide orientation. Separate ball flight from reachable area; the key explicitly distinguishes them. | Unfamiliar-reader comprehension not checked. |
| Subject matter | Do model rules support the conclusion? Does a replay hide hindsight or imply a goal? | Fixed speed/window and exact point distances expose the mechanism. The 2-second commit reaches the point at deadline; 3-second commit falls short. An early run the other way can miss despite redirection. Disclose curated cues and replay hindsight. | Not a validated football model; no empirical probabilities or goal outcomes. |
| Interaction design | Are actions consequential? Are state and baseline preserved? Does recovery distinguish scenarios? | Run and advance each execute a model second. Previous completed paths/results persist during same-cross replay; alternate cross clearly changes baseline. Hash navigation preserves separate state. | Physical touch and screen-reader user tests not performed. |

Convergence: persistent reach and timing evidence is more useful than another text reveal. Complementarity: direct labels plus explicit step costs resolve the subject and interaction questions together. Tension: realism versus comprehensible causality is resolved with straight-line rules and disclosed limits. Deferred: real-time play, probabilistic clues, opponents and scoring. The first view's interaction rules were retained.

## Observed verification

| Check | Status | Evidence |
| --- | --- | --- |
| Model tests | Pass | 11 tests across both model suites; original six remain passing. New cases cover shrinking reach, exact timing boundary, early choice trade-off, redirection, alternate cross, determinism and immutability. |
| JavaScript syntax and diff whitespace | Pass | run-view.mjs syntax and git diff --check passed. |
| Direct second-view arrival | Pass | #run selects the cross and supplies its own setup. |
| Timing comparison | Pass | Starting near-post run at 2 seconds reached the cross; at 3 seconds it ended 10 units short; same-cross prior/current labels distinguished the choices. |
| Early wrong-direction run | Pass | Far-post commitment followed by redirection missed the near cross by 4 units; near destination became out of reach. |
| Alternate cross | Pass | Switching reset time/movement and labeled the prior near cross separately; the far cross reached on a 2-second commitment. |
| First view and preservation | Pass | First-view play still worked; forward slider value 35 and its result persisted across view switches and browser Back. Second view retained its completed 4-second state. |
| Keyboard and disabled state | Pass | Enter on native advance button moved from preparation to directional cue. All three model action buttons disabled at arrival with a nearby explanation; replay remained available. |
| Desktop and narrow | Pass | Opening and late states inspected at 1366px width; 390px opening and result inspected with no horizontal overflow. |
| Enlarged text | Pass | 200% root text size at 1366px produced no horizontal overflow. This is text enlargement, not a full browser zoom audit. |
| Reduced motion | Pass | Step-based interface has zero animations; all state evidence persists. |
| Unfamiliar-reader comprehension | Not checked | No reader observations collected. |
| Screen reader and physical touch | Not checked | Native controls and editorial inspection do not establish these journeys. |

## Follow-up review fixes October 29

Implemented the four findings from the subsequent multi-perspective review: causal action histories, hidden stale draft comparisons, mobile action/model adjacency, and explicit retry/alternate labels. Model rules and both views were retained. The action-history presentation has two regression tests; all 13 model/history tests pass.

Observed browser checks: a far run at 0s redirected near at 2s is now stated in both result and replay comparison, distinct from waiting centrally until 3s. Alternate labels change from Switch to a far-post cross to Switch to a near-post cross. View 1 hides its comparison and clears the delta while coordinates differ from the last tested position; testing restores a correct baseline/current pair. Both view states survive switching. Resizing restores one action group to the desktop aside, without duplicates.

At 390×844 after each of two steps, the cue begins at y=8, the pitch occupies approximately y=132–346, and the action group occupies y=519–664. All are visible together, with no horizontal overflow. The prior mobile finding is repaired for this inspected viewport. The same controls remain native buttons, and model time still advances only through explicit actions. Desktop and mobile screenshots were visually inspected. Unfamiliar-reader understanding and physical-device/screen-reader journeys remain Not checked.

## October 29 observed-flight refinement

Added blue observed-flight trail, ball halo, and destination corner marks, independently of reachability colors. Preparation remains a short gray dashed hint. Browser checks confirmed no blue direction cue at 0 or 1 seconds; a tentative preparation hint at 1; blue observed trail/destination from 2; Ball here at arrival; cleared cues on retry; both near/far continuations and first-view play working. Inspected desktop and 390×844 screenshots; the final direction label stays within the SVG bounds. At 390×844 the pitch begins around y=132 and controls end around y=712, preserving simultaneous visibility. No model changes or new probabilities introduced. JavaScript syntax/diff checks passed. Reader comprehension remains Not checked.

## October 29 small ending fixes

Implemented the remaining label, null-result comparison, mobile ending, and essay-link refinements. All 14 model/presentation tests passed, including a new comparison regression for unchanged gaps, repeated actions, different successful timing, and cross-condition boundaries. Browser checks confirmed Heading here fits within the diagram at 390px; completed controls hide and restore on retry; final pitch spans approximately y=39–253 and the complete result spans y=520–757 in an 844px-high viewport. Visually inspected this mobile ending. Confirmed same-gap text after different timing and followed the visible setup link to the verified Then make the run heading in the essay. No model rule changes. Unfamiliar-reader comprehension remains Not checked.

## October 29 view 1 mobile and essay round-trip fixes

Implemented the final review findings without changing either model. At 390×844, after playing a turnover, observed view 1 rules at y=38–111, pitch at y=117–331, continuation controls at y=439–483, and result at y=491–659. Visually inspected mobile and desktop screenshots. Moved the arrival annotation to the central footer of the SVG, away from the cover label. Browser checks passed for draft comparison hiding, tested baseline/current values, restoring coordinates (60,26), and desktop restoration of result/comparison parents with one set of controls. View 2 still reached the cross on the 2-second commitment. Followed view 1 → Positioned for losing → #position and view 2 → Then make the run → #run. Visible setup links exist in both views before completion. Physical device, screen-reader, and unfamiliar-reader checks remain Not checked.
