// Browser rendering and CPU scheduling. Rules live in mechanics.js.
(() => {
 const M=GameMechanics,C=GameConfig,D=GameContent,I=GameI18n,t=I.t,$=id=>document.getElementById(id);
 let state=null,seen={},cpuTimer=null;
 const face=['👩🏽','👨🏻','👩🏼'];
 const messages={correct:'Correct! Now choose Eat or Skip.',wrong:'Not quite. That counts as a mistake today.',
 'mistake-out':'Daily mistake limit reached. This player is out.',ate:'Food eaten!',skip:'Skipped. No food allowance used.',
 full:'You already ate three healthy foods today. Choose Skip; surprise snacks are extra.',
 'food-out':'That food broke the food limit. This player is out.',
 'snack-reject':'Correct! That snack is unhealthy. You are still in! Here is a healthy snack to classify.',
 'refused-snack':'You refused the healthy snack. This player is out.'};
 const player=id=>t('Player {id}',{id});
 const control=p=>t(p.controller==='cpu'?'CPU':'Human');
 function settings(){
  const old=[...document.querySelectorAll('.player-row')].map(r=>[r.querySelector('.category').value,r.querySelector('.mode').value,r.querySelector('.controller').value]);
  const options=values=>values.map(([value,key,selected])=>`<option value="${value}" ${selected?'selected':''}>${t(key)}</option>`).join('');
  $('player-settings').innerHTML=Array.from({length:Number($('count').value)},(_,i)=>`<div class="player-row"><strong>${player(i+1)}</strong><label>${t('Control')} <select class="controller" aria-label="${player(i+1)} · ${t('Control')}">${options([['human','Human',i===0],['cpu','CPU',i>0]])}</select></label><label>${t('Category')} <select class="category" aria-label="${player(i+1)} · ${t('Category')}">${options([['baby','baby'],['child','child',true],['adult','adult']])}</select></label><label>${t('Difficulty')} <select class="mode" aria-label="${player(i+1)} · ${t('Difficulty')}">${options([['easy','easy',true],['medium','medium'],['hard','hard']])}</select></label></div>`).join('');
  old.forEach((v,i)=>{const r=document.querySelectorAll('.player-row')[i];if(r){r.querySelector('.category').value=v[0];r.querySelector('.mode').value=v[1];r.querySelector('.controller').value=v[2];}});
 }
 function clearWork(){clearTimeout(cpuTimer);}
 function button(text,fn,cls=''){const b=document.createElement('button');b.textContent=text;b.className=cls;b.disabled=state&&M.current(state).controller==='cpu';b.onclick=()=>{if(M.current(state).controller!=='cpu')fn();};$('actions').append(b);return b;}
 function drawPlayers(){
  $('players').innerHTML=state.players.map((p,i)=>`<div class="player-card p${p.id} ${!p.out&&i===state.turn?'active':''} ${p.out?'out':''}"><div class="avatar"><span>${face[i]}</span><b>${p.id}</b></div><div><strong>${player(p.id)} · ${control(p)} ${p.out?'· '+t('Out'):''}</strong><div class="score">${t('{score} points',{score:p.score})}</div><small>${t('Healthy {count}/3 · Treat {treat}/1',{count:p.healthy,treat:p.unhealthy})}</small><small>${t('Mistakes {count}/{limit}',{count:p.mistakes,limit:C.mistakes[p.mode]})}</small></div></div>`).join('');
 }
 function food(){
  const p=M.current(state),level=D.level(p.category,p.mode),key=p.id;
  const pool=D.foods.filter(f=>f.level<=level&&f.level>=Math.max(0,level-1)&&(!state.snack||!['snack-reject','wrong'].includes(state.event)||f.healthy));
  let choices=pool.filter(f=>!(seen[key]||[]).includes(f.id));
  if(!choices.length){seen[key]=[];choices=pool;}
  const f=choices[Math.floor(Math.random()*choices.length)];(seen[key]??=[]).push(f.id);return f;
 }
 function showFood(meal){const event=state.snack&&['wrong','snack-reject'].includes(state.event)?state.event:null;state={...M.begin(state,food(),meal),event};render();}
 function act(fn){state=fn(state);
  if(state.phase==='ready'&&state.snack){showFood('Surprise snack');return;}
  render();
 }
 function scheduleCPU(){
  clearTimeout(cpuTimer);
  if(!state||state.phase==='finished'||M.current(state).controller!=='cpu')return;
  const expected=state;
  cpuTimer=setTimeout(()=>{
   if(state!==expected)return;
   const action=GameCPU.choose(state);if(!action)return;
   if(action.type==='snack')showFood('Surprise snack');
   else if(action.type==='meal')showFood(action.meal);
   else if(action.type==='answer')act(s=>M.answer(s,action.healthy));
   else if(action.type==='eat')act(M.eat);
   else if(action.type==='skip')act(M.skip);
   else if(action.type==='next'){state=M.next(state);render();}
  },C.cpuDelayMs);
 }
 function render(){
  scheduleCPU();drawPlayers();
  $('dining-table').classList.toggle('has-food',!!state.food);
  $('setup').hidden=true;$('play').hidden=state.phase==='finished';$('results').hidden=state.phase!=='finished';
  $('actions').replaceChildren();$('feedback').textContent=t(messages[state.event]||'');
  if(state.phase==='finished'){
   clearWork();const winners=M.winners(state),players=winners.map(p=>player(p.id)).join(' & ');
   $('results').innerHTML=`<p class="eyebrow">${t('Restaurant closed · Day {day}',{day:state.day})}</p><h2>${winners.length?t(winners.length>1?'{players} share the win!':'{players} wins!',{players}):t('No winner this time')}</h2><p>${t(winners.length?'Well played! Try a new category or difficulty next time.':'Everyone was eliminated. Open the restaurant and try again!')}</p><ol>${[...state.players].sort((a,b)=>b.score-a.score).map(p=>`<li>${player(p.id)}: <strong>${t('{score} points',{score:p.score})}</strong>${p.out?' · '+t('eliminated'):''}</li>`).join('')}</ol><button class="primary" id="again">${t('Play again')}</button>`;
   $('again').onclick=reset;return;
  }
  const p=M.current(state);
  $('status').textContent=t('Day {day} of {days}',{day:state.day,days:state.days})+' · '+(state.snack?t('Snack round'):t('Round {round} of {rounds}',{round:state.round,rounds:C.mealRounds}))+' · '+t('Player {id}’s turn ({control})',{id:p.id,control:control(p)});
  if(state.phase==='ready'){
   $('stage').innerHTML=`<p class="eyebrow">${t(p.category)} · ${t(p.mode)}</p><h2>${t(state.snack?'Surprise snack time!':'Choose your meal')}</h2><p>${state.snack?t('Player {id}, there is no timer. Classify the snack. Unhealthy foods are replaced; once you identify a healthy snack, Eat it to stay in!',{id:p.id}):t('Breakfast, lunch, or dinner—food can appear at any meal.')}</p>`;
   if(state.snack)button(t('Ready for my snack'),()=>showFood('Surprise snack'),'primary');
   else C.meals.forEach(meal=>button(t(meal),()=>showFood(meal),'meal'));
   return;
  }
  const f=state.food;
  $('stage').innerHTML=`<p class="eyebrow">${t(state.meal)} · ${t(p.category)} / ${t(p.mode)}</p><div class="food-label"><h2>${t(f.name)}</h2><p>${t(state.phase==='classify'?'How would you classify this food?':f.explanation)}</p></div><div class="plate"><span role="img" aria-label="${t(f.name)}">${f.emoji}</span></div>`;
  if(state.phase==='classify'){
   button(t('Healthy'),()=>act(s=>M.answer(s,true)),'healthy');button(t('Unhealthy'),()=>act(s=>M.answer(s,false)),'unhealthy');
  } else if(state.phase==='decide'){
   if(!f.healthy)$('feedback').textContent+=' '+t(p.unhealthy?'You already had a treat. Eating this will eliminate you!':'Optional treat: 0 points.');
   const eat=button(t('Eat'),()=>act(M.eat),'primary');
   if(f.healthy&&!state.snack&&p.healthy>=C.healthyLimit){eat.disabled=true;$('feedback').textContent+=' '+t('Your three healthy foods are complete. Skip this one.');}
   button(t(state.snack?'Skip · I will be out':'Skip'),()=>act(M.skip),'meal');
  } else {
   if(state.event==='ate')$('feedback').textContent+=' '+t(f.healthy?'+1 point.':'Treat used · 0 points.');
   button(t('Continue →'),()=>{state=M.next(state);render();},'primary');
  }
 }
 function reset(){clearWork();state=null;seen={};$('setup').hidden=false;$('play').hidden=true;$('results').hidden=true;$('players').replaceChildren();}
 I.captureStatic();I.translateStatic();$('language').value=I.language;
 $('language').onchange=()=>{I.setLanguage($('language').value);I.translateStatic();settings();if(state)render();};
 $('count').onchange=settings;settings();
 $('setup-form').onsubmit=e=>{e.preventDefault();clearWork();seen={};state=M.create({days:Number($('days').value),players:[...document.querySelectorAll('.player-row')].map(r=>({controller:r.querySelector('.controller').value,category:r.querySelector('.category').value,mode:r.querySelector('.mode').value}))});render();};
 $('restart').onclick=()=>{if(confirm(t('Start a new game? Current scores will be cleared.')))reset();};
 $('end').onclick=()=>{if(confirm(t('Finish now and compare the current scores?'))){clearWork();state={...state,phase:'finished'};render();}};
})();
