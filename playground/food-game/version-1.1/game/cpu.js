// Computer decisions are separate from the rules and browser rendering.
(function(root) {
  root.GameCPU = {
    choose(state, rng=Math.random) {
      const p=root.GameMechanics.current(state);
      if(state.phase==='ready') return {type:state.snack?'snack':'meal',meal:root.GameConfig.meals[Math.floor(rng()*3)]};
      if(state.phase==='classify') {
        const accurate=rng()<root.GameConfig.cpuAccuracy[p.mode];
        return {type:'answer',healthy:accurate?state.food.healthy:!state.food.healthy};
      }
      if(state.phase==='decide') return {type:state.food.healthy&&(state.snack||p.healthy<root.GameConfig.healthyLimit)?'eat':'skip'};
      if(state.phase==='feedback') return {type:'next'};
      return null;
    },
  };
})(globalThis);
