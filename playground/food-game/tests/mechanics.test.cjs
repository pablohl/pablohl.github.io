const assert=require('node:assert/strict');
require('../game/config.js');require('../game/mechanics.js');require('../game/content.js');require('../game/cpu.js');
const M=GameMechanics;
const good={healthy:true},bad={healthy:false};
const start=(mode='easy',n=1,days=2)=>M.create({days,players:Array.from({length:n},()=>({mode,category:'child'}))},()=>0);
const begun=(s,f=good)=>M.begin(s,f,'Lunch');
let s=start();s=M.answer(begun(s),false);assert.equal(s.players[0].mistakes,1);assert.equal(s.players[0].healthy,0);
s=M.next(s);s=M.answer(begun(s),true);s=M.eat(s);assert.equal(s.players[0].score,1);assert.equal(s.players[0].mistakes,1);
for(const [mode,limit] of Object.entries(GameConfig.mistakes)){
 let t=start(mode);for(let i=1;i<=limit;i++){t=M.answer(begun({...t,phase:'ready'}),false);assert.equal(t.players[0].out,i===limit);}
}
s=start();s=M.answer(begun(s,bad),false);assert.equal(s.players[0].unhealthy,0);s=M.skip(s);assert.equal(s.players[0].unhealthy,0);
s=start();s=M.eat(M.answer(begun(s,bad),false));assert.equal(s.players[0].score,0);assert.equal(s.players[0].out,false);
s=M.eat(M.answer(begun({...s,phase:'ready'},bad),false));assert.equal(s.players[0].out,true);
s=start();s.players[0].healthy=3;s.snack=true;s=M.eat(M.answer(begun(s),true));assert.equal(s.players[0].healthy,3);assert.equal(s.players[0].score,1);
s=start();s.snack=true;s=M.answer(begun(s,bad),false);
assert.equal(s.phase,'ready');assert.equal(s.event,'snack-reject');assert.equal(s.players[0].out,false);assert.equal(s.players[0].mistakes,0);
s=M.answer(begun(s),true);s=M.skip(s);assert.equal(s.players[0].out,true);assert.equal(s.players[0].reason,'refused-snack');
s=start();s.snack=true;s=M.answer(begun(s),false);assert.equal(s.phase,'ready');assert.equal(s.players[0].mistakes,1);assert.equal(s.players[0].out,false);
s=start('easy',3);s=M.skip(M.answer(begun(s),true));s=M.next(s);assert.equal(s.turn,1);
s.players[1].out=true;s.phase='feedback';s=M.next(s);assert.equal(s.turn,2);
// Full two-day game, three players: four meal rounds plus one snack each day.
s=start('easy',3);let turns=0;while(s.phase!=='finished'&&turns<100){
 s=M.answer(begun(s),true);s=s.snack||M.current(s).healthy<3?M.eat(s):M.skip(s);s=M.next(s,()=>0);turns++;
}
assert.equal(turns,30);assert.equal(s.phase,'finished');assert.deepEqual(s.players.map(p=>p.score),[8,8,8]);assert.equal(M.winners(s).length,3);
s=start();s.round=4;s.snackDone=true;s.phase='feedback';s.players[0].mistakes=2;s=M.next(s,()=>0);assert.equal(s.day,2);assert.equal(s.players[0].mistakes,0);
s=M.answer(begun(s),false);assert.equal(s.players[0].out,false);
for(const category of ['baby','child','adult'])for(const mode of ['easy','medium','hard']){
 const level=GameContent.level(category,mode),pool=GameContent.foods.filter(f=>f.level<=level&&f.level>=Math.max(0,level-1));
 assert(pool.some(f=>f.healthy));assert(pool.some(f=>!f.healthy));
}
console.log('Passed: daily limits/reset, classification/eating separation, treats, snack rejection/eating/refusal, turn order, full game, ties, and all food pools.');

// CPU uses the same transitions, skips treats, eats healthy snacks, and can make mistakes.
s=M.create({days:1,players:[{controller:'human',mode:'easy',category:'child'},{controller:'cpu',mode:'easy',category:'child'}]},()=>0);
assert.equal(s.players[0].controller,'human');assert.equal(s.players[1].controller,'cpu');
s.turn=1;s=begun(s);assert.deepEqual(GameCPU.choose(s,()=>0),{type:'answer',healthy:true});
assert.deepEqual(GameCPU.choose(s,()=>0.99),{type:'answer',healthy:false});
s=M.answer(s,true);assert.equal(GameCPU.choose(s).type,'eat');
s={...s,snack:true};s.players[1].healthy=3;assert.equal(GameCPU.choose(s).type,'eat');
s=M.skip(s);s=M.next(s);assert.equal(s.turn,0);assert.equal(s.players[1].controller,'cpu');assert.equal(s.players[1].out,true);
console.log('Passed: CPU decisions, fixed slot ownership, snack refusal, and eliminated-player skipping.');
