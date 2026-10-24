// Deterministic teaching stories. Time measures the illustration, not real hiring.
export const DURATION = 60;
export const SCENARIOS = [
 {id:'room',name:'They’re holding the role for you',description:'“Meet the team. Ask what you need to ask—we have some room before we finalize the hire.”',conversation:6,deadlines:[32,75]},
 {id:'rush',name:'They need an answer soon',description:'“We’re filling the role this week.” Your future colleagues are busy, and getting a reply takes a little longer.',conversation:14,deadlines:[10,30]},
 {id:'tension',name:'You can talk today. They need an answer soon.',description:'The manager and a teammate can make time for you, but the hiring team is already finalizing the offer.',conversation:6,deadlines:[10,30]},
];
export const QUESTIONS = [
 {id:'manager',label:'Talk to the manager',question:'Who would help me grow?',topic:'Mentoring'},
 {id:'teammate',label:'Talk to a teammate',question:'What does a normal week feel like?',topic:'Working hours'},
];
export const STORIES = {
 fit:{manager:{short:'Regular mentoring',quote:'“We would meet every week. A senior colleague also sets aside time to help you develop.”'},teammate:{short:'Predictable hours',quote:'“We plan around normal working hours. Late evenings are unusual, and we take time back afterward.”'}},
 mismatch:{manager:{short:'No regular mentor',quote:'“You would report to me, but I have twelve direct reports. We do not have regular mentoring time.”'},teammate:{short:'Frequent evenings',quote:'“Most weeks we work late several evenings. That is how the team handles its commitments.”'}},
};
export const OPTIONS = [
 {id:'shape',name:'Accept a smaller role with support',label:'Smaller role with support',outcome:'Accepted the smaller role',terms:'A named mentor and agreed working hours. You would lead a smaller part of the product.',consequence:'You accepted the smaller role. You’ll have a named mentor and agreed working hours, but you won’t lead the whole product.'},
 {id:'join',name:'Accept the original role',label:'Original role',outcome:'Accepted the original role',terms:'Lead the full product, with the mentoring and working hours your conversations reveal.',consequence:'You accepted the original role. You’ll lead the full product, with the team’s existing mentoring arrangements and working hours.'},
];
export function createRun(index=0,story='fit') {
 if(!SCENARIOS[index]||!STORIES[story])throw new Error('Unknown scenario or story');
 return {index,story,time:0,running:false,started:false,pending:null,evidence:[],decision:null,ended:null};
}
export function viewAt(run,time=run.time) {
 if(!Number.isFinite(time)||time<0||time>run.time)throw new RangeError('Replay is limited to the experienced time');
 const scenario=SCENARIOS[run.index];
 return {time,evidence:run.evidence.filter(e=>e.at<=time),options:OPTIONS.map((o,i)=>({...o,deadline:scenario.deadlines[i],available:time<scenario.deadlines[i]}))};
}
export function start(run){if(!run.ended){run.started=true;run.running=true;}return run;}
export function pause(run){run.running=false;return run;}
export function advance(run,seconds){
 if(!Number.isFinite(seconds)||seconds<0)throw new RangeError('Elapsed time must be nonnegative');
 if(!run.running||run.ended)return run;
 const end=Math.min(DURATION,SCENARIOS[run.index].deadlines[1]);
 run.time=Math.min(end,run.time+seconds);
 if(run.pending&&run.pending.due<=run.time){const p=run.pending;run.evidence.push({id:p.id,at:p.due,...STORIES[run.story][p.id]});run.pending=null;}
 if(run.time>=end){run.ended=end<DURATION?'closed':'limit';run.running=false;}
 return run;
}
export function ask(run,id){
 if(!QUESTIONS.some(q=>q.id===id)||run.pending||run.ended||run.evidence.some(e=>e.id===id))throw new Error('Conversation unavailable');
 run.pending={id,started:run.time,due:run.time+SCENARIOS[run.index].conversation};
 // The first conversation starts the clocks. Later conversations preserve a deliberate pause.
 if(!run.started)start(run);
 return run;
}
export function decide(run,id){
 if(run.decision||run.ended==='closed')throw new Error('Run already ended');
 const s=viewAt(run),option=s.options.find(o=>o.id===id);
 if(id!=='decline'&&!option?.available)throw new Error('This offer is unavailable');
 run.decision={id,time:run.time,name:id==='decline'?'Declined the offer':option.outcome,terms:id==='decline'?'You chose not to join.':option.consequence,evidence:s.evidence.map(e=>({...e})),available:s.options.filter(o=>o.available).map(o=>o.label)};
 run.started=true;run.running=false;run.ended='decision';return run;
}
export function openingRadius(scenario,time){
 const knots=[[0,132],[scenario.deadlines[0],78],[scenario.deadlines[1],0]];
 for(let i=1;i<knots.length;i++){const [end,r]=knots[i],[start,prior]=knots[i-1];if(time<=end)return prior+(r-prior)*(time-start)/(end-start);}
 return 0;
}

// A comparison records the actual run, never a replay position or future answers.
export function summarizeRun(run){
 const scenario=SCENARIOS[run.index],state=viewAt(run);
 return {
  index:run.index,story:run.story,time:run.time,started:run.started,ended:run.ended,
  scenario:scenario.name,conversation:scenario.conversation,deadlines:[...scenario.deadlines],
  evidence:(run.decision?.evidence||state.evidence).map(e=>({...e})),
  lost:state.options.filter(o=>!o.available).map(o=>o.label),
  available:state.options.filter(o=>o.available).map(o=>o.label),
  decision:run.decision?{name:run.decision.name,time:run.decision.time,terms:run.decision.terms}:null,
 };
}
