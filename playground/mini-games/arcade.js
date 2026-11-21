"use strict";

const id = (name) => document.getElementById(name);
const game = document.body.dataset.game;
const field = id("field");
const ctx = field.getContext("2d");
const touch = matchMedia("(pointer: coarse), (hover: none)").matches;
const W = 960, H = 540;
const limit = (value, min, max) => Math.max(min, Math.min(max, value));
const distance = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
const person = (x, y, color, name) => ({x, y, color, name, lives: 5});
let target = null, previousPointer = null, lastFrame = 0, frame, state;
const mascotIcons = {Monkey:"🐵", Eagle:"🦅", Cat:"🐱", Dog:"🐶", Human:"🙂", Worker:"👷", Pig:"🐷", Bird:"🐦", Bee:"🐝", Fly:"🪰", Dragonfly:"🦋"};

function steer(p, goal, speed, dt) {
  const gap = distance(p, goal);
  const step = gap ? Math.min(1, speed * dt / gap) : 0;
  p.x = limit(p.x + (goal.x - p.x) * step, 18, W - 18);
  p.y = limit(p.y + (goal.y - p.y) * step, 18, H - 18);
}

function point(event) {
  const rect = field.getBoundingClientRect();
  const x = (event.clientX - rect.left) * W / rect.width;
  const y = (event.clientY - rect.top) * H / rect.height;
  if (game !== "blue") return {x, y};
  const camera = runCamera();
  return {x: x / camera.zoom + camera.x, y: y / camera.zoom + camera.y};
}

function aim(event, initial) {
  if (!state || state.done) return;
  const next = {x: event.clientX, y: event.clientY};
  if (game === "blue" && previousPointer && !initial) {
    const elapsed = Math.max(8, event.timeStamp - previousPointer.time);
    const jump = distance(next, previousPointer.point);
    previousPointer = {point: next, time: event.timeStamp};
    if (jump > Math.max(26, elapsed * 1.35)) {
      target = null;
      return;
    }
  } else {
    previousPointer = {point: next, time: event.timeStamp};
  }
  target = point(event);
}

field.addEventListener("pointerdown", event => {
  field.setPointerCapture(event.pointerId);
  aim(event, true);
});
field.addEventListener("pointermove", event => {
  if (event.pointerType === "mouse" || field.hasPointerCapture(event.pointerId)) aim(event, false);
});
function releasePointer(event) {
  if (event.pointerType === "mouse") return;
  target = null;
  previousPointer = null;
}
field.addEventListener("pointerup", releasePointer);
field.addEventListener("pointercancel", releasePointer);
field.addEventListener("pointerleave", () => { target = null; previousPointer = null; });

function rect(x,y,w,h,color,c=ctx) {
  c.fillStyle = color;
  c.fillRect(x,y,w,h);
}
function oval(x,y,rx,ry,color,c=ctx) {
  c.beginPath();
  c.ellipse(x,y,rx,ry,0,0,Math.PI*2);
  c.fillStyle=color;
  c.fill();
}
function label(value,x,y,color="#143024",size=16,c=ctx) {
  c.fillStyle=color;
  c.font="bold "+size+"px system-ui";
  c.textAlign="center";
  c.fillText(value,x,y);
}
function lawn() {
  rect(0,0,W,H,"#90d34c");
  for(let x=0;x<W;x+=100) rect(x,0,50,H,"#98d957");
  for(let i=0;i<125;i++){
    const x=(i*127)%W, y=(i*79)%H;
    oval(x,y,4,1,i%3 ? "#78bf39" : "#fff2a8");
  }
}
function tree(x,y) {
  oval(x,y+17,33,11,"#467a354d");
  rect(x-6,y-10,12,27,"#805229");
  oval(x,y-18,31,23,"#247644");
  oval(x-12,y-25,17,15,"#3d9f50");
  oval(x+9,y-27,15,14,"#59ad46");
}
function avatar(p, icon, active, tagger=false) {
  oval(p.x,p.y+16,20,7,"#284e464d");
  oval(p.x,p.y,active?22:19,active?22:19,active?"#fff4a7":"#fff");
  oval(p.x,p.y,17,17,p.color);
  label(icon,p.x,p.y+8,"#fff",23);
  label(p.name,p.x,p.y+39);
  if(tagger){
    rect(p.x-35,p.y-45,70,21,"#a02038");
    label("TAGGER",p.x,p.y-30,"#fff",14);
  }
}
function say(message) { id("notice").textContent=message; }
function finish(message) {
  state.done=true;
  target=null;
  say(message);
  id("again").hidden=false;
}
function clock(seconds) {
  const ticks=Math.max(0,Math.ceil(seconds));
  return Math.floor(ticks/60)+":"+String(ticks%60).padStart(2,"0");
}

const traps=[{x:245,y:187},{x:558,y:310},{x:759,y:166},{x:326,y:416}];
const colors=["#ef593f","#2f7be8","#a344bf","#eeaf2d"];

function newTag() {
  return {players:[person(130,260,colors[0],"You"),person(820,260,colors[1],"CPU 1"),person(530,125,colors[2],"CPU 2"),person(710,425,colors[3],"CPU 3")],
    tagger:1, cooldown:0, duck:0, fast:false, flashes:[], time:0};
}
function tag(from,to) {
  if(state.cooldown>0 || state.tagger!==from || !state.players[to].lives || (to===0 && state.duck>0)) return;
  if(distance(state.players[from],state.players[to])>54) return;
  state.tagger=to;
  state.cooldown=1.5;
  say(to===0 ? "You’re the tagger!" : state.players[to].name+" is the tagger!");
}
function tagAction(action) {
  if(!state || state.done) return;
  if(action==="duck") state.duck=.8;
  if(action==="speed") {
    state.fast=!state.fast;
    document.querySelector('[data-action="speed"]').setAttribute("aria-pressed",String(state.fast));
  }
  if(action==="tag") {
    for(let i=1;i<state.players.length;i++){
      tag(0,i);
      if(state.tagger!==0) break;
    }
  }
}
if(game==="red") {
  id("tag-reminder").textContent = touch
    ? "Drag on the field to move. Tap 1 to tag nearby, 2 to duck, or 3 to turn sprint on or off."
    : "Move with your mouse pointer. Keyboard 1: tag nearby · 2: duck · 3: sprint on/off. Press 3 again to slow down.";
  id("tag-controls").hidden=!touch;
  for(const button of id("tag-controls").querySelectorAll("button")){
    button.addEventListener("click",()=>tagAction(button.dataset.action));
  }
  document.addEventListener("keydown",event=>{
    const action={"1":"tag","2":"duck","3":"speed"}[event.key];
    if(!touch && action && !event.repeat) tagAction(action);
  });
}
function updateTag(dt) {
  const p=state.players;
  state.time+=dt;
  state.cooldown-=dt;
  state.duck-=dt;
  if(target) steer(p[0],target,state.duck>0?85:state.fast?290:195,dt);
  for(let i=1;i<p.length;i++){
    const bot=p[i];
    if(!bot.lives) continue;
    if(i===state.tagger){
      const rivals=p.filter((r,index)=>index!==i && r.lives).sort((a,b)=>distance(bot,a)-distance(bot,b));
      if(rivals.length){
        steer(bot,rivals[0],152,dt);
        tag(i,p.indexOf(rivals[0]));
      }
    }else{
      const angle=state.time*.75+i*2;
      steer(bot,{x:480+Math.cos(angle)*320,y:270+Math.sin(angle)*185},125,dt);
    }
  }
  p.forEach((runner,i)=>{
    if(!runner.lives || (runner.safe || 0)>state.time) return;
    const trap=traps.find(t=>distance(t,runner)<29);
    if(!trap) return;
    runner.lives--;
    state.flashes.push({trap,until:state.time+1.1});
    runner.x=105+i*230;
    runner.y=i%2?460:95;
    runner.safe=state.time+1.5;
    if(!runner.lives && state.tagger===i) state.tagger=p.findIndex(r=>r.lives);
    if(i===0){
      target=null;
      say("A shark trap! You lost one life.");
      if(!runner.lives) finish("Out of lives. Play again?");
    }
  });
  state.flashes=state.flashes.filter(f=>f.until>state.time);
  id("score").textContent="Lives: "+p[0].lives+" / 5"+(state.fast?" · Sprint on":"");
}
function drawTag() {
  lawn();
  [[92,112],[856,109],[115,449],[856,447]].forEach(([x,y])=>tree(x,y));
  for(const t of traps){
    ctx.beginPath();
    ctx.moveTo(t.x-46,t.y+2);
    ctx.bezierCurveTo(t.x-44,t.y-30,t.x-9,t.y-21,t.x+13,t.y-23);
    ctx.bezierCurveTo(t.x+59,t.y-21,t.x+53,t.y+24,t.x+15,t.y+22);
    ctx.bezierCurveTo(t.x-8,t.y+30,t.x-46,t.y+20,t.x-46,t.y+2);
    ctx.lineWidth=2;
    ctx.strokeStyle="#202e20";
    ctx.stroke();
  }
  for(const {trap:t} of state.flashes){
    oval(t.x,t.y,38,21,"#30b5e9");
    label("🦈",t.x,t.y+10,"#fff",28);
  }
  state.players.forEach((p,i)=>{if(p.lives) avatar(p,i===0&&state.duck>0?"🙈":"🐵",i===0,state.tagger===i);});
}

const track={x:480,y:270,rx:325,ry:175,width:92};
const infieldWall = {rx: track.rx - track.width / 2, ry: track.ry - track.width / 2};
const runnerClearance = 24;

function keepOutsideInfield(runner) {
  const rx = infieldWall.rx + runnerClearance;
  const ry = infieldWall.ry + runnerClearance;
  const dx = (runner.x - track.x) / rx;
  const dy = (runner.y - track.y) / ry;
  const radius = Math.hypot(dx, dy);
  if (radius >= 1) return;
  const angle = Math.atan2(dy, dx);
  runner.x = track.x + rx * Math.cos(angle);
  runner.y = track.y + ry * Math.sin(angle);
}
const turn=Math.PI*2;
const onLoop=(angle)=>({x:track.x+track.rx*Math.cos(angle),y:track.y+track.ry*Math.sin(angle)});
const cones=[1,2.7,4.4,5.5].map(angle=>{
  const p=onLoop(angle);
  return {x:p.x+Math.cos(angle)*32,y:p.y+Math.sin(angle)*30};
});
function newRun() {
  const start=onLoop(0);
  id("map").hidden=false;
  return {runner:person(start.x,start.y,"#2464d8","You"), mode:id("mode").value, laps:Number(id("laps").value), progress:0, angle:0, time:0, bots:[0,0]};
}
function updateRun(dt) {
  const s=state, p=s.runner;
  s.time+=dt;
  const onTrack=r=>Math.abs(Math.hypot((r.x-track.x)/track.rx,(r.y-track.y)/track.ry)-1)<.17;
  if(target){
    const slowed=cones.some(c=>distance(c,p)<27);
    steer(p,target,slowed?92:onTrack(p)?270:134,dt);
    keepOutsideInfield(p);
  }
  const angle=Math.atan2((p.y-track.y)/track.ry,(p.x-track.x)/track.rx);
  const delta=Math.atan2(Math.sin(angle-s.angle),Math.cos(angle-s.angle));
  if(onTrack(p) && Math.abs(delta)<.18){
    const step=turn/12;
    const nextGate=(s.gate||0)+1;
    if(delta>0 && Math.abs(Math.atan2(Math.sin(angle-nextGate*step),Math.cos(angle-nextGate*step)))<.12) s.gate=nextGate;
    s.progress=(s.gate||0)*step;
  }
  s.angle=angle;
  s.bots=s.bots.map((a,i)=>a+dt*(i?.57:.51));
  const completed=Math.floor((s.gate||0)/12);
  id("score").textContent="Laps: "+completed+" / "+s.laps+(s.mode==="record"?" · "+clock(s.time):"");
  if(completed<s.laps) return;
  if(s.mode==="record"){
    const key="loop-run-"+s.laps;
    try{
      const previous=Number(localStorage.getItem(key));
      if(!previous||s.time<previous){
        localStorage.setItem(key,String(s.time));
        finish("Personal best: "+s.time.toFixed(1)+" seconds!");
      }else finish("Finished in "+s.time.toFixed(1)+" seconds. Best: "+previous.toFixed(1)+" seconds.");
    }catch{finish("Finished in "+s.time.toFixed(1)+" seconds.");}
  }else if(s.mode==="race"){
    const place=1+s.bots.filter(a=>a>=s.laps*turn).length;
    finish("Finished! Place: "+place+" of 3.");
  }else finish("You finished all "+s.laps+" laps!");
}
function runCamera() {
  const zoom = 1.17;
  const p = state.runner;
  return {zoom, x: limit(p.x-W/(2*zoom),0,W-W/zoom), y: limit(p.y-H/(2*zoom),0,H-H/zoom)};
}
function drawRun() {
  const p=state.runner;
  const {zoom, x, y} = runCamera();
  ctx.save();
  ctx.scale(zoom,zoom);
  ctx.translate(-x,-y);
  lawn();
  [[82,86],[878,89],[86,460],[873,470],[452,240]].forEach(([x,y])=>tree(x,y));
  ctx.beginPath();
  ctx.ellipse(track.x,track.y,track.rx,track.ry,0,0,turn);
  ctx.lineWidth=track.width;
  ctx.strokeStyle="#bd4b3a";
  ctx.stroke();
  ctx.strokeStyle="#ffd0a3";
  ctx.lineWidth=3;
  ctx.stroke();
  ctx.beginPath();
  ctx.ellipse(track.x,track.y,infieldWall.rx,infieldWall.ry,0,0,turn);
  ctx.lineWidth=9;
  ctx.strokeStyle="#344c60";
  ctx.stroke();
  ctx.lineWidth=3;
  ctx.strokeStyle="#f4ebce";
  ctx.stroke();
  for(let i=0;i<40;i++){
    const angle=i*turn/40;
    const x=track.x+infieldWall.rx*Math.cos(angle);
    const y=track.y+infieldWall.ry*Math.sin(angle);
    rect(x-3,y-7,6,14,"#344c60");
    rect(x-1,y-7,2,10,"#f4ebce");
  }
  rect(762,263,86,6,"#fff");
  label("START / FINISH",805,251,"#fff",13);
  for(let i=1;i<8;i++){
    const a=i*turn/8, marker=onLoop(a);
    ctx.save();
    ctx.translate(marker.x,marker.y);
    ctx.rotate(Math.atan2(track.ry*Math.cos(a),-track.rx*Math.sin(a)));
    label("➜",0,7,"#fff2ce",22);
    ctx.restore();
  }
  cones.forEach(c=>label("▲",c.x,c.y+8,"#ffa522",27));
  if(state.mode==="race"){
    state.bots.forEach((a,i)=>{
      const b=onLoop(a);
      b.x+=i?16:-15;
      b.y+=i?12:-12;
      avatar({...b,color:colors[i+1],name:"CPU "+(i+1)},"👟",false);
    });
  }
  avatar(p,"👟",true);
  ctx.restore();
  const map=id("map").getContext("2d");
  rect(0,0,132,92,"#b4e475",map);
  map.beginPath();
  map.ellipse(66,46,47,29,0,0,turn);
  map.lineWidth=10;
  map.strokeStyle="#bc4c38";
  map.stroke();
  rect(111,40,4,12,"#fff",map);
  oval(66+(p.x-track.x)*47/track.rx,46+(p.y-track.y)*29/track.ry,5,5,"#1559d0",map);
}

const mascotClubNames = {
  Monkey: "Monkeys", Eagle: "Eagles", Cat: "Cats", Dog: "Dogs",
  Human: "Humans", Worker: "Workers", Pig: "Pigs", Bird: "Birds",
  Bee: "Bees", Fly: "Flies", Dragonfly: "Dragonflies"
};

function stealSoccerBall() {
  if (!state || state.done || state.restart > 0) return;
  const ball = state.ball;
  if (ball.owner === state.control) return;
  if (ball.owner < 2) {
    say("Move near an opponent with the ball to take it.");
    return;
  }
  if (distance(state.players[state.control], state.players[ball.owner]) > 60) {
    say("Get closer, then press 1 to take the ball.");
    return;
  }
  ball.owner = state.control;
  ball.vx = 0;
  ball.vy = 0;
  ball.lock = 1.5;
  say("You took the ball!");
}

function kickSoccerBall() {
  if (!state || state.done || state.restart > 0) return;
  const ball = state.ball;
  if (ball.owner !== state.control) {
    say("Get the ball first, then press 2 to shoot or pass.");
    return;
  }
  const passing = state.control === 1;
  const goal = passing ? state.players[0] : {x: 940, y: 270};
  const dx = goal.x - ball.x;
  const dy = goal.y - ball.y;
  const length = Math.hypot(dx, dy) || 1;
  const speed = passing ? 500 : 700;
  ball.vx = dx / length * speed;
  ball.vy = dy / length * speed;
  ball.owner = -1;
  ball.lock = .25;
  say(passing ? "Pass to your striker!" : "Shot at goal!");
}

if(game==="yellow"){
  id("steal").hidden = !touch;
  id("kick").hidden = !touch;
  id("steal-help").textContent = touch
    ? "Drag to move. Tap 1 nearby to take the ball. Tap 2 to shoot or pass. Switch changes your player."
    : "Move with your mouse. Press 1 nearby to take the ball. To shoot or pass, press 2. Switch changes your player.";
  id("steal").addEventListener("click", stealSoccerBall);
  id("kick").addEventListener("click", kickSoccerBall);
  document.addEventListener("keydown", event => {
    if (touch || event.repeat || id("play").hidden) return;
    if (event.key === "1") stealSoccerBall();
    if (event.key === "2") kickSoccerBall();
  });
  const mascot = id("mascot");
  const club = id("club");
  for(const [name,icon] of Object.entries(mascotIcons)){
    mascot.add(new Option(icon+" "+name,name));
  }
  mascot.value="Eagle";
  let suggestedName = mascotClubNames[mascot.value];
  mascot.addEventListener("change", () => {
    const useSuggestion = !club.value.trim() || club.value.trim() === suggestedName;
    suggestedName = mascotClubNames[mascot.value];
    if (useSuggestion) club.value = suggestedName;
  });
  id("switch").addEventListener("click",()=>{
    if(!state || state.done) return;
    state.control=1-state.control;
    target=null;
    say("Playing as "+state.players[state.control].name);
  });
}
function resetSoccer() {
  const s=state;
  [[425,248],[102,270],[535,292],[858,270]].forEach(([x,y],i)=>Object.assign(s.players[i],{x,y}));
  Object.assign(s.ball,{x:480,y:270,owner:-1,lock:0,vx:0,vy:0});
  target=null;
}
function newSoccer(){
  const color=id("color").value;
  return {
    players:[person(425,248,color,"Striker"),person(102,270,color,"Goalie"),person(535,292,"#c13e57","CPU Striker"),person(858,270,"#c13e57","CPU Goalie")],
    ball:{x:480,y:270,owner:-1,lock:0,vx:0,vy:0}, control:0, half:0,
    lengths:[Number(id("first").value)*60,Number(id("second").value)*60],
    left:Number(id("first").value)*60, goals:[0,0], restart:0,
    club:id("club").value.trim()||mascotClubNames[id("mascot").value], color, stripe:id("stripe").value, mascot:mascotIcons[id("mascot").value], shape:id("shape").value, eyes:id("eyes").value, size:id("size").value
  };
}
function soccerScore(){
  const s=state;
  id("score").textContent=s.club+" "+s.goals[0]+" – "+s.goals[1]+" Cats · Half "+(s.half+1)+"/2 · "+clock(s.left);
}
function updateSoccer(dt){
  const s=state, p=s.players, b=s.ball;
  if(s.restart>0){ s.restart-=dt; return; }
  s.left=Math.max(0,s.left-dt);
  if(s.left===0){
    soccerScore();
    if(s.half===1){ finish("Full time: "+s.goals[0]+" – "+s.goals[1]); return; }
    s.half=1;
    s.left=s.lengths[1];
    s.restart=1.5;
    resetSoccer();
    soccerScore();
    say("Half time. Second half is about to start!");
    return;
  }
  if(target) steer(p[s.control],target,245,dt);
  for(const i of [0,1,2,3]){
    if(i===s.control) continue;
    const home=i>=2?858:102;
    let goal;
    if(b.owner===i) goal={x:i>=2?22:938,y:270};
    else if(i%2) goal={x:home,y:limit(b.y,218,322)};
    else goal=b;
    const speed = i % 2 ? 75 : 95;
    steer(p[i],goal,speed,dt);
  }
  b.lock=Math.max(0,b.lock-dt);
  if (b.owner === -1) {
    b.x += b.vx * dt;
    b.y += b.vy * dt;
    const damping = Math.exp(-.7 * dt);
    b.vx *= damping;
    b.vy *= damping;
    if (b.y < 110 || b.y > 469) {
      b.y = limit(b.y, 110, 469);
      b.vy *= -1;
    }
    if ((b.x < 30 || b.x > 930) && (b.y < 211 || b.y > 329)) {
      b.x = limit(b.x, 30, 930);
      b.vx *= -1;
    }
  }
  if(b.lock===0){
    const nearest=p.map((player,i)=>({i,gap:distance(player,b)}))
      .filter(item=>item.i!==b.owner)
      .sort((a,b)=>a.gap-b.gap)[0];
    if(nearest.gap<24){ b.owner=nearest.i; b.lock=.85; b.vx=0; b.vy=0; }
  }
  if(b.owner>=0){
    const owner=p[b.owner];
    const direction=b.owner<2?1:-1;
    b.x=limit(owner.x+direction*15,18,W-18);
    b.y=owner.y;
  }
  if((b.x<=44 || b.x>=916) && b.y>=211 && b.y<=329){
    const team=b.x>=916?0:1;
    s.goals[team]++;
    say((team===0?s.club:"Cats")+" scores!");
    resetSoccer();
    s.restart=1;
  }
  soccerScore();
}
function drawSoccer(){
  const s=state;
  lawn();
  rect(0,0,W,84,"#cceaff");
  for(let i=0;i<38;i++) label(["🙌","😊","👏","🎉"][i%4],18+i*25,73,"#250e36",20);
  rect(47,8,220,39,s.color);
  rect(47,8,29,39,s.stripe);
  rect(238,8,29,39,s.stripe);
  const emblemSize=s.size==="Small"?10:15;
  const emblemColor="#233149";
  oval(97,27,emblemSize+5,17,"#ffffff");
  if(s.shape==="Square") rect(82,13,30,29,"#ffffff");
  if(s.shape==="C"||s.shape==="Q") label(s.shape,97,39,emblemColor,33);
  label(s.mascot,97,32,emblemColor,emblemSize);
  if(s.eyes==="Closed") label("⌣⌣",97,40,emblemColor,9);
  label(("Go "+s.club+"!").slice(0,24),174,34,"#fff",14);
  rect(704,8,210,39,"#a52948");
  label("🐱 Go Cats!",809,35,"#fff",19);
  ctx.lineWidth=3;
  ctx.strokeStyle="#fff";
  ctx.strokeRect(45,98,870,383);
  ctx.strokeRect(45,188,132,164);
  ctx.strokeRect(783,188,132,164);
  ctx.strokeRect(16,211,29,118);
  ctx.strokeRect(915,211,29,118);
  rect(478,98,3,383,"#fff");
  ctx.beginPath();ctx.arc(480,270,62,0,turn);ctx.stroke();
  for(let y=216;y<329;y+=12){
    rect(16,y,29,1,"#fff");
    rect(915,y,29,1,"#fff");
  }
  s.players.forEach((p,i)=>avatar(p,i%2?"🧤":"👟",i===s.control));
  oval(s.ball.x,s.ball.y,13,13,"#fff");
  label("⚽",s.ball.x,s.ball.y+8,"#153526",23);
}

const games={
  red:{create:newTag,update:updateTag,draw:drawTag},
  blue:{create:newRun,update:updateRun,draw:drawRun},
  yellow:{create:newSoccer,update:updateSoccer,draw:drawSoccer}
};
const selected=games[game];

function animate(now){
  const dt=Math.min(.035,(now-lastFrame)/1000);
  lastFrame=now;
  selected.update(dt);
  selected.draw();
  if(!state.done) frame=requestAnimationFrame(animate);
}
function start(){
  cancelAnimationFrame(frame);
  target=null;
  previousPointer=null;
  state=selected.create();
  id("setup").hidden=true;
  id("play").hidden=false;
  id("again").hidden=true;
  if(game==="red") document.querySelector('[data-action="speed"]').setAttribute("aria-pressed","false");
  say(game==="red"?"This is just for fun.":game==="blue"?"Follow the arrows around the track.":"Kickoff!");
  lastFrame=performance.now();
  frame=requestAnimationFrame(animate);
}
id("setup").addEventListener("submit",event=>{ event.preventDefault(); start(); });
id("again").addEventListener("click",()=>{
  state=null;
  id("play").hidden=true;
  id("setup").hidden=false;
  id("setup").querySelector("button").focus();
});
