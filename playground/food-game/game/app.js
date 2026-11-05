// Browser adapter: layout, event handling, animation and CPU scheduling. Rules live in mechanics.js.
(() => {
 const M=GameMechanics,C=GameConfig,D=GameContent,$=id=>document.getElementById(id);
 let state=null,animation=null,seen={},spinning=false,cpuTimer=null;
 const face=['👩🏽','👨🏻','👩🏼'];
 const messages={correct:'Correct! Now choose Eat or Skip.',wrong:'Not quite. That counts as a mistake today.',
 'mistake-out':'Daily mistake limit reached. This player is out.',ate:'Food eaten!',skip:'Skipped. No food allowance used.',
 full:'You already ate three healthy foods today. Choose Skip; surprise snacks are extra.',
 'food-out':'That food broke the food limit. This player is out.',
 'snack-reject':'Correct! That snack is unhealthy. You are still in! Here is a healthy snack to classify.',
 'refused-snack':'You refused the healthy snack. This player is out.'};
 function settings(){
  const old=[...document.querySelectorAll('.player-row')].map(r=>[r.querySelector('.category').value,r.querySelector('.mode').value,r.querySelector('.controller').value]);
  $('player-settings').innerHTML=Array.from({length:Number($('count').value)},(_,i)=>`<div class="player-row"><strong>Player ${i+1}</strong><label>Control <select class="controller" aria-label="Player ${i+1} control"><option value="human">Human</option><option value="cpu" ${i>0?'selected':''}>CPU</option></select></label><label>Category <select class="category" aria-label="Player ${i+1} category"><option value="baby">Baby</option><option value="child" selected>Child</option><option value="adult">Adult</option></select></label><label>Difficulty <select class="mode" aria-label="Player ${i+1} difficulty"><option value="easy">Easy</option><option value="medium">Medium</option><option value="hard">Hard</option></select></label></div>`).join('');
  old.forEach((v,i)=>{const r=document.querySelectorAll('.player-row')[i];if(r){r.querySelector('.category').value=v[0];r.querySelector('.mode').value=v[1];r.querySelector('.controller').value=v[2];}});
 }
 function clearWork(){clearTimeout(animation);clearTimeout(cpuTimer);spinning=false;}
 function button(text,fn,cls=''){const b=document.createElement('button');b.textContent=text;b.className=cls;b.disabled=state&&M.current(state).controller==='cpu';b.onclick=()=>{if(M.current(state).controller!=='cpu')fn();};$('actions').append(b);return b;}
 function drawPlayers(){
  $('players').innerHTML=state.players.map((p,i)=>`<div class="player-card p${p.id} ${!p.out&&i===state.turn?'active':''} ${p.out?'out':''}"><div class="avatar"><span>${face[i]}</span><b>${p.id}</b></div><div><strong>Player ${p.id} · ${p.controller==='cpu'?'CPU':'Human'} ${p.out?'· Out':''}</strong><div class="score">${p.score} points</div><small>Healthy ${p.healthy}/3 · Treat ${p.unhealthy}/1</small><small>Mistakes ${p.mistakes}/${C.mistakes[p.mode]}</small></div></div>`).join('');
 }
 function food(){
  const p=M.current(state),level=D.level(p.category,p.mode), key=p.id;
  const pool=D.foods.filter(f=>f.level<=level && f.level>=Math.max(0,level-1) && (!state.snack||!['snack-reject','wrong'].includes(state.event)||f.healthy));
  let choices=pool.filter(f=>!(seen[key]||[]).includes(f.id));
  if(!choices.length){seen[key]=[];choices=pool;}
  const f=choices[Math.floor(Math.random()*choices.length)];(seen[key]??=[]).push(f.id);return f;
 }
 function showFood(meal){
  state=M.begin(state,food(),meal);
  render();
 }
 function spin(){
  if(spinning)return;spinning=true;
  const meal=C.meals[Math.floor(Math.random()*3)];
  $('stage').innerHTML='<p class="eyebrow">Hardy Wheel, Hard Rules</p><div class="wheel">Breakfast<br>Lunch<br>Dinner</div><h2>Choosing your meal…</h2>';$('actions').replaceChildren();
  animation=setTimeout(()=>{spinning=false;showFood(meal);},1100);
 }
 function act(fn){state=fn(state);
  if(state.phase==='ready'&&state.snack){const notice=messages[state.event];showFood('Surprise snack');$('feedback').textContent=notice;return;}
  render();
 }
 function scheduleCPU(){
  clearTimeout(cpuTimer);
  if(!state||state.phase==='finished'||M.current(state).controller!=='cpu')return;
  const expected=state;
  cpuTimer=setTimeout(()=>{
   if(state!==expected||spinning)return;
   const action=GameCPU.choose(state);if(!action)return;
   if(action.type==='snack')showFood('Surprise snack');
   else if(action.type==='spin')spin();
   else if(action.type==='meal')showFood(action.meal);
   else if(action.type==='answer')act(s=>M.answer(s,action.healthy));
   else if(action.type==='eat')act(M.eat);
   else if(action.type==='skip')act(M.skip);
   else if(action.type==='next'){state=M.next(state);render();}
  },C.cpuDelayMs);
 }
 function render(){
  scheduleCPU();
  drawPlayers();$('setup').hidden=true;$('play').hidden=state.phase==='finished';$('results').hidden=state.phase!=='finished';
  $('actions').replaceChildren();$('feedback').textContent=messages[state.event]||'';
  if(state.phase==='finished'){
   clearWork();const winners=M.winners(state);
   $('results').innerHTML=`<p class="eyebrow">Restaurant closed · Day ${state.day}</p><h2>${winners.length?winners.map(p=>'Player '+p.id).join(' & ')+(winners.length>1?' share the win!':' wins!'):'No winner this time'}</h2><p>${winners.length?'Well played! Try a new category or difficulty next time.':'Everyone was eliminated. Open the restaurant and try again!'}</p><ol>${[...state.players].sort((a,b)=>b.score-a.score).map(p=>`<li>Player ${p.id}: <strong>${p.score} points</strong>${p.out?' · eliminated':''}</li>`).join('')}</ol><button class="primary" id="again">Play again</button>`;
   $('again').onclick=reset;return;
  }
  const p=M.current(state);
  $('status').innerHTML=`Day ${state.day} of ${state.days} <span>·</span> ${state.snack?'Snack round':'Round '+state.round+' of '+C.mealRounds} <span>·</span> Player ${p.id}’s turn (${p.controller==='cpu'?'CPU':'Human'})`;
  if(state.phase==='ready'){
   $('stage').innerHTML=`<p class="eyebrow">${p.category} · ${p.mode}</p><h2>${state.snack?'Surprise snack time!':p.mode==='hard'?'Let the Hardy Wheel decide!':'Choose your meal'}</h2><p>${state.snack?`Player ${p.id}, there is no timer. Classify the snack. Unhealthy foods are replaced; once you identify a healthy snack, Eat it to stay in!`:'Breakfast, lunch, or dinner—food can appear at any meal.'}</p>`;
   if(state.snack)button('Ready for my snack',()=>showFood('Surprise snack'),'primary');
   else if(p.mode==='hard')button('Spin the Hardy Wheel',spin,'primary');
   else C.meals.forEach(meal=>button(meal,()=>showFood(meal),'meal'));
   return;
  }
  const f=state.food;
  $('stage').innerHTML=`<p class="eyebrow">${state.meal} · ${p.category} / ${p.mode}</p><div class="plate"><span role="img" aria-label="${f.name}">${f.emoji}</span></div><h2>${f.name}</h2><p>${state.phase==='classify'?'How would you classify this food?':f.explanation}</p>`;
  if(state.phase==='classify'){
   button('Healthy',()=>act(s=>M.answer(s,true)),'healthy');button('Unhealthy',()=>act(s=>M.answer(s,false)),'unhealthy');
  } else if(state.phase==='decide'){
   if(!f.healthy){$('feedback').textContent+=p.unhealthy?' You already had a treat. Eating this will eliminate you!':' Optional treat: 0 points.';}
   const eat=button('Eat',()=>act(M.eat),'primary');
   if(f.healthy&&!state.snack&&p.healthy>=C.healthyLimit){eat.disabled=true;$('feedback').textContent+=' Your three healthy foods are complete. Skip this one.';}
   button(state.snack?'Skip · I will be out':'Skip',()=>act(M.skip),'meal');
  } else {
   if(state.event==='ate')$('feedback').textContent+=f.healthy?' +1 point.':' Treat used · 0 points.';
   button('Continue →',()=>{state=M.next(state);render();},'primary');
  }
 }
 function reset(){clearWork();state=null;seen={};$('setup').hidden=false;$('play').hidden=true;$('results').hidden=true;$('players').replaceChildren();}
 $('count').onchange=settings;settings();
 $('setup-form').onsubmit=e=>{e.preventDefault();clearWork();seen={};state=M.create({days:Number($('days').value),players:[...document.querySelectorAll('.player-row')].map(r=>({controller:r.querySelector('.controller').value,category:r.querySelector('.category').value,mode:r.querySelector('.mode').value}))});render();};
 $('restart').onclick=()=>{if(confirm('Start a new game? Current scores will be cleared.'))reset();};
 $('end').onclick=()=>{if(confirm('Finish now and compare the current scores?')){clearWork();state={...state,phase:'finished'};render();}};
})();
