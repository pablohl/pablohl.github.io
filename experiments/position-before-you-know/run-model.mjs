export const RUN_SPEED = 10;
export const ARRIVAL = 4;
export const START = Object.freeze({x:68,y:35});
export const POSTS = Object.freeze({near:Object.freeze({x:84,y:23}),far:Object.freeze({x:84,y:47})});
export function createRun(story='near') {
  if (!POSTS[story]) throw new TypeError('Unknown cross');
  return {story,time:0,player:{...START},direction:null,committedAt:null,path:[{...START}],actions:[]};
}
export function advanceRun(state, choice=null) {
  if (state.time >= ARRIVAL) return state;
  if (choice !== null && !POSTS[choice]) throw new TypeError('Unknown run');
  const direction = choice ?? state.direction;
  let player = {...state.player};
  if (direction) {
    const target=POSTS[direction], distance=Math.hypot(target.x-player.x,target.y-player.y);
    const fraction=distance===0?0:Math.min(1,RUN_SPEED/distance);
    player={x:player.x+(target.x-player.x)*fraction,y:player.y+(target.y-player.y)*fraction};
  }
  return {...state,time:state.time+1,player,direction,
    committedAt:state.committedAt ?? (choice ? state.time : null),
    path:[...state.path,{...player}],actions:[...state.actions,{time:state.time,choice:direction}]};
}
export function reach(state, post) {
  const distance=Math.hypot(POSTS[post].x-state.player.x,POSTS[post].y-state.player.y);
  const margin=ARRIVAL-state.time-distance/RUN_SPEED;
  return {distance,margin,reachable:margin>=-1e-9};
}
export function runOutcome(state) {
  if (state.time < ARRIVAL) return null;
  const gap=reach(state,state.story).distance;
  return {arrived:gap<1e-8,gap,committedAt:state.committedAt,story:state.story};
}
