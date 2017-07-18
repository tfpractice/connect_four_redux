import * as d3 from 'd3';
import { Board, Game, Node, } from 'connect_four_functional';
import { flattenBin as flatten, spread, } from 'fenugreek-collections';
import { Compare, Filter, Node as GdNode, Grid, } from 'game_grid';
import { boardScaleX, boardScaleY, getBox, selectorScaleX, selectorScaleY,
  setContainer, } from './scales';
import { boardLinks, cIDs, graphLinks, playerLinks, userLinks, } from './links';
import { boardForce, fCenter, fLink, manyBody, nodeInit,
  playerForce, refCenter, xForce, xRefForce, yForce, yRefForce, } from './forces';
import { dragEnded,
  dragged,
  dragNodes,
  dragStarted,
  simTickLink,
  simTickNode,
  ticked,
  tickLinks,
  tickNodes, } from './events';

export const createSim = sim => fCenter(manyBody(sim));

export const loadGameGraph = game => [
  nodeInit,
  fLink(boardLinks(game)),
  createSim,
  tickNodes(game.nodes),
  tickLinks(boardLinks(game)),
  dragNodes(game.nodes), ]
  .reduce((sim, fn) => fn(sim), game);

export const simInit = game => [
  nodeInit, manyBody, boardForce(game), playerForce(game),
].reduce((sim, fn) => fn(sim), game);

export const mountSimulation = game => (sim) => {
  console.log('game', userLinks(game));
  console.log('sim', sim);
  console.log('sim.force(', sim.force('players').links());
  console.log('sim.force(', sim.force('players').links(userLinks(game)).links());
  console.log('userLinks(game)', userLinks(game));
  return [ fCenter, manyBody, xForce, yForce,
    simTickNode(sim.nodes()),
    simTickLink(userLinks(game)),
    dragNodes(sim.nodes()),
  ].reduce((s, fn) => fn(s), sim);
};

export const refSimulation = ref => sim => ref && [
  refCenter(ref), xRefForce(ref), yRefForce(ref),
  simTickNode(sim.nodes()),
  simTickLink(sim.force('players').links()),
  dragNodes(sim.nodes()),
].reduce((s, fn) => fn(s), sim);
