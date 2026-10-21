import {
  ANALYST_HOURLY_COST, MODEL, breakEvenFalseDeclineCost, costComponents, countOutcomes,
  errorCost, preferred, reviewProjection, reviewWorkload, sampleOutcomes,
} from './model.mjs';
import { createJourney, updateJourney } from './journey.mjs';

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const money = (amount) => `$${Math.round(amount).toLocaleString('en-US')}`;
const number = (amount) => Math.round(amount).toLocaleString('en-US');
const samples = { A: sampleOutcomes('A'), B: sampleOutcomes('B') };
const focusedIndices = samples.A.flatMap((outcome, index) =>
  outcome !== 'correct' || samples.B[index] !== 'correct' ? [index] : []);
const colors = { correct: '#b9c0b8', missed: '#aa5742', declined: '#bf8b3f' };
const costScale = Math.max(...Object.values(MODEL).map((model) => errorCost(model, 700)));
const stageTitles = ['#opening-title', '#reveal-title', '#cost-title', '#review-title', '#decision-title'];
let state = createJourney();

function dispatch(action) {
  state = updateJourney(state, action);
  render();
}

function pressOne(selector, attribute, value) {
  $$(selector).forEach((button) => {
    button.setAttribute('aria-pressed', String(button.dataset[attribute] === value));
  });
}

function renderCarry() {
  const carry = $('[data-carry]');
  carry.hidden = state.stage === 0;
  if (carry.hidden) return;
  $('[data-carry-choice]').textContent = state.choice === 'unsure'
    ? 'First choice: wait for more information.'
    : `First choice: Model ${state.choice}.`;
  const costPreference = preferred(state.declineCost);
  const costSummary = costPreference === 'tie'
    ? `At ${money(state.declineCost)} per false decline, estimated model + error costs tie.`
    : `At ${money(state.declineCost)} per false decline, Model ${costPreference} has the lower estimated model + error cost.`;
  const summaries = [
    null,
    ['Same 10,000 transactions and model costs.', 'Now reveal the kinds of error.'],
    [`Model A misses ${MODEL.A.missed} fraud cases and falsely declines ${MODEL.A.falseDeclines} legitimate payments. Model B misses ${MODEL.B.missed} fraud cases and falsely declines ${MODEL.B.falseDeclines} legitimate payments.`, 'Now give those errors consequences.'],
    [costSummary, 'Now include the person reviewing alerts.'],
    ['One alert suggests different review effort; the workload figure is a projection, not a measurement.', 'Now choose what information is worth pursuing.'],
  ];
  $('[data-carry-constant]').textContent = summaries[state.stage][0];
  $('[data-carry-new]').textContent = summaries[state.stage][1];
}

function drawMatrix(key) {
  const canvas = $(`[data-transactions="${key}"]`);
  const context = canvas.getContext('2d');
  const outcomes = samples[key];
  const focus = state.outcomeFilter === 'errors';
  const indices = focus ? focusedIndices : outcomes.map((_, index) => index);
  canvas.height = focus ? 100 : 225;
  context.clearRect(0, 0, canvas.width, canvas.height);
  indices.forEach((index, position) => {
    const outcome = outcomes[index];
    const x = focus ? 34 + position * 53 : (position % 100) * 8 + 4;
    const y = focus ? 49 : Math.floor(position / 100) * 18 + 30;
    context.fillStyle = colors[outcome];
    const size = focus ? 10 : 3.25;
    if (outcome === 'missed') {
      context.beginPath();
      context.moveTo(x, y - size);
      context.lineTo(x + size, y);
      context.lineTo(x, y + size);
      context.lineTo(x - size, y);
      context.closePath();
      context.fill();
    } else if (outcome === 'declined') {
      context.fillRect(x - size, y - size, size * 2, size * 2);
    } else {
      context.beginPath();
      context.arc(x, y, focus ? 5 : 2.25, 0, Math.PI * 2);
      context.fill();
    }
  });
  const counts = countOutcomes(outcomes);
  const viewDescription = focus
    ? `${focusedIndices.length} transactions where at least one model erred; gray means this model was correct`
    : 'all 1,000 transactions at matching positions';
  canvas.setAttribute('aria-label', focus
    ? `Model ${key}, ${viewDescription}: ${counts.missed} missed fraud, ${counts.declined} false declines in the sample.`
    : `Model ${key}, ${viewDescription}: ${counts.correct} correct predictions in the sample. Use Look at the errors to compare the mistake types.`);
  $(`[data-sample-counts="${key}"]`).textContent = focus
    ? `${counts.missed} missed · ${counts.declined} false declines`
    : `${counts.correct} correct / 1,000`;
}

function renderMatrices() {
  if (!state.prediction) return;
  $$('[data-panel-model]').forEach((panel) => {
    panel.hidden = state.view !== 'compare' && panel.dataset.panelModel !== state.view;
  });
  $('[data-matrices]').classList.toggle('single', state.view !== 'compare');
  pressOne('[data-view]', 'view', state.view);
  pressOne('[data-filter]', 'filter', state.outcomeFilter);
  drawMatrix('A');
  drawMatrix('B');
  $('[data-filter-note]').textContent = state.outcomeFilter === 'errors'
    ? `These are the same ${focusedIndices.length} transaction positions in both views, selected because at least one model made an error. Gray means that model got the case right; no outcomes were added.`
    : 'The same transaction positions appear in both models. Look at the errors to compare which mistakes each model makes.';
  const a = countOutcomes(samples.A);
  const b = countOutcomes(samples.B);
  $('[data-error-counts]').hidden = state.outcomeFilter !== 'errors';
  $('[data-error-counts]').textContent = `Across the full 10,000-transaction test, Model A misses ${a.missed * 10} fraud cases and falsely declines ${a.declined * 10} legitimate payments. Model B misses ${b.missed * 10} fraud cases and falsely declines ${b.declined * 10} legitimate payments.`;
  const expectation = { similar: 'You expected similar errors.', different: 'You expected different errors.', unsure: 'You were unsure about the error mix.' }[state.prediction];
  $('[data-prediction-feedback]').hidden = state.outcomeFilter !== 'errors';
  $('[data-prediction-feedback]').textContent = `${expectation} The models make different kinds of mistakes: Model A misses more fraud; Model B falsely declines more valid payments.`;
  $('[data-filter="errors"]').textContent = state.outcomeFilter === 'errors' ? 'Errors only' : 'Look at the errors →';
}

function costRow(key, scale) {
  const model = MODEL[key];
  const parts = costComponents(model, state.declineCost);
  const total = errorCost(model, state.declineCost);
  const segment = (name, amount) => `<span class="${name}" style="width:${(amount / scale * 100).toFixed(3)}%"></span>`;
  return `<div class="cost-row"><div class="cost-heading"><span>Model ${key}</span><strong>${money(total)}</strong></div>
    <div class="cost-track" role="img" aria-label="Model ${key}: ${money(parts.missedFraud)} missed fraud, ${money(parts.falseDeclines)} false declines, ${money(parts.modelRun)} model running cost">
      ${segment('missed', parts.missedFraud)}${segment('declined', parts.falseDeclines)}${segment('model', parts.modelRun)}
    </div><ul class="cost-breakdown"><li>Missed fraud <b>${money(parts.missedFraud)}</b></li><li>False declines <b>${money(parts.falseDeclines)}</b></li><li>Model <b>${money(parts.modelRun)}</b></li></ul></div>`;
}

function renderCosts() {
  $('[data-decline-cost]').textContent = money(state.declineCost);
  $('#decline-cost').value = String(state.declineCost);
  const a = errorCost(MODEL.A, state.declineCost);
  const b = errorCost(MODEL.B, state.declineCost);
  const winner = preferred(state.declineCost);
  const threshold = breakEvenFalseDeclineCost();
  const thresholdPosition = `${threshold / Number($('#decline-cost').max) * 100}%`;
  $('[data-break-even-marker]').style.left = thresholdPosition;
  $('.break-even-zones').style.setProperty('--break-even-position', thresholdPosition);
  $$('[data-cost-zone]').forEach((zone) => {
    zone.dataset.active = String(zone.dataset.costZone === winner);
  });
  $('[data-break-even-label]').textContent = `The models break even at ${money(threshold)} per false decline`;
  $('[data-cost-comparison]').innerHTML = `<p class="comparison-label">Estimated cost / 10,000 transactions</p>
    <p class="comparison-result">${winner === 'tie' ? 'The estimates tie.' : `Model ${winner} costs ${money(Math.abs(a - b))} less <span>per 10,000 transactions, on these assumptions</span>`}</p>
    ${costRow('A', costScale)}${costRow('B', costScale)}`;
}

function workloadRow(key, scale) {
  const workload = reviewWorkload(MODEL[key]);
  return `<div class="workload-row"><div class="workload-row__heading"><span>Model ${key}</span><strong>${number(workload.hours)} analyst-hours</strong></div>
    <div class="workload-track"><span style="width:${(workload.hours / scale * 100).toFixed(2)}%"></span></div>
    <span class="workload-row__formula">${number(workload.alerts)} alerts × ${workload.minutesPerAlert} min per alert ÷ 60</span></div>`;
}

function renderWorkload() {
  const maxHours = Math.max(...Object.values(MODEL).map((model) => reviewWorkload(model).hours));
  const a = reviewWorkload(MODEL.A);
  const b = reviewWorkload(MODEL.B);
  const container = $('[data-workload-comparison]');
  container.innerHTML = workloadRow('A', maxHours) + workloadRow('B', maxHours);
  container.setAttribute('aria-label', `Illustrative projection for 10,000 transactions: Model A has ${a.alerts} alerts at ${a.minutesPerAlert} minutes each, or ${number(a.hours)} analyst-hours; Model B has ${b.alerts} alerts at ${b.minutesPerAlert} minutes each, or ${number(b.hours)} analyst-hours.`);
  const projectedA = errorCost(MODEL.A, state.declineCost) + reviewProjection(MODEL.A);
  const projectedB = errorCost(MODEL.B, state.declineCost) + reviewProjection(MODEL.B);
  $('[data-total-comparison]').innerHTML = `If those case times were typical at ${money(ANALYST_HOURLY_COST)} per analyst-hour, projected model + error + human review cost per 10,000 transactions would be <strong>${money(projectedA)} for Model A</strong> and <strong>${money(projectedB)} for Model B</strong>. This is a sensitivity check, not a measured result.`;
}

function renderDecision() {
  const a = errorCost(MODEL.A, state.declineCost);
  const b = errorCost(MODEL.B, state.declineCost);
  const margin = Math.abs(a - b);
  const reviewDifference = Math.abs(reviewProjection(MODEL.A) - reviewProjection(MODEL.B));
  const costLeader = preferred(state.declineCost);
  const lead = costLeader === 'tie'
    ? 'The model + error estimates tie.'
    : `Model ${costLeader} costs ${money(margin)} less before review.`;
  const initial = state.choice === 'unsure' ? 'Gather more evidence' : `Model ${state.choice}`;
  const possibleChange = state.nextChoice === 'errors'
    ? 'More error cases might change the estimated error mix.'
    : state.nextChoice === 'review'
      ? 'A workload study might replace the one-case review projection.'
      : state.nextChoice === 'deploy'
        ? 'You chose to act on the current evidence; revisit if plausible missing information could reverse the choice.'
        : 'Unmeasured review time or different error rates could still matter.';
  $('[data-decision-summary]').innerHTML = `<div><span>Initial choice</span><strong>${initial}</strong></div>
    <div><span>What you learned</span><strong>Model A misses more fraud; Model B falsely declines more payments.</strong></div>
    <div><span>Current preference on these cost assumptions</span><strong>${lead}</strong></div>
    <div><span>What could change it</span><strong>${possibleChange}</strong></div>
    <p>Same 10,000-transaction test · ${money(state.declineCost)} per false decline. A single review case suggests about ${money(reviewDifference)} difference per 10,000 transactions, but that workload effect has not been measured.</p>`;
  pressOne('[data-next-choice]', 'nextChoice', state.nextChoice);
  $('[data-decision-feedback]').hidden = !state.nextChoice;
  $('[data-open-counterfactual]').hidden = !state.nextChoice || state.counterfactualOpen;
  $('[data-counterfactual]').hidden = !state.counterfactualOpen;
  $('[data-transfer]').hidden = !state.nextChoice;
  if (state.nextChoice) {
    const near = margin <= reviewDifference * 2;
    const feedback = {
      errors: 'More error cases could reveal rare, high-cost mistakes or show that estimated rates are unstable. It helps only if those possibilities could change the comparison.',
      review: near
        ? 'Measuring ordinary review time could resolve a close comparison. The one alert shown above cannot establish the average workload.'
        : 'Measuring review time would replace the single-case projection. On this assumption, though, ask whether a plausible range could overcome the estimated lead.',
      deploy: near
        ? 'Deciding now avoids delay, but the estimated lead is close enough that plausible review effort could reverse it. That is a choice about the value of waiting, not a mathematical error.'
        : 'Deciding now can be reasonable if the test is credible and plausible missing information cannot change the choice. More measurement is not automatically better.',
    };
    $('[data-decision-feedback]').innerHTML = `<strong>What this choice means</strong><p>${feedback[state.nextChoice]}</p>`;
  }
  pressOne('[data-counterfactual-choice]', 'counterfactualChoice', state.counterfactualChoice);
  $('[data-counterfactual-feedback]').hidden = !state.counterfactualChoice;
  if (state.counterfactualChoice) {
    const feedback = {
      errors: 'A larger error sample could reveal whether the estimated error rates hold. It is more valuable here because fewer cases underlie the same percentages.',
      review: 'A real review-time study could replace the one-case projection, although it would not resolve uncertainty in the error rates.',
      deploy: 'Acting now may still be justified if delay is costly. The smaller test simply means more uncertainty remains about the error mix.',
    };
    $('[data-counterfactual-feedback]').textContent = feedback[state.counterfactualChoice];
  }
}

function renderReviews() {
  $$('[data-review]').forEach((button) => {
    const inspected = state.reviews.includes(button.dataset.review);
    button.disabled = inspected;
    button.textContent = inspected ? 'Review steps shown' : 'Reveal the review steps';
    $(`[data-review-result="${button.dataset.review}"]`).hidden = !inspected;
  });
  $('[data-review-projection]').hidden = state.reviews.length < 2;
}

function render() {
  $('.metric-page').classList.toggle('is-compact', state.stage > 0);
  $$('[data-stage]').forEach((element) => { element.hidden = Number(element.dataset.stage) !== state.stage; });
  $$('[data-progress]').forEach((element, index) => {
    if (index === state.stage) element.setAttribute('aria-current', 'step');
    else element.removeAttribute('aria-current');
    element.classList.toggle('complete', index < state.stage);
  });
  $('[data-back]').hidden = state.stage === 0;
  $('[data-continue]').hidden = state.stage === 4;
  $('[data-continue]').disabled = (state.stage === 0 && !state.choice)
    || (state.stage === 1 && !state.prediction)
    || (state.stage === 3 && state.reviews.length < 2);
  $('[data-continue]').textContent = ['Reveal the outcomes →', 'What do the errors cost? →', 'What happens after an alert? →', 'Make a decision →'][state.stage] || '';
  $('[data-transaction-panel]').hidden = !state.prediction;
  pressOne('[data-choice]', 'choice', state.choice);
  $$('[data-model-card]').forEach((card) => { card.dataset.selected = String(card.dataset.modelCard === state.choice); });
  pressOne('[data-error-prediction]', 'errorPrediction', state.prediction);
  renderCarry();
  renderMatrices();
  renderCosts();
  renderWorkload();
  renderReviews();
  renderDecision();
}

$$('[data-choice]').forEach((button) => button.addEventListener('click', () => dispatch({ type: 'choice', value: button.dataset.choice })));
$$('[data-error-prediction]').forEach((button) => button.addEventListener('click', () => {
  dispatch({ type: 'prediction', value: button.dataset.errorPrediction });
  $('[data-transaction-panel]').scrollIntoView({ behavior: 'smooth', block: 'start' });
}));
$$('[data-view]').forEach((button) => button.addEventListener('click', () => dispatch({ type: 'view', value: button.dataset.view })));
$$('[data-filter]').forEach((button) => button.addEventListener('click', () => dispatch({ type: 'filter', value: button.dataset.filter })));
$('#decline-cost').addEventListener('input', (event) => dispatch({ type: 'cost', value: Number(event.target.value) }));
$$('[data-review]').forEach((button) => button.addEventListener('click', () => {
  dispatch({ type: 'review', value: button.dataset.review });
  if (state.reviews.length === 2) $('[data-review-projection]').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}));
$$('[data-next-choice]').forEach((button) => button.addEventListener('click', () => {
  dispatch({ type: 'nextChoice', value: button.dataset.nextChoice });
  $('[data-decision-feedback]').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}));
$('[data-open-counterfactual]').addEventListener('click', () => {
  dispatch({ type: 'openCounterfactual' });
  $('[data-counterfactual]').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});
$$('[data-counterfactual-choice]').forEach((button) => button.addEventListener('click', () => dispatch({ type: 'counterfactualChoice', value: button.dataset.counterfactualChoice })));

function goTo(stage) {
  dispatch({ type: 'stage', stage });
  $(stageTitles[state.stage]).focus();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

$('[data-continue]').addEventListener('click', () => goTo(state.stage + 1));
$('[data-back]').addEventListener('click', () => goTo(state.stage - 1));
$('[data-reset]').addEventListener('click', () => {
  dispatch({ type: 'reset' });
  $('#opening-title').focus();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

render();
