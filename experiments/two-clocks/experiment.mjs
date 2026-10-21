import {
  BASE, actionValues, canBuild, canTest, latestStart, outcomeFromDraw,
  runExampleStrategy, sampleScenario, start, summarizeNets, takeAction, updateBelief,
} from './model.mjs';

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const dollars = (value) => `$${Math.round(value).toLocaleString('en-US')}`;
const money = (value) => `${value < 0 ? '−' : value > 0 ? '+' : ''}${dollars(Math.abs(value))}`;
const percent = (value) => `${(value * 100).toLocaleString('en-US', { maximumFractionDigits: 1 })}%`;
const scenarioFor = (config) => sampleScenario({ ...config, deadline: Math.max(12, config.deadline) });

let config = { ...BASE };
let state = start(config);
let scenario = scenarioFor(config);
let projectId = 0;
let lastAction = null;
let actions = [];
let completedRuns = [];
let revealed = false;
let sampledFutures = [];

function beliefAtTests(tests) {
  let belief = config.prior;
  return [belief, ...tests.map((signal) => (belief = updateBelief(belief, signal, config.reliability)))];
}

function renderTimeline() {
  const last = latestStart(config);
  const current = state.week;
  const beliefs = beliefAtTests(state.tests);
  const history = state.tests.map((signal, index) => `week ${index + 1}: ${signal}, ${percent(beliefs[index + 1])}`).join('; ');
  const marker = (week) => `${week === current ? ' current' : ''}${week === last ? ' last-start' : ''}${week === config.deadline ? ' deadline' : ''}`;
  $('[data-evidence-grid]').innerHTML = Array.from({ length: config.deadline + 1 }, (_, week) => {
    const signal = state.tests[week - 1];
    return `<span class="time-cell${marker(week)}${signal ? ` signal-${signal}` : ''}" title="Week ${week}${signal ? `: ${signal} signal, ${percent(beliefs[week])} viability estimate` : ''}"><small>${week}</small><b>${signal === 'positive' ? '+' : signal === 'negative' ? '−' : ''}</b></span>`;
  }).join('');
  $('[data-evidence-grid]').style.gridTemplateColumns = `repeat(${config.deadline + 1}, minmax(0, 1fr))`;
  $('[data-evidence-grid]').setAttribute('aria-label', `Evidence timeline, weeks 0 to ${config.deadline}. ${history || 'No tests yet.'} Current week ${current}.`);
  $('[data-opportunity-grid]').innerHTML = Array.from({ length: config.deadline + 1 }, (_, week) => `<span class="time-cell${marker(week)} ${week <= last ? 'open' : 'closed'}"><small>${week === current ? 'NOW' : week === last ? 'LAST' : week === config.deadline ? 'END' : ''}</small></span>`).join('');
  $('[data-opportunity-grid]').style.gridTemplateColumns = `repeat(${config.deadline + 1}, minmax(0, 1fr))`;
  const buildStatus = state.status === 'built' ? 'Development was committed.'
    : state.status === 'stopped' ? 'The project was stopped.'
      : canBuild(state, config) ? 'Building is available.' : 'The build window is closed.';
  $('[data-opportunity-grid]').setAttribute('aria-label', `A build can start through week ${last}. Current week ${current}; deadline week ${config.deadline}. ${buildStatus}`);
  const buildStart = state.status === 'built' ? lastAction.before.week : current;
  const finish = buildStart + config.buildWeeks;
  $('[data-build-grid]').innerHTML = Array.from({ length: config.deadline + 1 }, (_, week) => `<span class="time-cell${week >= buildStart && week < finish ? ' build-required' : ''}${week >= config.deadline && week < finish ? ' build-overrun' : ''}${week === config.deadline ? ' deadline' : ''}"></span>`).join('');
  $('[data-build-grid]').style.gridTemplateColumns = `repeat(${config.deadline + 1}, minmax(0, 1fr))`;
  $('[data-build-grid]').setAttribute('aria-label', `Eight-week build beginning week ${buildStart} would finish week ${finish}, ${finish <= config.deadline ? 'by' : 'after'} the week ${config.deadline} deadline.`);
  $('[data-current-week]').textContent = `${current} / ${config.deadline}`;
  $('[data-current-belief]').textContent = percent(state.belief);
  $('[data-current-budget]').textContent = dollars(state.budget);
  $('[data-delay-left]').textContent = state.status !== 'active' ? '—' : current <= last ? String(last - current) : 'Closed';
  $('[data-window-heading]').textContent = `Last build start: week ${last} · Deadline: week ${config.deadline}`;
  $('[data-timeline-meaning]').textContent = state.status === 'built'
    ? `You started building in week ${buildStart} and finished in week ${state.week}.`
    : state.status === 'stopped'
      ? `You stopped in week ${current}. The project no longer moves.`
      : finish <= config.deadline
        ? `Start building now → finish in week ${finish}. ${last - current === 0 ? 'This is the last feasible start.' : `${last - current} ${last - current === 1 ? 'test week' : 'test weeks'} remain before the last start.`}`
        : `Start building now → finish in week ${finish}, ${finish - config.deadline} ${finish - config.deadline === 1 ? 'week' : 'weeks'} after the deadline. The build option is gone.`;
}

function renderConsequence() {
  const box = $('[data-action-consequence]');
  box.hidden = !lastAction;
  if (!lastAction) return;
  const { action, before, after } = lastAction;
  const label = $('[data-consequence-label]');
  const main = $('[data-consequence-main]');
  const delta = $('[data-consequence-delta]');
  const note = $('[data-consequence-note]');
  if (action === 'test') {
    const signal = after.tests.at(-1);
    label.textContent = `${signal === 'positive' ? 'Supportive' : 'Cautionary'} test · week ${after.week}`;
    main.textContent = `${percent(before.belief)} → ${percent(after.belief)} viability estimate`;
    delta.innerHTML = `<span>1 week used</span><span>${dollars(config.testCost)} spent</span><span>${Math.max(0, latestStart(config) - after.week)} test weeks before last start</span>`;
    note.textContent = canBuild(after, config)
      ? `The signal changed what you believe, not whether the idea is actually viable. ${after.week === latestStart(config) ? 'Another test would close the build window.' : 'Building remains possible.'}`
      : 'You learned more, but there is no longer enough time to finish the build.';
  } else if (action === 'build') {
    label.textContent = `Build completed · week ${after.week}`;
    main.textContent = `Execution ${after.succeeded ? 'succeeded' : 'failed'} · realized net ${money(after.net)}`;
    delta.innerHTML = `<span>${config.buildWeeks} weeks of development</span><span>${dollars(config.buildCost)} build cost</span><span>${dollars(after.spent)} prior test cost</span>`;
    note.textContent = 'The outcome was uncertain when you committed. Success or failure alone does not prove whether the decision was well made.';
  } else {
    label.textContent = `Project stopped · week ${after.week}`;
    main.textContent = `${dollars(after.budget)} unspent · realized net ${money(after.net)}`;
    delta.innerHTML = `<span>${after.tests.length} ${after.tests.length === 1 ? 'test' : 'tests'} completed</span><span>${dollars(after.spent)} spent learning</span>`;
    note.textContent = 'The hidden project remains unknown. You can reveal it below, but that is hindsight—not evidence available when you chose.';
  }
}

function renderExpected() {
  const values = state.status === 'active' ? actionValues(state, config) : lastAction.values;
  const value = (amount) => amount === null ? 'unavailable' : money(amount);
  $('[data-expected-values]').textContent = `${state.status === 'active' ? 'From here' : 'When you acted'}: Build ${value(values.build)} · Test ${value(values.test)} · Stop ${value(values.stop)}.`;
}

function sameAssumptions(run) {
  return run.projectId === projectId && run.reliability === config.reliability && run.testCost === config.testCost && run.deadline === config.deadline && run.successIfViable === config.successIfViable;
}

function renderAfterDecision() {
  const ended = state.status !== 'active';
  $('[data-decision-after]').hidden = !ended;
  $('[data-optional-replay]').hidden = !ended;
  if (!ended) return;
  const comparable = completedRuns.filter(sameAssumptions);
  const previous = comparable.at(-2);
  const comparison = $('[data-run-comparison]');
  comparison.hidden = !previous;
  if (previous) comparison.textContent = `Same hidden project and random draws: ${previous.actions.join(' → ')} ended at ${money(previous.net)}; ${actions.join(' → ')} ended at ${money(state.net)}. One paired outcome does not establish which decision was better.`;
  $('[data-reveal-project]').hidden = state.status !== 'stopped';
  $('[data-revealed-project]').hidden = state.status !== 'stopped' || !revealed;
  if (state.status === 'stopped' && revealed) {
    const counterfactual = canBuild(lastAction.before, config)
      ? `If you had built then, execution in this simulated future would have ${outcomeFromDraw(scenario.viable, config, scenario.execution) ? 'succeeded' : 'failed'}.`
      : 'Building was already infeasible when you stopped.';
    $('[data-revealed-project]').textContent = `The idea was ${scenario.viable ? 'viable' : 'not viable'}. ${counterfactual} This is hindsight; judge the choice using what you knew then.`;
  }
}

function renderSettings() {
  for (const [name, value] of [['reliability', config.reliability], ['testCost', config.testCost], ['deadline', config.deadline], ['execution', config.successIfViable]]) {
    $$(`[data-${name.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)}]`).forEach((button) => button.setAttribute('aria-pressed', String(Number(button.dataset[name]) === value)));
  }
  $('[data-test-copy]').textContent = `Spend ${dollars(config.testCost)} and one week.`;
}

function render() {
  $('[data-decision-brief]').textContent = `You have ${config.deadline} weeks and ${dollars(config.budget)}. Building costs ${dollars(config.buildCost)} and takes ${config.buildWeeks} weeks. The idea has a ${percent(config.prior)} estimated chance of being viable. Each test costs ${dollars(config.testCost)} and one week; its signal may be wrong. What would you do?`;
  renderTimeline();
  renderConsequence();
  renderExpected();
  renderAfterDecision();
  renderSettings();
  const active = state.status === 'active';
  $('[data-action="build"]').disabled = !canBuild(state, config);
  $('[data-action="test"]').disabled = !canTest(state, config);
  $('[data-action="stop"]').disabled = !active;
  $('[data-action-heading]').textContent = active ? `Choose at week ${state.week}` : 'This project has ended';
  const warning = $('[data-action-warning]');
  warning.hidden = !active || state.week < latestStart(config);
  warning.textContent = state.week === latestStart(config)
    ? 'Last feasible start: testing once more will remove the option to complete development.'
    : 'The build window is closed. Testing can still produce evidence, but it cannot restore this opportunity.';
}

function finishRun() {
  completedRuns.push({ projectId, reliability: config.reliability, testCost: config.testCost, deadline: config.deadline, successIfViable: config.successIfViable, actions: [...actions], net: state.net });
}

$$('[data-action]').forEach((button) => button.addEventListener('click', () => {
  const action = button.dataset.action;
  const before = state;
  const values = actionValues(state, config);
  if (action === 'test') state = takeAction(state, 'test', config, { viable: scenario.viable, draw: scenario.tests[state.tests.length] });
  else if (action === 'build') state = takeAction(state, 'build', config, { viable: scenario.viable, executionDraw: scenario.execution });
  else state = takeAction(state, 'stop', config);
  lastAction = { action, before, after: state, values };
  actions.push(action[0].toUpperCase() + action.slice(1));
  revealed = false;
  if (state.status !== 'active') finishRun();
  render();
}));

function resetProject(newProject = false) {
  if (newProject) { projectId += 1; scenario = scenarioFor(config); }
  state = start(config);
  lastAction = null;
  actions = [];
  revealed = false;
  $('[data-optional-replay]').open = false;
  $('[data-batch-results]').hidden = true;
  render();
  $('[data-action-heading]').scrollIntoView({ behavior: 'smooth', block: 'center' });
}

$('[data-replay-same]').addEventListener('click', () => resetProject());
$('[data-replay-other]').addEventListener('click', () => resetProject(true));
$('[data-reveal-project]').addEventListener('click', () => {
  revealed = !revealed;
  $('[data-reveal-project]').textContent = revealed ? 'Hide the hidden project' : 'Reveal the hidden project';
  renderAfterDecision();
});

for (const [attribute, property] of [['reliability', 'reliability'], ['test-cost', 'testCost'], ['deadline', 'deadline'], ['execution', 'successIfViable']]) {
  $$(`[data-${attribute}]`).forEach((button) => button.addEventListener('click', () => {
    const value = Number(button.dataset[property === 'successIfViable' ? 'execution' : property]);
    config = property === 'successIfViable' ? { ...config, successIfViable: value, successIfNotViable: 1 - value } : { ...config, [property]: value };
    resetProject();
  }));
}

function renderSamples() {
  const gains = sampledFutures.filter((outcome) => outcome.succeeded).length;
  const losses = sampledFutures.length - gains;
  const marks = (count) => `${Array.from({ length: Math.min(count, 16) }, () => '<span aria-hidden="true"></span>').join('')}${count > 16 ? `<span class="mark-overflow">+${count - 16}</span>` : ''}`;
  $('[data-sample-gains]').innerHTML = marks(gains);
  $('[data-sample-losses]').innerHTML = marks(losses);
  $('[data-sample-gains]').parentElement.setAttribute('aria-label', `Successful build: ${gains} of ${sampledFutures.length} sampled projects`);
  $('[data-sample-losses]').parentElement.setAttribute('aria-label', `Failed build: ${losses} of ${sampledFutures.length} sampled projects`);
  $('[data-sample-feedback]').textContent = sampledFutures.length ? `${gains} successful · ${losses} failed across ${sampledFutures.length} independently sampled ${sampledFutures.length === 1 ? 'project' : 'projects'}.` : 'No futures sampled yet.';
  $('[data-sample-future]').textContent = sampledFutures.length ? 'Sample another future →' : 'Sample a future →';
}

$('[data-sample-future]').addEventListener('click', () => {
  sampledFutures.push(runExampleStrategy(scenarioFor(config), 'build-now', config));
  renderSamples();
});
$('[data-reset-samples]').addEventListener('click', () => { sampledFutures = []; renderSamples(); });

function distributionMarkup(label, nets) {
  const result = summarizeNets(nets);
  const total = nets.length;
  return `<div class="distribution-row"><strong>${label}</strong><div class="distribution-bar" role="img" aria-label="${result.gain} gains, ${result.smallLoss} small losses, ${result.largeLoss} large losses out of ${total} projects"><span class="distribution-gain" style="width:${result.gain / total * 100}%"></span><span class="distribution-small-loss" style="width:${result.smallLoss / total * 100}%"></span><span class="distribution-large-loss" style="width:${result.largeLoss / total * 100}%"></span></div><p>${result.gain} gains · ${result.smallLoss} losses under $60k · ${result.largeLoss} losses of $60k+ <span>Average ${money(result.average)}</span></p></div>`;
}

$('[data-sample-batch]').addEventListener('click', () => {
  const scenarios = Array.from({ length: 100 }, () => scenarioFor(config));
  const cache = new Map();
  const nets = (strategy) => scenarios.map((sampled) => runExampleStrategy(sampled, strategy, config, cache).net);
  const results = $('[data-batch-results]');
  results.innerHTML = `<p class="batch-key"><span>Gain</span><span>Loss under $60k</span><span>Loss $60k+</span></p>${distributionMarkup('Build now', nets('build-now'))}${distributionMarkup('Test once; build after positive', nets('test-once'))}${distributionMarkup('Adaptive · choose from current evidence', nets('adaptive'))}`;
  results.hidden = false;
});

render();
renderSamples();
