import * as d3 from 'd3';
import { Board, Game, Node, } from 'connect_four_functional';
import { flattenBin as flatten, spread, } from 'fenugreek-collections';
import { Compare, Components, Node as GdNode, Grid, } from 'game_grid';
import { Graph, } from 'graph-curry';

const { omniComps, } = Components;
const { sameCol, } = Compare;
const { samePlayer, } = Node;
const { column: getCol, } = GdNode;
const { playerGraph, } = Board;
const { board, players: getPlayers, } = Game;
const { graph, nodes: getNodes, neighbors: nabes, } = Graph;
const { joinGrid, colGrid, rowGrid, posGrid, negGrid, } = Grid;

export const cIDs = nodes => spread(new Set(nodes.map(getCol)));

export const tupleLink = ([ source, nbs, ]) => nbs.map(target => ({ source, target, }));

export const reduceLink = g => e => tupleLink([ e, nabes(g)(e), ]);

export const concatLinks = (links, newLinks) => [ ...links, ...newLinks, ];

export const graphLinks = graph =>
  getNodes(graph).map(reduceLink(graph)).reduce(concatLinks, []);

export const pLinks = nodes => ({ id: player, }) =>
  graphLinks(joinGrid(graph(...nodes.filter(samePlayer({ player, })))));

export const pCols = g => p =>
  graphLinks(colGrid(playerGraph(g)(p)));

export const pRows = g => p =>
  graphLinks(rowGrid(playerGraph(g)(p)));

export const pPos = g => p =>
  graphLinks(posGrid(playerGraph(g)(p)));

export const pNeg = g => p =>
  graphLinks(negGrid(playerGraph(g)(p)));

export const playerLinks = g => p =>
  [ pCols(g)(p), pRows(g)(p), pPos(g)(p), pNeg(g)(p), ].reduce(flatten, []);

export const getBox = sel => d3.select(sel).node().getBoundingClientRect();

export const boardScaleX = base => box => d3.scaleLinear()
  .domain([ 0, box.width * 0.9, ])
  .range([ 0, 7, ]);

export const boardScaleY = base => box => d3.scaleLinear()
  .domain([ 0, box.height * 0.9, ])
  .range([ 0, 6, ]);

export const color = d3.scaleOrdinal()
  .domain([ null, 0, 1, ])
  .range([ '#fff', '#ff0000', '#000000', ]);

export const setContainer = (drag = d3.drag()) =>
  drag.container(d3.select('.boardVis').node());

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

export const linkSelect = links =>
  d3.select('.boardVis')
    .selectAll('.linkGroup')
    .data(links)
    .select('.linkLine')
    .attr('stroke', '#fff');

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
    .attr('r', 1 / 8)
    .attr('cx', (({ x, }) => boardScaleX()(getBox('.boardVis'))(x)))
    .attr('cy', (({ y, }) => boardScaleY()(getBox('.boardVis'))(y)));
};

export const updateLinks = (domLinks = d3.selectAll('.linkLine')) => () => {
  domLinks
    .attr('x1', d => boardScaleX()(getBox('.boardVis'))(d.source.x))
    .attr('y1', d => boardScaleY()(getBox('.boardVis'))(d.source.y))
    .attr('x2', d => boardScaleX()(getBox('.boardVis'))(d.target.x))
    .attr('y2', d => boardScaleY()(getBox('.boardVis'))(d.target.y))
    .attr('stroke', ((d) => {
      const a = 0;

      return '#ff00ff';
    }))
    .attr('stroke-width', 1 / 42);
};

const manyBody = sim => sim.force('charge', d3.forceManyBody());

const fCenter = sim => sim.force('center', d3.forceCenter(getBox('.boardVis').height / 2, getBox('.boardVis').height / 2));

const fLink = links => sim => sim.force('link',
  d3.forceLink(links).id(({ id, }) => id)
    .distance(l =>
      Math.hypot(
        (l.source.x) - (l.target.x), (l.source.y) - (l.target.y)
      )
    ));

export const createSim = nodes => fCenter(manyBody(d3.forceSimulation(nodes)));

export const tickLinks = links => sim => sim
  .on('tick.link', updateLinks(linkSelect(links)));

export const tickNodes = nodes => sim => sim
  .on('tick.node', updateNodes(nodeSelect(nodes)));

export const dragNodes = nodes => sim => nodeSelect(nodes)
  .call(setContainer(d3.drag())
    .on('start', dragStarted(sim))
    .on('drag', dragged(sim))
    .on('end', dragEnded(sim)));

const boardLinks = game =>
  [ board, joinGrid, graphLinks, ].reduce((a, fn) => fn(a), game);

const userLinks = g =>
  getPlayers(g).map(pLinks(g.nodes)).reduce(flatten, []);

export const loadGameGraph = game => [ createSim,
  fLink(boardLinks(game)),
  tickNodes(game.nodes),
  tickLinks(userLinks(game)),
  dragNodes(game.nodes), ]
  .reduce((sim, fn) => fn(sim), game.nodes);
