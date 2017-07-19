import * as d3 from 'd3';

import { boardLinks, userLinks, } from './links';
import { boardForce, colForce, collide, fCenter, manyBody, nodeInit,
  playerForce, refCenter, rowForce, xForce, xRefForce, yForce, yRefForce, } from './forces';
import { dragNodes, simTickLink, simTickNode, } from './events';

export const simInit = game => [
  nodeInit, manyBody, collide, playerForce(game), boardForce(game),
].reduce((sim, fn) => fn(sim), game);

export const mountRefSimulation = ref => game => (sim) => {
  const a = 0;

  return [ refCenter(ref), xRefForce(ref), yRefForce(ref),
    colForce(ref), rowForce(ref),

    simTickNode(sim.nodes()),

    simTickLink(sim.force('players').links()),

    dragNodes(sim.nodes()),
  ].reduce((s, fn) => fn(s), sim);
};

export const mountSimulation = ref => (sim) => {
  const a = 0;

  return [ refCenter(ref), xRefForce(ref), yRefForce(ref),
    colForce(ref), rowForce(ref),
    simTickNode(sim.nodes()),
    simTickLink(sim.force('players').links()),
    dragNodes(sim.nodes()),
  ].reduce((s, fn) => fn(s), sim);
};
export const refSimulation = mountSimulation;
