export const SPEED = 10;
export const WINDOW = 3;
export const INITIAL = Object.freeze({x:60,y:26});
export const DESTINATIONS = Object.freeze({attack:Object.freeze({x:82,y:20}),cover:Object.freeze({x:18,y:42})});
export function position(x,y){if(!Number.isFinite(x)||!Number.isFinite(y))throw new TypeError('Finite coordinates required');return {x:Math.max(25,Math.min(65,x)),y:Math.max(18,Math.min(50,y))};}
export function evaluate(start,kind){const target=DESTINATIONS[kind];if(!target)throw new TypeError('Unknown continuation');const distance=Math.hypot(target.x-start.x,target.y-start.y),travel=distance/SPEED,margin=WINDOW-travel;const fraction=distance===0?1:Math.min(1,SPEED*WINDOW/distance);return {kind,start:{...start},target:{...target},distance,travel,margin,onTime:margin>=-1e-9,end:{x:start.x+(target.x-start.x)*fraction,y:start.y+(target.y-start.y)*fraction}};}
export function same(a,b){return !!a&&!!b&&a.x===b.x&&a.y===b.y;}
