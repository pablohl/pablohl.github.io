import assert from 'node:assert/strict';
import test from 'node:test';
import { MODEL, TRANSACTIONS, breakEvenFalseDeclineCost, costComponents, countOutcomes, evaluate, errorCost, preferred, reviewProjection, reviewWorkload, sampleOutcomes } from './model.mjs';

test('opening accuracy and error counts agree', () => {
  assert.equal(evaluate(MODEL.A).correct, 9920);
  assert.equal(evaluate(MODEL.B).correct, 9900);
  assert.equal(evaluate(MODEL.A).accuracy, .992);
  assert.equal(evaluate(MODEL.B).accuracy, .99);
  assert.equal(TRANSACTIONS, 10_000);
  assert.equal(evaluate(MODEL.A).alerts, 160);
  assert.equal(evaluate(MODEL.B).alerts, 260);
});

test('sample marks are a consistent tenth of the evaluation', () => {
  for (const key of ['A', 'B']) {
    const outcomes = sampleOutcomes(key);
    const counts = countOutcomes(outcomes);
    assert.equal(outcomes.length, 1000);
    assert.equal(counts.missed, MODEL[key].missed / 10);
    assert.equal(counts.declined, MODEL[key].falseDeclines / 10);
    assert.equal(counts.correct, evaluate(MODEL[key]).correct / 10);
    assert.equal(counts.correct + counts.missed + counts.declined, 1000);
  }
});

test('economic preference can change with a consequential assumption', () => {
  assert.equal(errorCost(MODEL.A, 350), 43_200);
  assert.equal(errorCost(MODEL.B, 350), 40_500);
  assert.equal(preferred(350), 'B');
  assert.equal(preferred(400), 'A');
  assert.equal(preferred(400, true), 'B');
  assert.ok(reviewProjection(MODEL.A) > reviewProjection(MODEL.B));
});

test('cost components and break-even agree with displayed totals', () => {
  for (const amount of [0, 350, 400, 700]) {
    for (const model of Object.values(MODEL)) {
      const parts = costComponents(model, amount);
      assert.equal(parts.missedFraud + parts.falseDeclines + parts.modelRun, errorCost(model, amount));
    }
  }
  assert.equal(breakEvenFalseDeclineCost(), 395);
  assert.equal(errorCost(MODEL.A, 395), errorCost(MODEL.B, 395));
  assert.equal(preferred(395), 'tie');
});

test('alert count, case time, analyst-hours and projected cost are consistent', () => {
  assert.deepEqual(reviewWorkload(MODEL.A), { alerts: 160, minutesPerAlert: 10, hours: 160 * 10 / 60 });
  assert.deepEqual(reviewWorkload(MODEL.B), { alerts: 260, minutesPerAlert: 2, hours: 260 * 2 / 60 });
  assert.deepEqual(reviewWorkload(MODEL.A, 100_000), { alerts: 1600, minutesPerAlert: 10, hours: 1600 * 10 / 60 });
  assert.deepEqual(reviewWorkload(MODEL.B, 100_000), { alerts: 2600, minutesPerAlert: 2, hours: 2600 * 2 / 60 });
  for (const model of Object.values(MODEL)) {
    assert.equal(reviewProjection(model), reviewWorkload(model).hours * 40);
  }
});

test('review projection changes the final comparison at $600 per false decline', () => {
  const aBefore = errorCost(MODEL.A, 600);
  const bBefore = errorCost(MODEL.B, 600);
  const aWithReview = aBefore + reviewProjection(MODEL.A);
  const bWithReview = bBefore + reviewProjection(MODEL.B);

  assert.equal(bBefore - aBefore, 12_300);
  assert.equal(Math.round(aWithReview), 49_267);
  assert.equal(Math.round(bWithReview), 60_847);
  assert.equal(Math.round(bWithReview - aWithReview), 11_580);
  assert.equal(preferred(600), 'A');
  assert.equal(preferred(600, true), 'A');
});
