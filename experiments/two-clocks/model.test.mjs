import assert from 'node:assert/strict';
import test from 'node:test';
import { BASE, actionValues, applyTestSignal, bestAction, canBuild, latestStart, outcomeFromDraw, runExampleStrategy, sampleScenario, signalFromDraw, start, successChance, summarizeNets, takeAction, updateBelief } from './model.mjs';

test('a test changes belief, not the underlying feasibility of the technology', () => {
  assert.equal(updateBelief(0.5, 'positive', 0.8), 0.8);
  assert.ok(Math.abs(updateBelief(0.5, 'negative', 0.8) - 0.2) < 1e-12);
  assert.equal(signalFromDraw(true, 0.8, 0.7), 'positive');
  assert.equal(signalFromDraw(false, 0.8, 0.7), 'negative');
});

test('build and test choices use the same expected-value model', () => {
  const strong = actionValues(start());
  assert.equal(strong.build, 30_000);
  assert.ok(strong.test > strong.build);
  assert.equal(bestAction(start()), 'test');

  const weak = { ...BASE, reliability: 0.55 };
  const weakValues = actionValues(start(weak), weak);
  assert.ok(weakValues.build > weakValues.test);
  assert.equal(bestAction(start(weak), weak), 'build');
});

test('negative evidence makes immediate building unattractive; positive evidence supports it', () => {
  const negative = applyTestSignal(start(), 'negative');
  const positive = applyTestSignal(start(), 'positive');
  assert.ok(actionValues(negative).build < 0);
  assert.equal(bestAction(positive), 'build');
});

test('viability, noisy tests, and execution variability are separate', () => {
  assert.equal(successChance(0.5), 0.5);
  assert.equal(successChance(1), 0.9);
  assert.equal(successChance(0), 0.1);
  assert.equal(outcomeFromDraw(true, BASE, 0.95), false);
  assert.equal(outcomeFromDraw(false, BASE, 0.05), true);
  const draws = [0.2, ...Array(12).fill(0.4), 0.95];
  const scenario = sampleScenario(BASE, () => draws.shift());
  assert.equal(scenario.viable, true);
  assert.equal(scenario.tests.length, 12);
  assert.equal(scenario.execution, 0.95);
});

test('repeated learning can leave a strong belief but no feasible build', () => {
  let state = start();
  for (let i = 0; i < 5; i += 1) state = applyTestSignal(state, 'positive');
  assert.equal(latestStart(), 4);
  assert.equal(state.week, 5);
  assert.equal(state.budget, 75_000);
  assert.ok(state.belief > 0.99);
  assert.equal(canBuild(state), false);
  assert.equal(actionValues(state).build, null);
  assert.equal(bestAction(state), 'stop');
});

test('the opportunity can also close earlier when building takes longer', () => {
  const slower = { ...BASE, buildWeeks: 10 };
  let state = start(slower);
  for (let i = 0; i < 3; i += 1) state = applyTestSignal(state, 'positive', slower);
  assert.equal(latestStart(slower), 2);
  assert.equal(canBuild(state, slower), false);
});

test('realized results include the cost of tests and never award a payoff for stopping', () => {
  const tested = applyTestSignal(start(), 'negative');
  assert.equal(takeAction(tested, 'stop').net, -5_000);
  assert.equal(takeAction(tested, 'build', BASE, { viable: true, executionDraw: 0.95 }).net, -65_000);
  assert.equal(takeAction(tested, 'build', BASE, { viable: true, executionDraw: 0.2 }).net, 115_000);
});

test('identical decisions can produce different outcomes', () => {
  const failed = { viable: true, tests: Array(12).fill(0.1), execution: 0.95 };
  const worked = { ...failed, execution: 0.2 };
  assert.equal(runExampleStrategy(failed, 'build-now').net, -60_000);
  assert.equal(runExampleStrategy(worked, 'build-now').net, 120_000);
});

test('strategy comparisons share hidden state and random draws', () => {
  const scenario = { viable: true, tests: Array(12).fill(0.1), execution: 0.2 };
  assert.equal(runExampleStrategy(scenario, 'build-now').net, 120_000);
  assert.equal(runExampleStrategy(scenario, 'test-once').net, 115_000);
  const misleading = { viable: true, tests: [0.99], execution: 0.2 };
  assert.equal(runExampleStrategy(misleading, 'build-now').net, 120_000);
  assert.equal(runExampleStrategy(misleading, 'test-once').net, -5_000);
  assert.deepEqual(summarizeNets([120_000, -5_000, -60_000]), { gain: 1, smallLoss: 1, largeLoss: 1, average: 55_000 / 3 });
});

test('replaying one project preserves its observed signals and build outcome', () => {
  const scenario = { viable: false, tests: [0.05, 0.95], execution: 0.08 };
  const play = () => {
    let state = start();
    state = takeAction(state, 'test', BASE, { viable: scenario.viable, draw: scenario.tests[0] });
    const firstSignal = state.tests[0];
    state = takeAction(state, 'build', BASE, { viable: scenario.viable, executionDraw: scenario.execution });
    return { firstSignal, succeeded: state.succeeded, net: state.net };
  };
  assert.deepEqual(play(), play());
  assert.deepEqual(play(), { firstSignal: 'positive', succeeded: true, net: 115_000 });
});

test('adaptive policy reacts to evidence instead of following the test-once rule', () => {
  const negative = applyTestSignal(start(), 'negative');
  const twiceNegative = applyTestSignal(negative, 'negative');
  const mixed = applyTestSignal(negative, 'positive');
  assert.equal(bestAction(negative), 'test');
  assert.equal(bestAction(twiceNegative), 'stop');
  assert.equal(bestAction(mixed), 'test');
  const scenario = { viable: true, tests: [0.9, 0.1, 0.1, 0.1], execution: 0.2 };
  assert.equal(runExampleStrategy(scenario, 'test-once').net, -5_000);
  assert.equal(runExampleStrategy(scenario, 'adaptive').net, 105_000);
});

test('simulated observations require hidden state and a draw; hypothetical signals are separate', () => {
  assert.throws(() => takeAction(start(), 'test', BASE, { signal: 'positive' }), /applyTestSignal/);
  assert.throws(() => takeAction(start(), 'test', BASE), /Hidden viability/);
  assert.throws(() => takeAction(start(), 'test', BASE, { viable: true, draw: 1 }), /draw must be/);
  assert.throws(() => applyTestSignal(start(), 'maybe'), /signal must be/);
  assert.throws(() => updateBelief(.5, 'maybe', .8), /signal must be/);
  assert.throws(() => takeAction(start(), 'build', BASE, { viable: true }), /draw must be/);
});

test('memoized values depend on payoff-relevant assumptions', () => {
  const cache = new Map();
  const base = actionValues(start(), BASE, cache);
  const expensive = actionValues(start(), { ...BASE, testCost: 10_000 }, cache);
  const lowerPayoff = actionValues(start(), { ...BASE, payoff: 100_000 }, cache);
  assert.ok(expensive.test < base.test);
  assert.ok(lowerPayoff.build < base.build);
});

test('stochastic frequencies and policy returns approach analytical values', () => {
  let seed = 28031985;
  const random = () => {
    seed = (1664525 * seed + 1013904223) >>> 0;
    return seed / 2 ** 32;
  };
  const scenarios = Array.from({ length: 8_000 }, () => sampleScenario(BASE, random));
  const viable = scenarios.filter((scenario) => scenario.viable);
  const nonviable = scenarios.filter((scenario) => !scenario.viable);
  const positiveWhenViable = viable.filter((scenario) => signalFromDraw(true, BASE.reliability, scenario.tests[0]) === 'positive').length / viable.length;
  const positiveWhenNotViable = nonviable.filter((scenario) => signalFromDraw(false, BASE.reliability, scenario.tests[0]) === 'positive').length / nonviable.length;
  assert.ok(Math.abs(viable.length / scenarios.length - .5) < .025);
  assert.ok(Math.abs(positiveWhenViable - .8) < .025);
  assert.ok(Math.abs(positiveWhenNotViable - .2) < .025);
  const cache = new Map();
  const average = (strategy) => scenarios.reduce((total, scenario) => total + runExampleStrategy(scenario, strategy, BASE, cache).net, 0) / scenarios.length;
  assert.ok(Math.abs(average('build-now') - 30_000) < 4_000);
  assert.ok(Math.abs(average('test-once') - 31_600) < 4_000);
  assert.ok(Math.abs(average('adaptive') - 34_524) < 4_000);
});
