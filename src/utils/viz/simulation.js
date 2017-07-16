import * as d3 from 'd3';
import { Board, Game, Node, } from 'connect_four_functional';
import { flattenBin as flatten, spread, } from 'fenugreek-collections';
import { Compare, Node as GdNode, Grid, } from 'game_grid';
import { Graph, } from 'graph-curry';
import { boardScaleX, boardScaleY, getBox, setContainer, } from './scales';
import { boardLinks, cIDs, graphLinks, playerLinks, } from './links';

const { sameCol, } = Compare;
const { board, players: getPlayers, } = Game;
const { graph, nodes: getNodes, neighbors: nabes, } = Graph;
const { joinGrid, } = Grid;

export const dragStarted = force => (d) => {
  if (!d3.event.active) force.alphaTarget(0.3).restart();
  d.fx = d.x;
  d.fy = d.y;
};

export const dragged = force => (d) => {
  d.fx = d3.event.sourceEvent.x;
  d.fy = d3.event.sourceEvent.y;
};

export const dragEnded = force => (d) => {
  if (!d3.event.active) force.alphaTarget(0);
  d.fx = null;
  d.fy = null;
};

export const linkSelect = (links) => {
  d3.select('.boardVis')
    .selectAll('.linkLine')
    .data(links);
};

export const nodeSelect = nArr =>
  d3.select('.boardVis')
    .selectAll('.column')
    .data(cIDs(nArr))
    .select('.colGroup')
    .selectAll('.node')
    .data(column => nArr.filter(sameCol({ column, })))
    .select('.nodeCircle')
    .attr('opacity', 0.4)
;
export const updateNodes = (domNodes = d3.selectAll('.nodeCircle')) => (arg) => {
  domNodes
    .attr('r', 1 / 4)
    .attr('cx', (({ x, }) => boardScaleX()(getBox('.boardVis'))(x)))
    .attr('cy', (({ y, }) => boardScaleY()(getBox('.boardVis'))(y)));
};

export const updateLinks = (domLinks = d3.selectAll('.linkLine')) => () => {
  domLinks
    .attr('x1', d => d.source.y)
    .attr('y1', d => d.source.x)
    .attr('x2', d => d.target.y)
    .attr('y2', d => d.target.x);
};

const manyBody = sim => sim.force('charge', d3.forceManyBody());
const fCenter = sim => sim.force('center', d3.forceCenter(getBox('.boardVis').height / 2, getBox('.boardVis').height / 2));

const fLink = links => sim => sim.force('link',
  d3.forceLink(links).id((d, i) => d.id)
);

export const nodeInit = game =>
  (d3.forceSimulation(game.nodes));
  
export const createSim = sim =>
  fCenter(manyBody(sim));
  
export const dragNodes = nodes => sim => nodeSelect(nodes)
  .call(setContainer(d3.drag())
    .on('start', dragStarted(sim))
    .on('drag', dragged(sim))
    .on('end', dragEnded(sim)));
    
export const tickLinks = links => (sim) => {
  const a = 0;
  
  return sim
    .on('tick.link', updateLinks(linkSelect(links)));
};

export const tickNodes = nodes => sim => sim
  .on('tick.node', updateNodes(nodeSelect(nodes)));

// export const boardLinks = game =>
//   [ board, joinGrid, graphLinks, ].reduce((a, fn) => fn(a), game);
  
const userLinks = g =>
  getPlayers(g).map(playerLinks(g.nodes)).reduce(flatten, []);

export const loadGameGraph = game => [
  nodeInit,
  fLink(boardLinks(game)),
  createSim,
  tickNodes(game.nodes),
  tickLinks(boardLinks(game)),
  dragNodes(game.nodes), ]
  .reduce((sim, fn) => fn(sim), game);

export const simInit = game =>
  [ nodeInit, fLink(boardLinks(game)), ].reduce((sim, fn) => fn(sim), game);

export const mountSimulation = sim =>
  [ fCenter, manyBody, tickNodes(sim.nodes), ].reduce((s, fn) => fn(s), sim);
