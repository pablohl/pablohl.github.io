// Pure game transitions. No DOM, timers, story strings, or styling.
// Randomness and elapsed-time events are supplied by the caller for testability.
(function(root) {
  const C=root.GameConfig;
  function create(options,rng=Math.random) {
    const players=options.players.map((p,i)=>({...p,controller:p.controller==='cpu'?'cpu':'human',id:i+1,score:0,healthy:0,unhealthy:0,mistakes:0,out:false}));
    return {players,days:options.days,day:1,round:1,turn:0,phase:'ready',snack:false,snackDone:false,
      snackAfter:1+Math.floor(rng()*3),food:null,meal:null,event:null};
  }
  function current(s) {return s.players[s.turn];}
  function begin(s,food,meal) {
    if(s.phase!=='ready') return s;
    return {...s,food,meal,phase:'classify',event:null};
  }
  function updatePlayer(s,p) {return {...s,players:s.players.map((x,i)=>i===s.turn?p:x)};}
  function answer(s,healthy) {
    if(s.phase!=='classify') return s;
    if(healthy===s.food.healthy) {
      if(s.snack&&!s.food.healthy) return {...s,phase:'ready',food:null,event:'snack-reject'};
      return {...s,phase:'decide',event:'correct'};
    }
    const p={...current(s)}; p.mistakes++;
    if(p.mistakes>=C.mistakes[p.mode]) {p.out=true;p.reason='mistakes';}
    return {...updatePlayer(s,p),phase:s.snack&&!p.out?'ready':'feedback',event:p.out?'mistake-out':'wrong'};
  }
  function eat(s) {
    if(s.phase!=='decide') return s;
    if(s.snack&&!s.food.healthy) return s; // Unhealthy snacks are rejected, never offered for eating.
    const p={...current(s)}; let event='ate';
    if(s.food.healthy) {
      if(!s.snack && p.healthy>=C.healthyLimit) return {...s,event:'full'};
      if(!s.snack) p.healthy++;
      p.score++;
    } else {
      p.unhealthy++;
      if(s.snack || p.unhealthy>C.unhealthyLimit) {p.out=true;p.reason=s.snack?'snack':'treats';event='food-out';}
    }
    return {...updatePlayer(s,p),phase:'feedback',event};
  }
  function skip(s) {
    if(s.phase!=='decide') return s;
    if(s.snack) {
      const p={...current(s),out:true,reason:'refused-snack'};
      return {...updatePlayer(s,p),phase:'feedback',event:'refused-snack'};
    }
    return {...s,phase:'feedback',event:'skip'};
  }
  function next(s,rng=Math.random) {
    if(s.phase!=='feedback') return s;
    if(s.players.every(p=>p.out)) return {...s,phase:'finished'};
    const nextIndex=s.players.findIndex((p,i)=>i>s.turn&&!p.out);
    if(nextIndex!==-1) return {...s,turn:nextIndex,phase:'ready',food:null,event:null};
    let n={...s,turn:s.players.findIndex(p=>!p.out),phase:'ready',food:null,event:null};
    if(s.snack) {n.snack=false;n.snackDone=true;n.round++;}
    else if(!s.snackDone && s.round===s.snackAfter) {n.snack=true;return n;}
    else n.round++;
    if(n.round>C.mealRounds) {
      if(n.day>=n.days) return {...n,phase:'finished'};
      n={...n,day:n.day+1,round:1,snackDone:false,snackAfter:1+Math.floor(rng()*3),
        players:n.players.map(p=>p.out?p:{...p,healthy:0,unhealthy:0,mistakes:0})};
    }
    return n;
  }
  function winners(s) {
    const alive=s.players.filter(p=>!p.out), top=Math.max(...alive.map(p=>p.score));
    return alive.filter(p=>p.score===top);
  }
  root.GameMechanics={create,current,begin,answer,eat,skip,next,winners};
})(globalThis);
