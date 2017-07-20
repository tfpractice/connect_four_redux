import { boardForce, col2X, colForce, collide, manyBody, nodeInit,
  playerForce, refCenter, row2Y,
  rowForce, xRefForce, yRefForce, } from './forces';
import { dragNodes, simTickLink, simTickNode, } from './events';

export const simInit = game => [
  nodeInit, manyBody, collide, playerForce(game), boardForce(game),
].reduce((sim, fn) => fn(sim), game);

export const applyTicks = sim => [ 
  simTickNode(sim.nodes()),
  simTickLink(sim.force('players').links()),
  dragNodes(sim.nodes()), ]
  .reduce((a, fn) => fn(a), sim);
  
export const mountSimulation = ref => (sim) => {
  const a = 0;

  console.log('ref', ref);
  return [ refCenter(ref), xRefForce(ref), yRefForce(ref),
    colForce(ref), rowForce(ref),
    col2X(ref), row2Y(ref),
  ].reduce((s, fn) => fn(s), sim);
};
  
