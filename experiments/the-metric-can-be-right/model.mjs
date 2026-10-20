// All figures are illustrative, not estimates from a real fraud system.
export const TRANSACTIONS = 10_000;
export const FRAUD = 200;
export const MISSED_FRAUD_COST = 600;
export const ANALYST_HOURLY_COST = 40;
export const MODEL = Object.freeze({
  A: Object.freeze({ missed: 60, falseDeclines: 20, runCost: 200, reviewMinutes: 10 }),
  B: Object.freeze({ missed: 20, falseDeclines: 80, runCost: 500, reviewMinutes: 2 }),
});

export function evaluate(model) {
  const correct = TRANSACTIONS - model.missed - model.falseDeclines;
  const alerts = FRAUD - model.missed + model.falseDeclines;
  return { correct, accuracy: correct / TRANSACTIONS, alerts };
}

export function errorCost(model, falseDeclineCost, missedFraudCost = MISSED_FRAUD_COST) {
  const parts = costComponents(model, falseDeclineCost, missedFraudCost);
  return parts.missedFraud + parts.falseDeclines + parts.modelRun;
}

export function costComponents(model, falseDeclineCost, missedFraudCost = MISSED_FRAUD_COST) {
  return {
    missedFraud: model.missed * missedFraudCost,
    falseDeclines: model.falseDeclines * falseDeclineCost,
    modelRun: model.runCost,
  };
}

export function breakEvenFalseDeclineCost(a = MODEL.A, b = MODEL.B) {
  const differenceInFalseDeclines = b.falseDeclines - a.falseDeclines;
  if (differenceInFalseDeclines === 0) return null;
  return ((a.missed - b.missed) * MISSED_FRAUD_COST + a.runCost - b.runCost) / differenceInFalseDeclines;
}

export function reviewWorkload(model, transactions = TRANSACTIONS) {
  const alerts = evaluate(model).alerts * transactions / TRANSACTIONS;
  return { alerts, minutesPerAlert: model.reviewMinutes, hours: alerts * model.reviewMinutes / 60 };
}

export function reviewProjection(model, hourlyRate = ANALYST_HOURLY_COST) {
  return reviewWorkload(model).hours * hourlyRate;
}

export function preferred(falseDeclineCost, includeReview = false) {
  const total = (key) => errorCost(MODEL[key], falseDeclineCost)
    + (includeReview ? reviewProjection(MODEL[key]) : 0);
  const difference = total('A') - total('B');
  return difference === 0 ? 'tie' : difference < 0 ? 'A' : 'B';
}

// A representative 1,000-transaction slice, exactly one tenth of the full
// evaluation. Marks are ordered consistently so changes can be compared.
export function sampleOutcomes(key) {
  const model = MODEL[key];
  const outcomes = Array(1000).fill('correct');
  for (let i = 0; i < model.missed / 10; i += 1) outcomes[20 * i + 17] = 'missed';
  for (let i = 0; i < model.falseDeclines / 10; i += 1) outcomes[13 * i + 433] = 'declined';
  return outcomes;
}

export function countOutcomes(outcomes) {
  return outcomes.reduce((counts, outcome) => {
    counts[outcome] += 1;
    return counts;
  }, { correct: 0, missed: 0, declined: 0 });
}
