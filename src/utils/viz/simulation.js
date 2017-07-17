import * as d3 from 'd3';
import { Board, Game, Node, } from 'connect_four_functional';
import { flattenBin as flatten, spread, } from 'fenugreek-collections';
import { Compare, Filter, Node as GdNode, Grid, } from 'game_grid';
import { boardScaleX, boardScaleY, getBox, selectorScaleX, selectorScaleY,
  setContainer, } from './scales';
import { boardLinks, cIDs, graphLinks, playerLinks, userLinks, } from './links';
import { gameX, gameY, linkSelect, nodeSelect, updateLinks, updateNodes, updateSim, } from './selections';

export const dragStarted = force => (d) => {
  if (!d3.event.active) force.alphaTarget(0.3).restart();
  d.fx = d.x;
  d.fy = d.y;
};

export const dragged = force => (d) => {
  console.log('d', d);
  d.fx = d3.event.sourceEvent.x;
  d.fy = d3.event.sourceEvent.y;
};

export const dragEnded = force => (d) => {
  if (!d3.event.active) force.alphaTarget(0);
  d.fx = null;
  d.fy = null;
};

export const dragNodes = nodes => sim => nodeSelect(nodes)
  .call(setContainer(d3.drag())
    .on('start', dragStarted(sim))
    .on('drag', dragged(sim))
    .on('end', dragEnded(sim)));

export const tickLinks = links => (sim) => {
  const a = 0;
  
  return sim
    .on('tick', updateLinks(linkSelect(links)));
};

export const tickNodes = nodes => sim => sim
  .on('tick.node', updateNodes(nodeSelect(nodes)));

export const ticked = sim => sim.on('tick', updateSim(sim));

const manyBody = sim => sim.force('charge', d3.forceManyBody());
const fCenter = sim => sim.force('center', d3.forceCenter(getBox('.boardVis').height / 2, getBox('.boardVis').height / 2));

const fLink = links => sim => sim.force('link',
  d3.forceLink(links).id((d, i) => d.id)
);

export const boardForce = game => sim => sim.force('board',
  d3.forceLink(boardLinks(game)).id((d, i) => d.id)
);

export const playerForce = game => sim => sim.force('players',
  d3.forceLink(userLinks(game)).id((d, i) => d.id)
);

export const nodeInit = game => d3.forceSimulation(game.nodes);

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
  nodeInit, boardForce(game), playerForce(game), fLink(boardLinks(game)),
].reduce((sim, fn) => fn(sim), game);

export const mountSimulation = sim =>
  [ fCenter, manyBody,
    ticked,

    // tickNodes(sim.nodes()),
    // tickLinks(sim.force('players').links()),
    dragNodes(sim.nodes()),
  ].reduce((s, fn) => fn(s), sim);
