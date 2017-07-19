import * as d3 from 'd3';

import { boardLinks, playerLinks, userLinks, } from './links';
import { boardForce, colForce, collide, fCenter, fLink, manyBody, nodeInit,
  playerForce, refCenter, rowForce, xForce, xRefForce, yForce, yRefForce, } from './forces';
import { canvasDrag, dragNodes, gameTick, simTickLink, simTickNode, ticked, tickLinks, tickNodes, } from './events';

export const simInit = game => [
  nodeInit, manyBody, collide, playerForce(game), boardForce(game),
].reduce((sim, fn) => fn(sim), game);

export const mountSimulation = game => sim => [ fCenter, manyBody, xForce, yForce,
  simTickNode(sim.nodes()),
  simTickLink(userLinks(game)),
  dragNodes(sim.nodes()),
].reduce((s, fn) => fn(s), sim);

export const refSimulation = ref => sim => ref && [
  refCenter(ref), xRefForce(ref), yRefForce(ref),
  
  simTickNode(sim.nodes()),
  simTickLink(sim.force('players').links()),
  dragNodes(sim.nodes()),
].reduce((s, fn) => fn(s), sim);

export const mountRefSimulation = ref => game => (sim) => {
  // console.log('mountRefSimulation game', playerLinks(game));

  const a = 0;

  return [ refCenter(ref), xRefForce(ref), yRefForce(ref),
    colForce(ref), rowForce(ref),
    gameTick(ref)(game),

    // simTickNode(sim.nodes()),
    // simTickLink(sim.force('players').links()),
    canvasDrag(ref),

    // dragNodes(sim.nodes()),

  ].reduce((s, fn) => fn(s), sim);
};

// export const setLinks = (a);
