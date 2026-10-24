import {DURATION,SCENARIOS,QUESTIONS,OPTIONS,createRun,viewAt,start,pause,advance,ask,decide,openingRadius} from './clarity-model.mjs?v=two-offers-1';
const $=s=>document.querySelector(s);
const set=(selector,text)=>{const el=$(selector);if(el.textContent!==text)el.textContent=text;};
let run=createRun(),review=false,replayTime=0,last=0,paint=0;
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
$('#conversations').innerHTML=QUESTIONS.map(q=>`<div class="conversation"><button id="ask-${q.id}" data-ask="${q.id}">${q.label}</button><p class="question">${q.question}</p><progress id="conversation-progress-${q.id}" class="conversation-progress" max="1" value="0" aria-label="${q.label}: progress toward an answer" hidden></progress><p id="answer-${q.id}" class="answer"></p></div>`).join('');
$('#decisions').innerHTML=OPTIONS.map(o=>`<div class="decision-option"><button id="choose-${o.id}" data-choice="${o.id}">${o.name}</button><p>${o.terms}</p><small id="deadline-${o.id}"></small></div>`).join('');
function sync(){const now=performance.now();if(run.running&&last)advance(run,(now-last)/1000);last=now;}
function render(){
 const scenario=SCENARIOS[run.index],time=review?replayTime:run.time,s=viewAt(run,time),available=s.options.filter(o=>o.available);
 $('#previous').disabled=run.index===0;
 $('.inquiries').hidden=!run.started; $('.choices').hidden=!run.started;
 $('#replay').hidden=!run.started; $('#reset').hidden=!run.started; $('#previous').hidden=run.index===0;
 set('#inquiry-title',s.evidence.length?'What else would you like to know?':'What would you like to ask?');
 set('#stage-label',`Scenario ${run.index+1} of 3`);set('#stage-title',run.index===0?'An offer to consider':'The same offer, another conversation');
 set('#time-label',`${Math.floor(time)}s${review?' · Replay':run.ended?' · Finished':run.running?'':run.started?' · Paused':' · Ready'}`);
 $('#progress').value=time;
 const playLabel=run.running?'Pause':run.ended?'Finished':run.started?'Resume':'Start';
 set('#play-label',playLabel);set('#play-icon',run.running?'❚❚':'▶');$('#play').setAttribute('aria-label',playLabel);
 $('#play').disabled=review||!!run.ended;
 $('#replay').disabled=!run.started;set('#replay',review?'Return to run':'Inspect replay');
 $('#replay-panel').hidden=!review;$('#scrub').max=run.time;$('#scrub').value=time;
 set('#scrub-label',`Replay what happened · ${time.toFixed(1)}s`);
 const incoming=!review&&run.pending?Math.min(.85,(run.time-run.pending.started)/scenario.conversation):0;
 const clarity=(s.evidence.length+(reduced.matches?0:incoming))/2;
 $('#blur').setAttribute('stdDeviation',String(8*(1-clarity)));$('#fog').style.opacity=String(.96*(1-clarity));$('#mist-lines').style.opacity=String(.5*(1-clarity));
 set('#fact-0','Broad ownership');$('#fact-0').classList.add('known');
 QUESTIONS.forEach((q,i)=>{const e=s.evidence.find(e=>e.id===q.id);set(`#fact-${i+1}`,e?.short||'Not yet known');$(`#fact-${i+1}`).classList.toggle('known',!!e);});
 let radiusTime=time;
 if(reduced.matches)radiusTime=[0,...scenario.deadlines].filter(t=>t<=time).at(-1);
 const radius=openingRadius(scenario,radiusTime);
 $('#aperture-cutout').style.r=`${radius}px`;$('#opening-edge').style.r=`${radius}px`;$('#initial-opening').style.opacity=time>0?'.35':'0';
 const positions=available.length===2?[[180,130],[180,213]]:[[180,175]];
 let active=0;const outside=[[58,65],[302,285]];
 s.options.forEach((o,i)=>{const [x,y]=o.available?positions[active++]:outside[i],el=$(`#format-${o.id}`);el.style.transform=`translate(${x}px,${y}px)`;el.classList.toggle('closed',!o.available);});
 set('#clarity-caption',s.evidence.length===2?(run.story==='fit'?'This sounds like a team you could join.':'This sounds familiar—for the wrong reasons.'):s.evidence.length?s.evidence[0].short:'The project sounds good. What about the job?');
 set('#clarity-sub',s.evidence.length===2?'You have heard from the manager and a teammate.':(run.started?'A conversation might fill in the gaps.':'You haven’t met your future colleagues yet.'));
 set('#knowledge-desc',`Broad ownership. Evidence obtained: ${s.evidence.map(e=>e.short).join('; ')||'none yet'}.`);
 set('#option-caption',available.length===2?'Two offers: more support, or more ownership.':available.length===1?'Only the original role remains.':'The offer has closed.');
 set('#option-sub',available.length===2?`The smaller role with a mentor is available until ${scenario.deadlines[0]}s.`:available.length===1?`The team has finalized staffing. The smaller role is gone; you can still accept the original job until ${scenario.deadlines[1]}s.`:'They’ve filled the role. Neither offer can be accepted now.');
 set('#opportunity-desc',`Available: ${available.map(o=>o.label).join(', ')||'none'}.`);
 QUESTIONS.forEach(q=>{
  const e=s.evidence.find(e=>e.id===q.id),pending=!review&&run.pending?.id===q.id;
  const progress=$(`#conversation-progress-${q.id}`);
  progress.hidden=!pending||!!run.ended;
  progress.value=pending?Math.min(1,(run.time-run.pending.started)/scenario.conversation):0;
  progress.setAttribute('aria-valuetext',run.running?'Waiting for an answer':'Conversation paused');
  $(`#ask-${q.id}`).disabled=review||!!run.ended||!!run.pending||!!e;
  set(`#ask-${q.id}`,e?`${q.topic} · answered`:pending?(run.ended?'Answer not received':'Conversation underway…'):q.label);
  set(`#answer-${q.id}`,e?e.quote:!review&&run.ended&&!pending?'No conversation was completed.':pending&&run.ended?'The run ended before this answer arrived.':pending?`Answer in about ${Math.max(0,Math.ceil(run.pending.due-run.time-.001))}s${run.running?'':'; paused'}.`:review?'You had not received this answer.':`${scenario.conversation}s to hear back. The offer keeps changing.`);
 });
 s.options.forEach(o=>{
  $(`#choose-${o.id}`).disabled=review||!!run.decision||run.ended==='closed'||!o.available;
  set(`#choose-${o.id}`,o.available?o.name:`${o.label} — no longer available`);
  set(`#deadline-${o.id}`,o.available?`Available until ${o.deadline}s`:o.id==='shape'?`The opportunity clock moved on: staffing was finalized at ${o.deadline}s.`:`The opportunity clock ran out: the role was filled at ${o.deadline}s.`);
  $(`#choose-${o.id}`).parentElement.classList.toggle('expired',!o.available);
 });
 $('#decline').disabled=review||!!run.decision||run.ended==='closed';
 let message=!run.started?'Take a moment. When you’re ready, step into the conversation.':s.evidence.length===2?(run.story==='fit'?'You like what you’ve heard. Would you join?':s.options[0].available?'The full role may not suit you. Would a smaller role with a mentor?':'You don’t have to say yes just because they made an offer.'):'You can ask another question, or give them your answer.';
 if(run.pending&&!run.ended)message=`Waiting for the ${run.pending.id==='manager'?'manager':'teammate'}. You can still decide before the answer arrives.`;
 if(run.ended==='closed')message='The recruiter calls: they’ve filled the role.';
 if(run.ended==='limit')message='The minute ended. The remaining offer is still yours to accept or decline.';
 if(run.decision)message=`${run.decision.name} at ${run.decision.time.toFixed(1)}s.`;
 if(review)message='Untimed replay: only answers you actually received are shown.';
 set('#change',message);
 const expired=s.options.filter(o=>!o.available).map(o=>o.label).join(', ');
 set('#updates',`${s.evidence.map(e=>`${QUESTIONS.find(q=>q.id===e.id).topic}: ${e.short}.`).join(' ')}${expired?` Windows closed: ${expired}.`:''}`);
 set('#decision-note',review?(run.ended?'Return to your completed run, or start again.':'Return to your paused run, or start again.'):run.ended?'Inspect what happened, then try the next scenario.':(run.started?'Take your time reading—Pause is always here.':'Up to a minute. You can pause whenever you like.'));
 $('#ending').hidden=!run.ended;
 if(run.ended){
  set('#scenario-reveal',scenario.name);set('#scenario-context',scenario.description);
  set('#result-title',run.decision?`${run.decision.name} · ${run.decision.time.toFixed(1)}s`:run.ended==='closed'?'The opportunity closed':'The minute is over');
  const facts=run.decision?.evidence||run.evidence;
  const heard=id=>facts.some(e=>e.id===id);
  const mentoring=run.story==='fit'?'you’d have regular mentoring':'there would be no regular mentor';
  const hours=run.story==='fit'?'working hours were predictable':'late evenings were part of most weeks';
  const learned=facts.length===2?`You learned that ${mentoring} and ${hours}.`:heard('manager')?`You learned that ${mentoring}, but hadn’t heard what a normal working week was like.`:heard('teammate')?`You learned that ${hours}, but hadn’t heard who would help you grow.`:'The project still sounded exciting, but you hadn’t yet heard about mentoring or everyday life on the team.';
  const outcome=run.decision?.terms||(run.ended==='closed'?'The recruiter gets back to you: they’ve filled the role before you gave them an answer.':'The minute is up, and the original offer is still on the table.');
  set('#result-copy',`${outcome} ${learned}${run.pending?' You were still waiting for one more answer.':''}`);
  const remaining=viewAt(run).options.filter(o=>o.available).length;
  const reflection=run.ended==='closed'?(facts.length===2?(run.story==='fit'?'The job sounded closer to what you wanted. By then, though, the chance to take it had gone.':'What you heard gave you reasons to walk away. The offer has closed, but learning more didn’t have to lead to a yes.'):'The offer moved faster than the conversations. It closed with questions still open.'):
   run.ended==='limit'?'You can still accept the original role or decline. The smaller role with a mentor is no longer available.':
   run.decision.id==='decline'?'You chose to walk away while the offer was still yours to consider.':
   remaining===2?'Both versions of the job were still open when you chose.': 'By the time you chose, the smaller role with a mentor was no longer available.';
  set('#result-comparison',reflection);
 }
 set('#next',run.index<2?'Try the same offer with different timing →':'Try the three versions again');
 const events=[...s.evidence.map(e=>({at:e.at,label:`${QUESTIONS.find(q=>q.id===e.id).topic} answered`})),...s.options.filter(o=>!o.available).map(o=>({at:o.deadline,label:`${o.label} closed`}))].sort((a,b)=>a.at-b.at);
 const eventText=events.map(e=>`${e.at.toFixed(1)}s — ${e.label}`).join('\n')||'No answer or deadline reached yet.';
 set('#replay-events',eventText);
}
function reset(index=run.index,story=run.story){run=createRun(index,story);review=false;replayTime=0;last=0;set('#story-note','');render();}
function tick(){const active=run.running;sync();const now=performance.now();if(active&&(now-paint>100||run.ended)){paint=now;render();}requestAnimationFrame(tick);}
$('#play').addEventListener('click',()=>{sync();run.running?pause(run):start(run);render();});
$('#reset').addEventListener('click',()=>reset());
$('#replay').addEventListener('click',()=>{sync();pause(run);review=!review;replayTime=run.time;render();if(review)$('#scrub').focus();});
$('#scrub').addEventListener('input',e=>{replayTime=Number(e.target.value);render();});
$('#conversations').addEventListener('click',e=>{const b=e.target.closest('[data-ask]');if(!b||b.disabled)return;sync();if(run.ended){render();return;}ask(run,b.dataset.ask);render();});
function choose(id){sync();if(run.decision||run.ended==='closed'){render();return;}const s=viewAt(run);if(id!=='decline'&&!s.options.find(o=>o.id===id)?.available){render();return;}decide(run,id);render();$('#ending').focus();}
$('#decisions').addEventListener('click',e=>{const b=e.target.closest('[data-choice]');if(b&&!b.disabled)choose(b.dataset.choice);});
$('#decline').addEventListener('click',()=>choose('decline'));
$('#next').addEventListener('click',()=>{reset((run.index+1)%3);$('#stage-title').focus();});
$('#alternate').addEventListener('click',()=>{reset(run.index,run.story==='fit'?'mismatch':'fit');set('#story-note','Same offer, different people. What will you hear this time?');$('#stage-title').focus();});
$('#previous').addEventListener('click',()=>{reset(Math.max(0,run.index-1));$('#stage-title').focus();});
document.addEventListener('visibilitychange',()=>{if(document.hidden){sync();pause(run);render();}});
render();requestAnimationFrame(tick);
