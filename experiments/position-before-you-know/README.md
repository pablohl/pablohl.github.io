# Position Before You Know

Two-view local prototype. Primary format: explorable explanation. Discovery: a starting position changes which responses remain reachable after the play becomes clear. The initial assumption is that moving closer to the attack makes you more useful; the turnover continuation exposes the cost. No single best position or outcome score is assigned.

## Journey and comparisons

Entry points are the Experiments listing and the related essay, plus direct arrival. Invitation: move a supporting player and compare what is reachable under two continuations. First action is dragging the person labeled You or moving its labeled sliders, followed by either play button. Each button executes its named continuation. Controls preserve the candidate position when changing continuation. A replay preserves geometry, speed, destination, and window. Repositioning compares against the last different tested position in that continuation. The dashed previous path and numeric delta identify this baseline. Changing a draft position preserves the last completed paths and labels them as such until another test. Restore previous position executes a comparison; Start over clears both continuation histories and returns focus to the position slider. Both continuations tested from the same coordinates unlock a bounded takeaway and essay link.

## Model and presentation

The current rules are owned by model.mjs: start bounds x=25–65 and y=18–50; A=(82,20), C=(18,42), speed 10 illustrative units per model second, response window 3 model seconds. Straight-line travel, no collisions, offside, opponent adaptation, or random outcomes. Paths stop at the reachable endpoint while the complete line exposes remaining distance. Display rounding does not determine classification. Curated continuations are not probabilities. Reaching a destination is not a goal or a successful defensive intervention. Playback animation is shortened and optional.

Green identifies your team and its route, rust identifies the opponent/ball route, ochre square A identifies receiving, and violet diamond C identifies cover. Dashed neutral paths/outlines identify previous runs. Labels and shapes supplement color; selection is indicated with button border weight and aria-pressed. Shared editorial theme and fonts are reused. Desktop pairs the pitch/position controls with actions/results; narrow layouts place actions and result immediately after position controls. Reduced motion preserves all final comparisons. Native sliders provide keyboard equivalents to dragging. Results have text equivalents and a concise polite live announcement.

## Verification

Run bundled Node with --test experiments/position-before-you-know/model.test.mjs. Model cases cover opposite trade-offs, fixed rules, exact arrival boundaries, deterministic replay, immutability, clamps, invalid input, and unchanged results. Rendered journey and perspective findings are recorded in docs/history/position-before-you-know-first-version.md. Unfamiliar-reader comprehension is not checked until a reader tries it without coaching.

## Player identification update October 29

Person silhouettes replace the player letters. The draggable player has a persistent You label and outer control ring; stationary players are directly labeled Teammate and Opponent. Receiving and cover spaces have direct labels at both viewport sizes; their letter codes are removed from controls, feedback, and graphic descriptions. The arrival marker also uses a person silhouette. Positioning and model rules are unchanged.

## Consequence cues October 29

Reachability is now encoded independently from team identity: teal and a check mark for arriving within the window, warm amber and a warning mark for arriving late, slate and an approximately-equal mark for exact arrival at the boundary. The active destination has a halo and status symbol, the endpoint shows the arrival margin, and a warm band/dashed segment exposes remaining distance when late. The result repeats the outcome color with a short local consequence, while the end comparison uses matching labeled chips for both continuations. No success probability, scoring, tactical judgment, or model rule changed. Draft repositioning clears outcome emphasis until tested again; reset clears it entirely. Symbols, line patterns, text, and color provide redundant cues.

## Second view Then make the run

The [second-view brief](run-brief.md) owns its discovery, stages, and evidence limits. run-model.mjs owns cross timing/movement rules; run-view.mjs owns its interface and shared hash navigation. View 1 remains the default; #position and #run select views without resetting either state. Browser Back/Forward changes the view; reloading resets in-memory progress. View 2 progresses only when an action button advances one model second. A same-cross replay retains the last completed comparison, while the alternate cross explicitly changes the destination/cues. Its clock, shrinking reachable area, path, destination labels, and outcome comparison show the cost of waiting or committing. Run all model checks with Node --test experiments/position-before-you-know/*.test.mjs.

The second view’s near/far reachability readouts use unboxed colored text and status symbols, separating noninteractive status from bordered action buttons.

## Review fixes October 29

Replay and result summaries now describe the recorded wait interval, initial direction, and each redirection using run-history.mjs. This is presentation of existing action records; neither model file changed. Same-cross recovery is named Retry the same cross; alternate-cross recovery names its next destination and still resets time/movement while preserving the labeled completed baseline. View 1 hides the old numeric comparison and delta while a changed position is untested, restoring them on the next test.

At widths up to 760px the existing cue, rule paragraph, and action group move into the pitch column in DOM reading order. They are not duplicated. After stepping/retrying, the page brings the compact cue/pitch/control group into view only if it has moved outside the viewport; a fitting group remains stationary on subsequent steps. Desktop restores the original side-by-side arrangement. This does not change simulation time or any model rules.

## Observed flight cue October 29

View 2 uses a distinct blue direction role (#315d97), with a thicker observed ball trail, ball halo, and destination corner brackets. A short gray dashed preparation hint appears only at time 1; blue cues appear from time 2, when the curated story makes direction explicit. No destination is highlighted initially. The trail ends at the current observed ball position, with no future segment drawn. The destination annotation reads Cross here while in flight and Ball here at arrival. Destination reachability circles/status still use the independent teal/amber/slate palette. Retry clears the flight and destination cue. Near/far post labels are placed clear of the flight and controlled player. View 1 and both model files are unchanged.

## Ending and essay connection October 29

View 2 now links visibly from its setup to the essay’s #then-make-the-run section; the takeaway links to the same section. The in-flight destination label reads Heading here on two lines to fit the diagram; arrival still reads Ball here. Completed runs hide stepping controls (restored by retry), and narrow layouts also hide the completed step-rule paragraph, giving the result room beside the final pitch. Comparison summaries explicitly state unchanged gaps, different successful actions, repeated identical actions, or changed gaps for same-cross comparisons. Different-cross comparisons retain their changed-condition explanation without implying a controlled numerical difference. Model rules are unchanged.

## View 1 mobile and reciprocal essay links October 29

View 1 now offers a visible setup link to #positioned-for-losing; its ending targets the same section. The essay has contextual links back to #position and #run beside their relevant discussions, while retaining its general experiment invitation. Following these links selects the corresponding view; cross-page navigation does not promise to restore a prior run.

At up to 760px the existing response rules, continuation buttons, and immediate result move into the pitch column, with the comparison/delta after recovery in the secondary column. Native controls are moved rather than duplicated; desktop restores original parentage. Position sliders are compact but retain 44px interaction height. The duplicated player instruction below the pitch was removed, and rules shortened while retaining the same time/speed. Arrival margin annotation sits below the pitch at a fixed central position to avoid the cover label and moving players. After playing, scroll adjustment keeps the compact model/action/result group visible when it fits. Dragging and slider changes do not trigger automatic scrolling. Both model files remain unchanged.
