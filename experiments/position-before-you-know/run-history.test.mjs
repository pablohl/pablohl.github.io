import test from 'node:test';
import assert from 'node:assert/strict';
import {createRun,advanceRun} from './run-model.mjs';
import {actionHistory,comparisonChange} from './run-history.mjs';
test('redirection history distinguishes early wrong-way commitment from a late direct run',()=>{
  let redirected=advanceRun(createRun(),'far');redirected=advanceRun(redirected);redirected=advanceRun(redirected,'near');redirected=advanceRun(redirected);
  assert.equal(actionHistory(redirected),'0 s: ran toward far post → 2 s: redirected toward near post');
  let late=createRun();for(let i=0;i<3;i++)late=advanceRun(late);late=advanceRun(late,'near');
  assert.equal(actionHistory(late),'0–3 s: waited centrally → 3 s: ran toward near post');
});
test('waiting and continuing do not invent direction changes or mutate the record',()=>{
  let s=advanceRun(advanceRun(createRun()));s=advanceRun(s,'near');s=advanceRun(s);
  const snapshot=structuredClone(s);
  assert.equal(actionHistory(s),'0–2 s: waited centrally → 2 s: ran toward near post');
  assert.deepEqual(s,snapshot);
  assert.equal(actionHistory(createRun()),'No action taken yet');
});

test('comparison calls out unchanged gaps and successful outcomes without claiming a reversal',()=>{
  const finish=s=>{while(s.time<4)s=advanceRun(s);return s;};
  const earlyWrong=finish(advanceRun(createRun('far'),'near'));
  let lateWrong=createRun('far');lateWrong=advanceRun(advanceRun(lateWrong));lateWrong=finish(advanceRun(lateWrong,'near'));
  assert.match(comparisonChange(earlyWrong,lateWrong),/^Same final gap/);
  assert.equal(comparisonChange(earlyWrong,earlyWrong),'Same actions, same outcome.');
  const earlyRight=finish(advanceRun(createRun(),'near'));
  let lateRight=advanceRun(advanceRun(createRun()));lateRight=finish(advanceRun(lateRight,'near'));
  assert.equal(comparisonChange(earlyRight,lateRight),'Different actions; both runs reached the cross.');
  assert.equal(comparisonChange(earlyRight,earlyWrong),'');
  assert.equal(comparisonChange(earlyRight,createRun()),'');
});
