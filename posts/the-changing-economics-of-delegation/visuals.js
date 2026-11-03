(function(){
const $ = id => document.getElementById(id);
const presets = {
  'startup-intern': [10,20,3,5,15],
  'startup-hire': [52,20,3,5,15],
  'company-intern': [10,6,3,3,20],
  'company-hire': [52,6,3,3.5,0]
};
const controls = ['weeks','onboard','avoided','supervision','decline'];
function calculate(weeks,onboard,avoided,supervision,decline) {
  const rows=[{week:0,recovered:0,invested:onboard}];
  let invested=onboard;
  for(let w=1;w<=weeks;w++) {
    invested += supervision*Math.pow(1-decline/100,w-1);
    rows.push({week:w,recovered:w*avoided,invested});
  }
  return rows;
}
function chart(target, rows, series, xTitle, yTitle) {
  const width=Math.max(240,target.clientWidth),height=300;
  const m={l:48,r:14,t:30,b:48},pw=width-m.l-m.r,ph=height-m.t-m.b;
  const minX=Math.min(...rows.map(r=>r.week));
  const maxX=Math.max(...rows.map(r=>r.week),minX+1);
  const rawY=Math.max(...rows.flatMap(r=>series.map(s=>r[s.key])),1);
  const step=Math.pow(10,Math.floor(Math.log10(rawY/4)));
  const tickStep=Math.ceil(rawY/4/(step/2))*(step/2),maxY=tickStep*4;
  const x=v=>m.l+(v-minX)/(maxX-minX)*pw,y=v=>m.t+ph-v/maxY*ph;
  let content=`<title>Existing team’s time saved on the work and spent on onboarding and supervision</title><text x="${m.l}" y="16">${yTitle}</text>`;
  for(let i=0;i<=4;i++){
    const val=tickStep*i;
    content+=`<line x1="${m.l}" y1="${y(val)}" x2="${width-m.r}" y2="${y(val)}" stroke="var(--line)"/><text x="${m.l-9}" y="${y(val)+4}" text-anchor="end">${Number(val.toFixed(2))}</text>`;
  }
  const ticks=[...new Set([minX,Math.round(minX+(maxX-minX)/3),Math.round(minX+(maxX-minX)*2/3),maxX])];
  for(const v of ticks)content+=`<text x="${x(v)}" y="${height-25}" text-anchor="${v===maxX?'end':v===minX?'start':'middle'}">${v}</text>`;
  content+=`<text x="${m.l+pw/2}" y="${height-3}" text-anchor="middle">${xTitle}</text>`;
  for(const s of series){
    const d=rows.map((r,i)=>`${i?'L':'M'}${x(r.week)},${y(r[s.key])}`).join(' ');
    content+=`<path d="${d}" fill="none" stroke="var(--${s.color})" stroke-width="2.5" ${s.dashed?'stroke-dasharray="7 5"':''}/>`;
  }
  target.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="${target.getAttribute('data-description')||''}">${content}</svg>`;
}
function update(){
  const values=controls.map(id=>Number($(id).value));
  const [weeks,onboard,avoided,supervision,decline]=values;
  const units=[`${weeks} weeks`,`${onboard} hours`,`${avoided} h / week`,`${supervision} h / week`,`${decline}%`];
  controls.forEach((id,i)=>$(id+'-value').textContent=units[i]);
  const rows=calculate(...values),last=rows.at(-1),net=last.recovered-last.invested;
  const breakeven=rows.find(r=>r.week>0 && r.recovered>=r.invested);
  const rounded=Math.abs(net).toFixed(1);
  const outcome=net>=0?`${rounded} hours freed for the existing team`:`${rounded} extra hours required from the existing team`;
  const recovery=breakeven?`The team’s onboarding and supervision time is first offset in week ${breakeven.week}.`:'Time saved does not cover the team’s onboarding and supervision in this engagement.';
  $('model-result').innerHTML=`Over ${weeks} ${weeks===1?'week':'weeks'}<strong>${outcome}</strong><span class="result-baseline">Compared with the team doing the work directly with AI.</span>${recovery}<span class="result-detail">${last.recovered.toFixed(1)} h of team work avoided − ${last.invested.toFixed(1)} h of team support</span>`;
  $('decline-help').textContent=`How quickly the existing team’s supervision time falls. ${supervision} h becomes ${(supervision*(1-decline/100)).toFixed(2).replace(/0$/,'')} h in week 2.`;
  $('cumulative-chart').setAttribute('data-description',`${last.recovered.toFixed(1)} hours of work avoided by the existing team and ${last.invested.toFixed(1)} hours spent by that team on onboarding and supervision over ${weeks} weeks. ${outcome}. ${recovery} Compared with the existing team doing the work directly with AI.`);
  chart($('cumulative-chart'),rows,[{key:'recovered',color:'teal'},{key:'invested',color:'coral',dashed:true}],'Productive weeks after onboarding','Existing team’s time (hours)');
}
const scenarioButtons=[...document.querySelectorAll('[data-scenario]')];
scenarioButtons.forEach(button=>button.addEventListener('click',()=>{
  presets[button.dataset.scenario].forEach((value,i)=>$(controls[i]).value=value);
  scenarioButtons.forEach(other=>other.setAttribute('aria-pressed',String(other===button)));
  $('scenario-status').textContent='Preset assumptions · change any value to explore.';
  update();
}));
controls.forEach(id=>$(id).addEventListener('input',()=>{$('scenario-status').textContent='Custom assumptions based on the selected situation.';update()}));
new ResizeObserver(update).observe(document.querySelector('figure.model'));
update();

const sectionLinks=[...document.querySelectorAll('.contents a')];
const sections=sectionLinks.map(link=>document.querySelector(link.getAttribute('href')));
function markSection(){
  let active=null;
  for(const section of sections){if(section.getBoundingClientRect().top<=window.innerHeight*.35)active=section.id;}
  for(const link of sectionLinks){
    if(link.getAttribute('href')===`#${active}`)link.setAttribute('aria-current','location');
    else link.removeAttribute('aria-current');
  }
}
window.addEventListener('scroll',markSection,{passive:true});
markSection();

})();
