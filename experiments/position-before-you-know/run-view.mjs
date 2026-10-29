import {actionHistory, comparisonChange} from './run-history.mjs';
import {ARRIVAL, START, POSTS, createRun, advanceRun, reach, runOutcome} from './run-model.mjs';

const $ = id => document.getElementById(id);
const NS = 'http://www.w3.org/2000/svg';
let state = createRun();
let prior = null;
const xy = p => ({x:70 + p.x * 5.6, y:60 + p.y * 5});
const point = p => `${xy(p).x},${xy(p).y}`;
function shape(tag, attrs, parent) {
  const element = document.createElementNS(NS, tag);
  for (const [key, value] of Object.entries(attrs)) element.setAttribute(key, value);
  parent.append(element);
  return element;
}
function describe(s) {
  const result = runOutcome(s);
  const commitment = actionHistory(s);
  return `${s.story === 'near' ? 'Near' : 'Far'}-post cross · ${commitment}. ${result.arrived ? 'Reached the cross' : `${result.gap.toFixed(1)} units short`}.`;
}
function render() {
  const remaining = ARRIVAL - state.time;
  const finished = remaining === 0;
  $('run-view').classList.toggle('run-complete',finished);
  $('run-actions').hidden=finished;
  const result = runOutcome(state);
  const player = xy(state.player);
  const actual = POSTS[state.story];
  const cues = [
    'The teammate is preparing a cross. Either receiving space is still possible.',
    `The teammate shapes toward the ${state.story} post. The ball is not yet in flight.`,
    `The cross is now in flight toward the ${state.story} post. Its direction is clear.`,
    `The ball is approaching the ${state.story} post. One second remains.`,
    `The cross has arrived at the ${state.story} post.`
  ];
  $('run-cue').textContent = cues[state.time];
  $('run-clock-label').textContent = `${state.time} / ${ARRIVAL} model seconds · ${remaining} s left to arrive`;
  [...$('run-ticks').children].forEach((tick,index) => tick.classList.toggle('elapsed',index <= state.time));
  $('run-reach-area').replaceChildren();
  if (!finished) shape('ellipse', {cx:player.x, cy:player.y, rx:remaining*10*5.6, ry:remaining*10*5, class:'reach-area'}, $('run-reach-area'));
  $('striker').setAttribute('transform', `translate(${player.x} ${player.y})`);
  $('run-current-path').replaceChildren();
  shape('polyline', {points:state.path.map(point).join(' '), class:'route'}, $('run-current-path'));
  const initial = xy(START);
  shape('circle', {cx:initial.x,cy:initial.y,r:7,class:'run-start-marker'}, $('run-current-path'));
  $('run-prior-path').replaceChildren();
  if (prior) {
    shape('polyline', {points:prior.path.map(point).join(' '),class:'old-route'}, $('run-prior-path'));
    const end = xy(prior.player);
    shape('circle', {cx:end.x,cy:end.y,r:29,class:'ghost'}, $('run-prior-path'));
  }
  $('run-reach-summary').replaceChildren();
  for (const post of ['near','far']) {
    const option = reach(state,post);
    const outcome = Math.abs(option.margin) < 1e-9 ? 'boundary' : option.reachable ? 'reachable' : 'short';
    const label = option.reachable ? (outcome==='boundary' ? 'Exactly reachable' : 'Still reachable') : 'Out of reach';
    $(post+'-post').dataset.outcome = outcome;
    $(post+'-availability').textContent = `${option.reachable ? '✓' : '△'} ${label}`;
    const span = document.createElement('span');
    span.className='consequence-chip'; span.dataset.outcome=outcome;
    span.textContent=`${post==='near'?'Near':'Far'} post: ${label.toLowerCase()}`;
    $('run-reach-summary').append(span);
  }
  // Only show the part of the ball's flight observed by the current step.
  const fraction = Math.max(0,(state.time-1)/3);
  const kicker={x:82,y:6};
  const ball=xy({x:kicker.x+(actual.x-kicker.x)*fraction,y:kicker.y+(actual.y-kicker.y)*fraction});
  $('cross-ball').setAttribute('cx',ball.x); $('cross-ball').setAttribute('cy',ball.y);
  $('cross-ball-center').setAttribute('cx',ball.x); $('cross-ball-center').setAttribute('cy',ball.y);
  $('cross-ball-halo').setAttribute('cx',ball.x); $('cross-ball-halo').setAttribute('cy',ball.y);
  const inFlight = state.time >= 2;
  for (const id of ['cross-flight','cross-flight-halo','cross-direction','cross-ball-halo','flight-key']) $(id).toggleAttribute('hidden',!inFlight);
  $('cross-preparation').toggleAttribute('hidden',state.time!==1);
  const kickPoint=xy(kicker), destination=xy(actual);
  const distance=Math.hypot(destination.x-kickPoint.x,destination.y-kickPoint.y);
  const hint={x:kickPoint.x+(destination.x-kickPoint.x)*27/distance,y:kickPoint.y+(destination.y-kickPoint.y)*27/distance};
  $('cross-preparation').setAttribute('d',`M${kickPoint.x},${kickPoint.y}L${hint.x},${hint.y}`);
  const trail=`M${point(kicker)}L${ball.x},${ball.y}`;
  $('cross-flight').setAttribute('d',trail); $('cross-flight-halo').setAttribute('d',trail);
  const x=destination.x,y=destination.y,r=35,c=11;
  $('cross-destination-brackets').setAttribute('d',`M${x-r},${y-r+c}v-${c}h${c} M${x+r-c},${y-r}h${c}v${c} M${x+r},${y+r-c}v${c}h-${c} M${x-r+c},${y+r}h-${c}v-${c}`);
  $('cross-direction-label').setAttribute('x',x+45);
  $('cross-direction-label').setAttribute('y',y+6);
  $('cross-direction-label').replaceChildren();
  if (finished) $('cross-direction-label').textContent='Ball here';
  else {
    const first=shape('tspan',{x:x+45,y:y-3},$('cross-direction-label'));first.textContent='Heading ';
    const second=shape('tspan',{x:x+45,y:y+22},$('cross-direction-label'));second.textContent='here';
  }
  $('run-pitch-desc').textContent=`${cues[state.time]} ${state.time>=2?'Blue trail and corner marks show the observed cross direction; target colors show your reachability. ':''}Your position: ${state.player.x.toFixed(1)} forward, ${state.player.y.toFixed(1)} across. ${remaining} seconds remain. Near post ${reach(state,'near').reachable?'reachable':'out of reach'}; far post ${reach(state,'far').reachable?'reachable':'out of reach'}.`;
  $('run-near').textContent=(state.direction==='far'?'Change run toward near post (+1 s)':'Run toward near post (+1 s)');
  $('run-far').textContent=(state.direction==='near'?'Change run toward far post (+1 s)':'Run toward far post (+1 s)');
  $('run-advance').textContent=state.direction?'Continue run (+1 s)':'Let play develop (+1 s)';
  for (const id of ['run-near','run-far','run-advance']) $(id).disabled=finished;
  $('run-action-note').textContent=finished?'The cross has arrived. Retry the same cross to change your actions.':state.direction?`You are running toward the ${state.direction} post. Continue, or change direction with the other run button.`:'You stay central until you choose a run. Each step uses one second of the time available.';
  $('run-result').hidden=!finished;
  $('run-takeaway').hidden=!finished;
  $('run-alternate').hidden=!finished;
  $('run-alternate').textContent=`Switch to a ${state.story==='near'?'far':'near'}-post cross`;
  $('run-result-history').textContent=`Your actions: ${actionHistory(state)}`;
  if (finished) {
    $('run-result').dataset.outcome=result.arrived?'reachable':'short';
    $('run-result-title').textContent=result.arrived?'✓ You are there for the cross.':'△ The cross arrives beyond your reach.';
    $('run-result-detail').textContent=result.arrived?`You reached the ${state.story} post. Starting the run at ${state.committedAt} s gave you enough time; receiving or scoring is not guaranteed.`:`You are ${result.gap.toFixed(1)} pitch units from the receiving space when the cross arrives. ${state.committedAt===null?'You kept your initial position.':`Your first run began at ${state.committedAt} s.`}`;
    const target=xy(actual);
    if (!result.arrived) {
      shape('path',{d:`M${player.x},${player.y}L${target.x},${target.y}`,class:'run-shortfall'},$('run-current-path'));
    }
  }
  $('run-comparison').hidden=!prior;
  if (prior) {
    const heading=document.createElement('h3');heading.textContent='Compare with your previous completed run';
    const before=document.createElement('p');before.textContent=`Previous: ${describe(prior)}`;
    const after=document.createElement('p');after.textContent=finished?`This run: ${describe(state)}`:`This run: ${state.story}-post cross · ${state.time} s elapsed. Still in progress.`;
    const fixed=document.createElement('p');fixed.className='small';fixed.textContent=prior.story===state.story?'Same cross, cues, starting position, speed, and deadline. Your actions and their timing can differ.':'Different cross: the destination and cues changed. Starting position, speed, and deadline stay fixed.';
    const change=document.createElement('p');change.className='run-comparison-change';
    change.textContent=finished?comparisonChange(prior,state):'';
    change.hidden=!change.textContent;
    $('run-comparison').replaceChildren(heading,before,after,change,fixed);
  }
}
function step(choice=null) {
  state=advanceRun(state,choice);
  render();
  $('run-announcement').textContent=`${$('run-cue').textContent} ${$('run-reach-summary').textContent}`;
  if (state.time===ARRIVAL) $('run-result').focus({preventScroll:true});
  keepMobilePlayVisible();
}
$('run-near').addEventListener('click',()=>step('near'));
$('run-far').addEventListener('click',()=>step('far'));
$('run-advance').addEventListener('click',()=>step());
function reset(alternate=false) {
  if (state.time===ARRIVAL) prior=state;
  const story=alternate?(state.story==='near'?'far':'near'):state.story;
  state=createRun(story);render();
  $('run-reset-note').textContent=alternate?'Cross switched: destination and cues changed; time and movement reset. The saved run stays labeled with its original cross.':'Same cross and cues; time and movement reset. Your completed run is kept for comparison. You now know the outcome, so this compares timing and movement, not foresight.';
  $('run-announcement').textContent=$('run-reset-note').textContent;
  $('run-advance').focus({preventScroll:true});
  keepMobilePlayVisible();
}
$('run-replay').addEventListener('click',()=>reset());
$('run-alternate').addEventListener('click',()=>reset(true));

function selectView(focus=false) {
  const run=location.hash==='#run';
  $('position-view').hidden=run; $('run-view').hidden=!run;
  document.body.classList.toggle('run-active',run);
  for (const [id,selected] of [['position-link',!run],['run-link',run]]) {
    if (selected) $(id).setAttribute('aria-current','page'); else $(id).removeAttribute('aria-current');
  }
  document.querySelector('.intro > p:last-child').textContent=run?'You are waiting for a cross. Keep both posts possible, then decide when to make your run.':'Your teammate is about to pass. You can support the attack, but possession could change. Where would you stand?';
  if (focus) {
    const heading=$(run?'run-question':'question');
    heading.setAttribute('tabindex','-1');heading.focus({preventScroll:true});heading.scrollIntoView({block:'start'});
  }
}
window.addEventListener('hashchange',()=>selectView(true));
render();selectView();

const narrowLayout = matchMedia('(max-width: 760px)');
const responsiveNodes = [
  ['run-cue', 'run-mobile-context'],
  ['run-step-rules', 'run-mobile-context'],
  ['run-actions', 'run-mobile-controls']
].map(([id, destination]) => {
  const node = $(id);
  const marker = document.createComment(`Original location of ${id}`);
  node.before(marker);
  return {node, marker, destination: $(destination)};
});
function layoutRunControls() {
  for (const {node, marker, destination} of responsiveNodes) {
    if (narrowLayout.matches) destination.append(node);
    else marker.after(node);
  }
}
narrowLayout.addEventListener('change', layoutRunControls);
layoutRunControls();

function keepMobilePlayVisible() {
  if (!narrowLayout.matches) return;
  const context = $('run-mobile-context').getBoundingClientRect();
  const controls = $('run-mobile-controls').getBoundingClientRect();
  if (context.top < 0 || controls.bottom > innerHeight) {
    const pitch = $('run-pitch').getBoundingClientRect();
    const anchor = controls.bottom - context.top + 16 <= innerHeight ? context : pitch;
    window.scrollTo({top: Math.max(0, window.scrollY + anchor.top - 8), behavior: 'instant'});
  }
}
