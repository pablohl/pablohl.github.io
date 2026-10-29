# Then make the run design brief

Companion to the original positioning view. Primary format: step-based explorable explanation. Central discovery: a position that preserves options can stop being useful when the play becomes clear and the remaining travel window shrinks. Likely starting assumption: keeping both posts possible remains useful throughout the cross.

## Entry and discovery

Entry points are the shared experiment listing, the essay invitation, the scenario selector, the first view's onward link, and direct #run arrival. Preview promise: explore where to position a supporting player, then when to commit to a run as the cross becomes clear. The second view provides its own striker/cross setup; it does not require completing the first.

## Consequential path

| Question | Action | Fixed conditions | Visible consequence | Comparison | Recovery | Learning |
| --- | --- | --- | --- | --- | --- | --- |
| What can I still reach? | Let play develop for one model second, holding the initial position | Starting position, cross, cues, speed, deadline | Reachable area shrinks; post labels and chips show remaining availability | Same pitch and two destination points across steps | Replay same cross | Waiting uses the movement window even without moving |
| When and where do I commit? | Run toward either post, advancing one second; advance continues the run; another run button redirects | Same cross and deadline | Player/path move; reachable area moves with player; other post can become unreachable | Fixed initial-position marker; original destinations remain visible | Replay with a different action sequence | Committing trades alternatives for a specific receiving opportunity |
| What did timing change? | Complete the four steps, replay and change actions | Same cross, cues, start, speed, deadline | Arrival or shortfall, with a warm gap if late | Previous completed path and labeled prior/current result | Replay or optionally try other cross | Knowing the direction does not restore travel time already spent |

## Visual and screen composition

Stable pitch scale and direct person labels match view 1. Team identity stays green; reachable/late/boundary use the existing teal/amber/slate semantic colors plus labels and symbols. Shaded ellipse represents remaining travel distance at current player position, not forecast uncertainty. Solid path is current movement; dashed path/ring is previous completed movement. Model clock shows all five positions from 0 to 4 seconds.

Laptop pairs pitch, clock, availability with controls, cue and result. Narrow layout places the cue and step rules before the pitch and moves the same native 44px action buttons immediately below its status readouts. If stepping or retrying leaves this group outside the viewport, scrolling restores the visible model/action relationship; it remains stationary while the group fits. The question and step rules remain visible in reading order; secondary methods follow the takeaway. Navigation preserves progress separately in each view.

## Rules and limits

run-model.mjs owns the numbers: initial (68,35), near (84,23), far (84,47), speed 10 units per model second, arrival at 4 seconds. Direct distance from start to either destination is 20 units. Cue at 1 second suggests a direction; at 2 seconds the flight explicitly reveals it. Another second of waiting from the initial position makes both endpoints unreachable. Earlier commitment can succeed, and an early run in the other direction can lose the actual endpoint. Redirection is allowed under the same speed constraint.

The model is deterministic, without probabilities or random sampling. Observed flight is revealed only through current time. Point destinations, no acceleration/collisions/offside/opponent adaptation; arrival is no guarantee of receiving or scoring. Replay isolates timing and movement but gives hindsight; do not interpret it as evidence of original prediction skill.

## Recovery and ending

Replay resets time and movement within the same cross, retaining the previous completed comparison. Trying the other cross changes destination and cues and labels any differing prior cross. View switching and browser Back/Forward preserve in-memory states. A reload starts fresh. At the deadline, model actions disable with a nearby reason; replay stays available.

End beside the result and prior run: identify which commitment and remaining distance produced the outcome, then explain that readiness must eventually become a specific action. Retaining or changing the original judgment are both legitimate. Link to the essay for the broader argument.

## Verification

Model tests cover initial reach, waiting past feasibility, exact boundary timing, early success, early wrong-direction commitment and failed redirection, alternate cross symmetry, deterministic replay, immutability, and ended-play invariance. Browser journeys cover both views, direct arrival, first view state preservation, same/different cross comparisons, keyboard stepping, disabled actions, narrow layout, enlarged text and reduced motion. See the historical second-view review for observed evidence; unfamiliar-reader comprehension is not checked.

Current summaries include wait intervals and each change of run direction, so a wrong-way early commitment cannot be mistaken for a late direct run. Recovery labels name the next cross destination explicitly.
