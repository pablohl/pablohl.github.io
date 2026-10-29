import test from 'node:test';
import assert from 'node:assert/strict';
import {evaluate,position,INITIAL,DESTINATIONS} from './model.mjs';
test('forward and deeper starts expose opposite trade-offs',()=>{const forward={x:65,y:26},deep={x:25,y:42};assert.equal(evaluate(forward,'attack').onTime,true);assert.equal(evaluate(forward,'cover').onTime,false);assert.equal(evaluate(deep,'attack').onTime,false);assert.equal(evaluate(deep,'cover').onTime,true);});
test('travel uses one speed and one window for both continuations',()=>{for(const kind of ['attack','cover']){const r=evaluate(INITIAL,kind);assert.equal(r.travel,r.distance/10);assert.equal(r.margin,3-r.travel);assert.ok(Math.hypot(r.end.x-INITIAL.x,r.end.y-INITIAL.y)<=30+1e-9);}});
test('arrival boundary and small positive/negative margins are classified before rounding',()=>{assert.equal(evaluate({x:52,y:20},'attack').onTime,true);assert.equal(evaluate({x:51.99,y:20},'attack').onTime,false);assert.equal(evaluate({x:52.01,y:20},'attack').onTime,true);});
test('replay is deterministic and does not mutate saved positions',()=>{const a={...INITIAL},snapshot={...a};assert.deepEqual(evaluate(a,'attack'),evaluate(a,'attack'));assert.deepEqual(a,snapshot);evaluate(a,'cover');assert.deepEqual(a,snapshot);assert.deepEqual(DESTINATIONS.attack,{x:82,y:20});});
test('bounds, finite input, target identity, and zero travel',()=>{assert.deepEqual(position(100,-20),{x:65,y:18});assert.throws(()=>position(NaN,10));assert.throws(()=>evaluate(INITIAL,'unknown'));assert.equal(evaluate(DESTINATIONS.attack,'attack').travel,0);});
test('same distance can give an unchanged result despite another starting position',()=>{assert.equal(evaluate({x:60,y:18},'attack').margin,evaluate({x:60,y:22},'attack').margin);});
