import test from 'node:test';
import assert from 'node:assert/strict';
import {createRun,advanceRun,reach,runOutcome} from './run-model.mjs';
function finish(s){while(s.time<4)s=advanceRun(s);return s;}
test('both posts are reachable before committing; waiting eventually loses both',()=>{let s=createRun();assert.ok(reach(s,'near').reachable&&reach(s,'far').reachable);s=advanceRun(advanceRun(s));assert.ok(reach(s,'near').reachable&&reach(s,'far').reachable);s=advanceRun(s);assert.ok(!reach(s,'near').reachable&&!reach(s,'far').reachable);});
test('committing once the cross is clear arrives at the deadline; another second of waiting is late',()=>{let s=advanceRun(advanceRun(createRun()));assert.equal(runOutcome(finish(advanceRun(s,'near'))).arrived,true);s=advanceRun(s);assert.equal(runOutcome(finish(advanceRun(s,'near'))).arrived,false);});
test('early runs can succeed, but an early run the other way can lose the actual destination',()=>{assert.equal(runOutcome(finish(advanceRun(createRun(),'near'))).arrived,true);const s=advanceRun(advanceRun(createRun(),'far'));assert.equal(reach(s,'near').reachable,false);assert.equal(runOutcome(finish(advanceRun(s,'near'))).arrived,false);});
test('the alternate cross obeys identical movement rules',()=>{const s=advanceRun(advanceRun(createRun('far')));assert.equal(runOutcome(finish(advanceRun(s,'far'))).arrived,true);});
test('replay is deterministic, state is immutable, and ended play cannot advance',()=>{const initial=createRun();assert.deepEqual(advanceRun(initial,'near'),advanceRun(initial,'near'));assert.equal(initial.time,0);assert.equal(initial.path.length,1);const done=finish(initial);assert.equal(advanceRun(done,'far'),done);assert.equal(done.time,4);});
