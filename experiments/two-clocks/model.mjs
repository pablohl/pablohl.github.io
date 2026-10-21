// A deliberately small, synthetic decision model. Values are not estimates of a real project.
export const BASE = Object.freeze({
  deadline: 12,
  budget: 100_000,
  buildWeeks: 8,
  buildCost: 60_000,
  testCost: 5_000,
  payoff: 180_000,
  prior: 0.5,
  reliability: 0.8,
  successIfViable: 0.9,
  successIfNotViable: 0.1,
});

export function start(config = BASE) {
  return { week: 0, budget: config.budget, belief: config.prior, tests: [], spent: 0, status: 'active', net: null };
}

export function latestStart(config = BASE) {
  return config.deadline - config.buildWeeks;
}

export function canBuild(state, config = BASE) {
  return state.status === 'active' && state.week <= latestStart(config) && state.budget >= config.buildCost;
}

export function canTest(state, config = BASE) {
  return state.status === 'active' && state.week < config.deadline && state.budget >= config.testCost;
}

export function positiveChance(belief, reliability) {
  return belief * reliability + (1 - belief) * (1 - reliability);
}

export function updateBelief(belief, signal, reliability) {
  if (!Number.isFinite(belief) || belief < 0 || belief > 1) throw new RangeError('belief must be between 0 and 1');
  if (!['positive', 'negative'].includes(signal)) throw new TypeError('signal must be positive or negative');
  if (!Number.isFinite(reliability) || reliability <= 0 || reliability >= 1) throw new RangeError('reliability must be between 0 and 1');
  const positive = signal === 'positive';
  const likelihoodIfWorks = positive ? reliability : 1 - reliability;
  const likelihoodIfFails = positive ? 1 - reliability : reliability;
  const numerator = belief * likelihoodIfWorks;
  return numerator / (numerator + (1 - belief) * likelihoodIfFails);
}

export function signalFromDraw(viable, reliability, draw) {
  if (typeof viable !== 'boolean') throw new TypeError('Hidden viability must be true or false');
  if (!Number.isFinite(reliability) || reliability <= 0 || reliability >= 1) throw new RangeError('reliability must be between 0 and 1');
  if (!Number.isFinite(draw) || draw < 0 || draw >= 1) throw new RangeError('draw must be between 0 and 1');
  return draw < (viable ? reliability : 1 - reliability) ? 'positive' : 'negative';
}

export function successChance(belief, config = BASE) {
  return belief * config.successIfViable + (1 - belief) * config.successIfNotViable;
}

export function outcomeFromDraw(viable, config = BASE, draw) {
  if (typeof viable !== 'boolean') throw new TypeError('Hidden viability must be true or false');
  if (!Number.isFinite(draw) || draw < 0 || draw >= 1) throw new RangeError('draw must be between 0 and 1');
  const chance = viable ? config.successIfViable : config.successIfNotViable;
  if (!Number.isFinite(chance) || chance < 0 || chance > 1) throw new RangeError('execution probability must be between 0 and 1');
  return draw < chance;
}

export function sampleScenario(config = BASE, random = Math.random) {
  const draw = () => {
    const value = random();
    if (!Number.isFinite(value) || value < 0 || value >= 1) throw new RangeError('random must return a number from 0 up to 1');
    return value;
  };
  const viable = draw() < config.prior;
  const tests = Array.from({ length: config.deadline }, draw);
  return { viable, tests, execution: draw() };
}

// Hypothetical/planning operation. Actual observations use takeAction with hidden viability and a draw.
export function applyTestSignal(state, signal, config = BASE) {
  if (!canTest(state, config)) throw new Error('A test is no longer affordable or in time');
  if (!['positive', 'negative'].includes(signal)) throw new TypeError('signal must be positive or negative');
  return {
    ...state,
    week: state.week + 1,
    budget: state.budget - config.testCost,
    belief: updateBelief(state.belief, signal, config.reliability),
    tests: [...state.tests, signal],
    spent: state.spent + config.testCost,
  };
}

export function takeAction(state, action, config = BASE, evidence = {}) {
  if (state.status !== 'active') throw new Error('The project has already ended');
  if (action === 'test') {
    if (Object.hasOwn(evidence, 'signal')) throw new TypeError('Use applyTestSignal for hypothetical signals; simulated tests need hidden viability and a draw');
    if (!canTest(state, config)) throw new Error('A test is no longer affordable or in time');
    return applyTestSignal(state, signalFromDraw(evidence.viable, config.reliability, evidence.draw), config);
  }
  if (action === 'build') {
    if (!canBuild(state, config)) throw new Error('There is not enough time or budget to build');
    const succeeded = outcomeFromDraw(evidence.viable, config, evidence.executionDraw);
    return {
      ...state,
      week: state.week + config.buildWeeks,
      budget: state.budget - config.buildCost,
      status: 'built',
      net: (succeeded ? config.payoff : 0) - config.buildCost - state.spent,
      succeeded,
      viable: evidence.viable,
    };
  }
  if (action === 'stop') return { ...state, status: 'stopped', net: -state.spent };
  throw new Error(`Unknown action: ${action}`);
}

// Values are expected *additional* net dollars from this point, so past test costs
// are sunk. Testing branches on possible evidence and then makes the best available choice.
export function actionValues(state, config = BASE, cache = new Map()) {
  if (state.status !== 'active') return { build: null, test: null, stop: null };
  const build = canBuild(state, config) ? successChance(state.belief, config) * config.payoff - config.buildCost : null;
  const stop = 0;
  let test = null;
  if (canTest(state, config)) {
    const chance = positiveChance(state.belief, config.reliability);
    const next = (signal) => applyTestSignal(state, signal, config);
    test = -config.testCost
      + chance * bestValue(next('positive'), config, cache)
      + (1 - chance) * bestValue(next('negative'), config, cache);
  }
  return { build, test, stop };
}

export function bestValue(state, config = BASE, cache = new Map()) {
  if (state.status !== 'active') return 0;
  const key = JSON.stringify([
    state.week, state.budget, state.belief.toFixed(12), config.deadline,
    config.buildWeeks, config.buildCost, config.testCost, config.payoff,
    config.reliability, config.successIfViable, config.successIfNotViable,
  ]);
  if (cache.has(key)) return cache.get(key);
  const value = Math.max(...Object.values(actionValues(state, config, cache)).filter((item) => item !== null));
  cache.set(key, value);
  return value;
}

export function bestAction(state, config = BASE, cache = new Map()) {
  const values = actionValues(state, config, cache);
  return Object.entries(values).filter(([, value]) => value !== null).sort((a, b) => b[1] - a[1])[0][0];
}

// Transparent policies, run against the same scenario for a fair comparison.
export function runExampleStrategy(scenario, strategy, config = BASE, cache = new Map()) {
  let state = start(config);
  if (strategy === 'adaptive') {
    while (state.status === 'active') {
      const action = bestAction(state, config, cache);
      state = action === 'test'
        ? takeAction(state, 'test', config, { viable: scenario.viable, draw: scenario.tests[state.tests.length] })
        : action === 'build'
          ? takeAction(state, 'build', config, { viable: scenario.viable, executionDraw: scenario.execution })
          : takeAction(state, 'stop', config);
    }
    return state;
  }
  if (strategy === 'test-once') {
    state = takeAction(state, 'test', config, { viable: scenario.viable, draw: scenario.tests[0] });
    if (state.tests[0] === 'negative' || !canBuild(state, config)) return takeAction(state, 'stop', config);
  } else if (strategy !== 'build-now') {
    throw new Error(`Unknown strategy: ${strategy}`);
  }
  return takeAction(state, 'build', config, { viable: scenario.viable, executionDraw: scenario.execution });
}

export function summarizeNets(nets) {
  if (!nets.length) return { gain: 0, smallLoss: 0, largeLoss: 0, average: 0 };
  return {
    gain: nets.filter((net) => net > 0).length,
    smallLoss: nets.filter((net) => net <= 0 && net > -60_000).length,
    largeLoss: nets.filter((net) => net <= -60_000).length,
    average: nets.reduce((sum, net) => sum + net, 0) / nets.length,
  };
}
