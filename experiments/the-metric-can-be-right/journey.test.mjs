import assert from 'node:assert/strict';
import test from 'node:test';
import { createJourney, updateJourney } from './journey.mjs';

test('moving forward and backward preserves the original decision and discoveries', () => {
  let state = createJourney();
  state = updateJourney(state, { type: 'choice', value: 'A' });
  state = updateJourney(state, { type: 'stage', stage: 1 });
  state = updateJourney(state, { type: 'prediction', value: 'different' });
  state = updateJourney(state, { type: 'filter', value: 'errors' });
  state = updateJourney(state, { type: 'stage', stage: 2 });
  state = updateJourney(state, { type: 'cost', value: 400 });
  state = updateJourney(state, { type: 'stage', stage: 3 });
  state = updateJourney(state, { type: 'review', value: 'A' });
  state = updateJourney(state, { type: 'stage', stage: 4 });
  state = updateJourney(state, { type: 'stage', stage: 1 });
  assert.equal(state.choice, 'A');
  assert.equal(state.prediction, 'different');
  assert.equal(state.outcomeFilter, 'errors');
  assert.equal(state.declineCost, 400);
  assert.deepEqual(state.reviews, ['A']);
});

test('counterfactual cannot open before initial decision, and does not replace it', () => {
  let state = createJourney();
  state = updateJourney(state, { type: 'choice', value: 'B' });
  state = updateJourney(state, { type: 'stage', stage: 4 });
  assert.equal(updateJourney(state, { type: 'openCounterfactual' }).counterfactualOpen, false);
  state = updateJourney(state, { type: 'nextChoice', value: 'deploy' });
  state = updateJourney(state, { type: 'openCounterfactual' });
  state = updateJourney(state, { type: 'counterfactualChoice', value: 'errors' });
  assert.equal(state.choice, 'B');
  assert.equal(state.nextChoice, 'deploy');
  assert.equal(state.counterfactualChoice, 'errors');
  assert.equal(updateJourney(state, { type: 'reset' }).choice, null);
});
