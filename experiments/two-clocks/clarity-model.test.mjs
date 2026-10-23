import test from 'node:test';
import assert from 'node:assert/strict';
import {SCENARIOS,STORIES,createRun,viewAt,start,pause,advance,ask,decide,openingRadius} from './clarity-model.mjs';
for(const [index,scenario] of SCENARIOS.entries())for(const story of Object.keys(STORIES)){
 test(`${scenario.name} / ${story}: conversations, expiry, decision and replay`,()=>{
  const r=createRun(index,story);
  assert.equal(viewAt(r).evidence.length,0);
  ask(r,'manager');assert.ok(r.running);
  assert.throws(()=>ask(r,'teammate'),/unavailable/);
  advance(r,scenario.conversation-1);assert.equal(r.evidence.length,0);
  pause(r);advance(r,20);assert.equal(r.time,scenario.conversation-1);
  start(r);advance(r,1);assert.equal(r.evidence[0].short,STORIES[story].manager.short);
  assert.equal(viewAt(r,scenario.conversation-.01).evidence.length,0);
  ask(r,'teammate');advance(r,scenario.conversation);
  assert.equal(r.evidence[1].short,STORIES[story].teammate.short);
  const options=viewAt(r).options;
  assert.equal(options[0].available,index===0);
  assert.equal(options[1].available,true);
  decide(r,story==='fit'?'join':'decline');
  const saved=JSON.stringify(r.decision);advance(r,50);
  assert.equal(JSON.stringify(r.decision),saved);
  assert.equal(viewAt(r,0).evidence.length,0);
  assert.throws(()=>viewAt(r,r.time+1),/experienced/);
  assert.throws(()=>decide(r,'join'),/ended/);
 });
 test(`${scenario.name} / ${story}: answer order follows the reader`,()=>{
  const r=createRun(index,story);ask(r,'teammate');advance(r,scenario.conversation);
  assert.equal(r.evidence[0].id,'teammate');
  assert.equal(viewAt(r).evidence.some(e=>e.id==='manager'),false);
  decide(r,'join');assert.equal(r.decision.evidence.length,1);
 });
}
test('Expiry during a conversation does not fabricate its answer',()=>{
 const r=createRun(1);start(r);advance(r,20);ask(r,'manager');advance(r,20);
 assert.equal(r.time,30);assert.equal(r.ended,'closed');assert.equal(r.evidence.length,0);
 assert.equal(viewAt(r,30).evidence.length,0);
 assert.throws(()=>decide(r,'join'),/ended/);
});
test('At sixty seconds a slow offer survives and can be accepted',()=>{
 const r=createRun();start(r);advance(r,100);assert.equal(r.time,60);assert.equal(r.ended,'limit');
 assert.equal(viewAt(r).options[1].available,true);decide(r,'join');assert.equal(r.decision.time,60);
});
test('Decision before answer preserves unknowns, even in replay',()=>{
 const r=createRun();ask(r,'manager');advance(r,3);decide(r,'shape');advance(r,20);
 assert.match(r.decision.terms,/won’t lead the whole product/);assert.equal(r.decision.evidence.length,0);assert.equal(viewAt(r).evidence.length,0);
});
test('Deadline is exclusive and aperture is continuous',()=>{
 for(const [index,s] of SCENARIOS.entries())for(const [i,t] of s.deadlines.entries()){
  if(t>60)continue;
  const r=createRun(index);start(r);advance(r,t);
  assert.equal(viewAt(r).options[i].available,false);
  assert.ok(Math.abs(openingRadius(s,t-.001)-openingRadius(s,t+.001))<.1);
 }
});
test('Selecting another conversation while paused does not resume time',()=>{
 const r=createRun();ask(r,'manager');advance(r,6);pause(r);ask(r,'teammate');advance(r,30);
 assert.equal(r.time,6);assert.equal(r.evidence.length,1);start(r);advance(r,6);assert.equal(r.evidence.length,2);
});

test('Exactly two offers: support expires first, the original job remains',()=>{
 for(const [index,s] of SCENARIOS.entries())for(const story of Object.keys(STORIES)){
  const r=createRun(index,story);start(r);
  assert.deepEqual(viewAt(r).options.map(o=>o.id),['shape','join']);
  advance(r,s.deadlines[0]);
  assert.deepEqual(viewAt(r).options.filter(o=>o.available).map(o=>o.id),['join']);
  assert.throws(()=>decide(r,'shape'),/unavailable/);
  assert.throws(()=>decide(r,'later'),/unavailable/);
  decide(r,'join');assert.match(r.decision.terms,/lead the full product/);
 }
});
