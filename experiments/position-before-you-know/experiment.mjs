import {INITIAL,position,evaluate,same} from './model.mjs';
const $=id=>document.getElementById(id),NS='http://www.w3.org/2000/svg';
let start={...INITIAL},kind='attack',current=null,previous=null,last={attack:null,cover:null},results={};
const xy=p=>({x:70+p.x*5.6,y:60+p.y*5});
const fmt=n=>Math.abs(n)<.05?'less than 0.1':Math.abs(n).toFixed(1);
const marginText=r=>Math.abs(r.margin)<1e-9?'Exactly on time':`${fmt(r.margin)} s ${r.onTime?'to spare':'late'}`;
function shape(tag,attrs,parent){const el=document.createElementNS(NS,tag);for(const [k,v]of Object.entries(attrs))el.setAttribute(k,v);parent.append(el);return el;}
function line(a,b,cls,parent){const A=xy(a),B=xy(b);shape('path',{d:`M${A.x} ${A.y}L${B.x} ${B.y}`,class:cls},parent);}
function display(){const a=xy(start);$('player').setAttribute('transform',`translate(${a.x} ${a.y})`);$('depth').value=start.x;$('width').value=start.y;$('depth-value').value=start.x;$('width-value').value=start.y;$('pitch-desc').textContent=`Your starting position is ${start.x} forward and ${start.y} across the pitch. The person labeled You is the player you control. The square marks receiving space; the diamond marks cover after a turnover.`;for(const k of ['attack','cover'])$(k).setAttribute('aria-pressed',String(k===kind));}
function move(x,y){start=position(Math.round(x),Math.round(y));display();if(current&&!same(current.start,start)){$('pitch').removeAttribute('data-outcome');$('result').removeAttribute('data-outcome');$('result-consequence').hidden=true;const indicator=$('outcome-indicator');if(indicator)indicator.setAttribute('visibility','hidden');$('comparison').hidden=true;$('difference').textContent='';$('result-label').textContent='Position changed';$('result-title').textContent='Play to test this position.';$('result-detail').textContent='The paths show your last tested position, not this new position. Play a continuation to compare the new position.';}else if(current)renderResult();$('reflection').hidden=true;}
function renderResult(){const r=current;
const boundary=Math.abs(r.margin)<1e-9;
const outcome=boundary?'boundary':r.onTime?'reachable':'short';
$('pitch').dataset.outcome=outcome;$('result').dataset.outcome=outcome;
const indicator=$('outcome-indicator');if(indicator)indicator.removeAttribute('visibility');
$('result-consequence').hidden=false;
$('result-consequence').textContent=boundary?'≈ At the limit of your reach':r.onTime?(r.kind==='attack'?'✓ A passing option is available':'✓ You can get into covering position'):(r.kind==='attack'?'△ This passing option is out of reach':'△ You would leave this space uncovered');
$('result-label').textContent=r.kind==='attack'?'Completed pass · receive ahead':'Turnover · cover the break';$('result-title').textContent=r.onTime?'You can reach the space.':'You cannot reach it in time.';$('result-detail').textContent=`${marginText(r)}. Travel takes ${r.travel.toFixed(1)} model seconds; 3 are available.`;$('comparison').hidden=!previous;$('restore').hidden=!previous;if(previous){$('comparison').innerHTML=`<div>Previous position (${previous.start.x}, ${previous.start.y})<strong>${marginText(previous)}</strong></div><div>This position (${r.start.x}, ${r.start.y})<strong>${marginText(r)}</strong></div>`;const delta=r.margin-previous.margin;$('difference').textContent=Math.abs(delta)<1e-9?'Same arrival margin. This move did not change what you can reach.':`${fmt(delta)} s ${delta>0?'more':'less'} arrival margin. Same continuation, speed, and response window.`;}else{$('difference').textContent='Move your player and play this continuation again to compare starting positions.';}}
function draw(r){$('previous-layer').replaceChildren();$('route-layer').replaceChildren();if(previous){line(previous.start,previous.end,'old-route',$('previous-layer'));const p=xy(previous.start);shape('circle',{cx:p.x,cy:p.y,r:19,class:'ghost'},$('previous-layer'));}line(r.start,r.end,'route',$('route-layer'));if(!r.onTime){line(r.end,r.target,'shortfall-band',$('route-layer'));line(r.end,r.target,'remaining-route',$('route-layer'));}const target=xy(r.target);
const indicator=shape('g',{id:'outcome-indicator','aria-hidden':'true'},$('route-layer'));
shape('circle',{cx:target.x,cy:target.y,r:31,class:'destination-halo'},indicator);
const badgeX=target.x+(r.kind==='cover'?-31:31),badgeY=target.y+(r.kind==='cover'?-19:19);shape('circle',{cx:badgeX,cy:badgeY,r:13,class:'outcome-badge'},indicator);
const mark=shape('text',{x:badgeX,y:badgeY+5,'text-anchor':'middle',class:'outcome-symbol'},indicator);
mark.textContent=Math.abs(r.margin)<1e-9?'≈':r.onTime?'✓':'!';
const e=xy(r.end);const runner=shape('g',{},$('route-layer'));shape('circle',{cx:e.x,cy:e.y,r:18,class:'runner'},runner);shape('use',{href:'#person-icon',x:e.x-14,y:e.y-14,width:28,height:28},runner);const label=shape('text',{x:360,y:425,'text-anchor':'middle',class:'endpoint-label'},$('route-layer'));label.textContent=marginText(r);const ballStart={x:68,y:42};line(ballStart,r.kind==='attack'?r.target:{x:18,y:42},'ball-route',$('route-layer'));const b=xy(r.target);$('ball').setAttribute('cx',b.x);$('ball').setAttribute('cy',b.y);if(!matchMedia('(prefers-reduced-motion: reduce)').matches){const s=xy(r.start);runner.animate([{transform:`translate(${s.x-e.x}px,${s.y-e.y}px)`},{transform:'translate(0,0)'}],{duration:650,easing:'linear'});} }
function play(next){document.body.classList.add("has-run");$("path-key").hidden=false;const switched=current&&next!==kind;kind=next;const r=evaluate(start,kind);const old=last[kind];previous=old&&!same(old.start,start)?old:previous?.kind===kind?previous:null;current=r;last[kind]=r;results[`${start.x},${start.y},${kind}`]=r;display();draw(r);renderResult();$('fixed-note').textContent=switched?'Continuation changed; your starting position is preserved. Speed and the 3-second window stay fixed.':'Same scene and movement rules on every replay. Try another starting position to compare.';const other=results[`${start.x},${start.y},${kind==='attack'?'cover':'attack'}`];$('reflection').hidden=!other;if(other){const a=kind==='attack'?r:other,c=kind==='cover'?r:other;$('cross-comparison').replaceChildren();
for(const [name,run] of [['Receive pass',a],['Cover the break',c]]){const chip=document.createElement('span');chip.className='consequence-chip';chip.dataset.outcome=Math.abs(run.margin)<1e-9?'boundary':run.onTime?'reachable':'short';chip.textContent=`${Math.abs(run.margin)<1e-9?'≈':run.onTime?'✓':'△'} ${name}: ${marginText(run)}`;$('cross-comparison').append(chip);}
const context=document.createElement('span');context.className='comparison-context';context.textContent=`From (${start.x}, ${start.y}). Same start, speed, and available time; different destinations.`;$('cross-comparison').append(context);}$('announcement').textContent=`${$('result-label').textContent}. ${$('result-title').textContent} ${marginText(r)}.`;keepPositionMobileVisible();}
for(const k of ['attack','cover'])$(k).addEventListener('click',()=>{play(k);$('result').focus({preventScroll:true});});
$('depth').addEventListener('input',e=>move(Number(e.target.value),start.y));$('width').addEventListener('input',e=>move(start.x,Number(e.target.value)));
$('restore').addEventListener('click',()=>{if(previous){const p=previous.start;move(p.x,p.y);play(kind);}});
$('reset').addEventListener('click',()=>{document.body.classList.remove('has-run');$('pitch').removeAttribute('data-outcome');$('result').removeAttribute('data-outcome');$('result-consequence').hidden=true;$('path-key').hidden=true;start={...INITIAL};kind='attack';current=previous=null;last={attack:null,cover:null};results={};$('previous-layer').replaceChildren();$('route-layer').replaceChildren();$('ball').setAttribute('cx',467);$('ball').setAttribute('cy',288);$('result-label').textContent='Before the pass';$('result-title').textContent='Choose where to stand.';$('result-detail').textContent='Then play either continuation to see what you can reach.';$('difference').textContent='';$('comparison').hidden=true;$('restore').hidden=true;$('reflection').hidden=true;$('fixed-note').textContent='These are two curated possibilities. Neither is more likely in this illustration.';display();$('announcement').textContent='Starting position and comparisons reset.';$('depth').focus({preventScroll:true});});
let dragging=false;function pointer(e){const p=$('pitch').createSVGPoint();p.x=e.clientX;p.y=e.clientY;const a=p.matrixTransform($('pitch').getScreenCTM().inverse());move((a.x-70)/5.6,(a.y-60)/5);}
$('player').addEventListener('pointerdown',e=>{dragging=true;$('player').setPointerCapture(e.pointerId);e.preventDefault();pointer(e);});$('player').addEventListener('pointermove',e=>{if(dragging)pointer(e);});for(const event of ['pointerup','pointercancel','lostpointercapture'])$('player').addEventListener(event,()=>{dragging=false;});display();

const narrowPositionLayout=matchMedia('(max-width: 760px)');
const positionLayoutNodes=[
  ['position-rules','position-mobile-context'],
  ['position-actions','position-mobile-primary'],
  ['result','position-mobile-primary'],
  ['comparison','position-mobile-comparison'],
  ['difference','position-mobile-comparison']
].map(([id,slot])=>{
  const node=$(id),marker=document.createComment(`Original location of ${id}`);
  node.before(marker);
  return {node,marker,slot:$(slot)};
});
function layoutPositionControls(){
  for(const {node,marker,slot} of positionLayoutNodes){
    if(narrowPositionLayout.matches)slot.append(node);else marker.after(node);
  }
}
narrowPositionLayout.addEventListener('change',layoutPositionControls);
layoutPositionControls();
function keepPositionMobileVisible(){
  if(!narrowPositionLayout.matches)return;
  const context=$('position-mobile-context').getBoundingClientRect(),result=$('result').getBoundingClientRect();
  if(context.top<0||result.bottom>innerHeight){
    const pitch=$('pitch').getBoundingClientRect();
    const anchor=result.bottom-context.top+16<=innerHeight?context:pitch;
    window.scrollTo({top:Math.max(0,scrollY+anchor.top-8),behavior:'instant'});
  }
}
