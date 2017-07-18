import * as d3 from 'd3';

import { boardLinks, userLinks, } from './links';
import { boardForce, fCenter, fLink, manyBody, nodeInit, playerForce, refCenter,
  xForce, xRefForce, yForce, yRefForce, } from './forces';
import { dragNodes, simTickLink, simTickNode, ticked, tickLinks, tickNodes, } from './events';

export const simInit = game => [
  nodeInit, manyBody, boardForce(game), playerForce(game),
].reduce((sim, fn) => fn(sim), game);

export const mountSimulation = game => sim => [ fCenter, manyBody, xForce, yForce,
  simTickNode(sim.nodes()),
  simTickLink(userLinks(game)),
  dragNodes(sim.nodes()),
].reduce((s, fn) => fn(s), sim);

export const mountRefSimulation = ref => game => (sim) => {
  console.log('game', userLinks(game));

  return [ refCenter(ref), xRefForce(ref), yRefForce(ref),
    simTickNode(sim.nodes()),

    simTickLink(sim.force('players').links()),
    dragNodes(sim.nodes()),
  ].reduce((s, fn) => fn(s), sim);
};

export const refSimulation = ref => sim => ref && [
  refCenter(ref), xRefForce(ref), yRefForce(ref),
  simTickNode(sim.nodes()),
  simTickLink(sim.force('players').links()),
  dragNodes(sim.nodes()),
].reduce((s, fn) => fn(s), sim);

// export const setLinks = (a);
