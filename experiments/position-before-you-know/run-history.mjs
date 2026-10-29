import {runOutcome} from './run-model.mjs';
// Presentation only: describe the recorded actions without changing simulation state.
export function actionHistory(state) {
  const events = [];
  let previous = null;
  let waitedUntil = 0;
  for (const action of state.actions) {
    if (!action.choice) {
      waitedUntil = action.time + 1;
      continue;
    }
    if (action.choice !== previous) {
      events.push(`${action.time} s: ${previous ? 'redirected' : 'ran'} toward ${action.choice} post`);
      previous = action.choice;
    }
  }
  if (waitedUntil > 0) events.unshift(`0–${waitedUntil} s: waited centrally`);
  return events.length ? events.join(' → ') : 'No action taken yet';
}

export function comparisonChange(before, after) {
  const a = runOutcome(before), b = runOutcome(after);
  if (!a || !b || before.story !== after.story) return '';
  const sameActions = JSON.stringify(before.actions) === JSON.stringify(after.actions);
  if (Math.abs(a.gap-b.gap) < 1e-8) {
    if (sameActions) return 'Same actions, same outcome.';
    return b.arrived ? 'Different actions; both runs reached the cross.' : 'Same final gap; different actions or timing. The changed choices did not change the receiving gap.';
  }
  return `${Math.abs(a.gap-b.gap).toFixed(1)} pitch units ${b.gap<a.gap?'closer to':'farther from'} the receiving space than the previous run.`;
}
