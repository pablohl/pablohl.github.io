const names={'finance-agent':'Finance Agent','plancraft-test':'PlanCraft','workbench':'WorkBench','browsecomp_plus_sampled_100':'BrowseComp-Plus','swe-bench-verified':'SWE-bench','terminal-bench':'Terminal-Bench'};
const title=s=>s[0].toUpperCase()+s.slice(1);
const notes={centralized:'Centralized: a coordinator assigns work, receives reports and combines them into an answer.',decentralized:'Decentralized: agents share and discuss findings with each other before the final answer is selected.',independent:'Independent: agents work without exchanging messages; their outputs are combined afterward. They may still share an environment.',hybrid:'Hybrid: a coordinator directs work, and workers can also exchange findings with each other.'};
const readings={centralized:'The centralized team improves the Finance Agent mean by 28.2 percentage points, but lowers the PlanCraft mean by 28.6 points. The same arrangement has very different results across tasks.',decentralized:'Peer exchange improves the Finance Agent mean by 26.0 points and WorkBench by 3.6 points, but lowers PlanCraft by 23.5 points. Communication is not equally useful in every task.',independent:'Without message exchange, the team improves Finance Agent by 19.8 points, but performs worse on four of the other five benchmarks. Multiple attempts alone do not guarantee a better answer.',hybrid:'Combining a coordinator with peer exchange improves Finance Agent by 25.6 points, but lowers PlanCraft by 22.2 points. The most connected architecture does not consistently achieve the best result.'};
const mean=rows=>rows.reduce((s,r)=>s+Number(r.performance),0)/rows.length;
function render(a){document.querySelectorAll('[data-architecture]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.architecture===a)));document.querySelector('#candidate-label').textContent=title(a)+' team';document.querySelector('#architecture-note').textContent=notes[a];document.querySelector('#benchmark-reading').textContent=readings[a];document.querySelector('#benchmark-chart').innerHTML=Object.entries(names).map(([d,name])=>{const rows=DATA.benchmarks.filter(r=>r.dataset===d);const base=mean(rows.filter(r=>r.architecture==='single-agent'));const team=mean(rows.filter(r=>r.architecture==='multi-agent-'+a));const delta=(team-base)*100;return `<div class="bench-row"><span class="name">${name}</span><div class="bars" role="img" aria-label="One agent ${(base*100).toFixed(1)} percent; ${title(a)} team ${(team*100).toFixed(1)} percent."><div class="bar" style="--value:${base*100}%"><span>${(base*100).toFixed(1)}%</span></div><div class="bar candidate" style="--value:${team*100}%"><span>${(team*100).toFixed(1)}%</span></div></div><div class="delta ${delta>=0?'positive':'negative'}">${delta>=0?'+':'−'}${Math.abs(delta).toFixed(1)} pp<small>vs one agent</small></div></div>`}).join('')}
render('centralized');document.querySelectorAll('[data-architecture]').forEach(b=>b.addEventListener('click',()=>render(b.dataset.architecture)));
let scheduled=false;function markSection(){scheduled=false;let id='question';for(const section of document.querySelectorAll('section[id]')){if(section.getBoundingClientRect().top<=innerHeight*.32)id=section.id;}document.querySelectorAll('.contents a').forEach(a=>{if(a.hash==='#'+id)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current')});}addEventListener('scroll',()=>{if(!scheduled){scheduled=true;requestAnimationFrame(markSection)}},{passive:true});markSection();

// These paths select editorial evidence and questions, not predicted outcomes.
const pathButtons = document.querySelectorAll('[data-path]');
const paths = document.querySelectorAll('[data-workflow]');
function selectPath(name) {
  pathButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.path === name)));
  paths.forEach(path => { path.hidden = path.dataset.workflow !== name; });
}
if (pathButtons.length) {
  document.querySelector('.workflow-buttons').hidden = false;
  selectPath('evidence');
  pathButtons.forEach(button => button.addEventListener('click', () => selectPath(button.dataset.path)));
}
