
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
  
export const pLinks = nodes => ({ id: player, }) => {
  console.log('player', player);

  return graphLinks(joinGrid(graph(...nodes.filter(samePlayer({ player, })))));
};

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
  
export const color = d3.scaleOrdinal()
    .domain([ null, 0, 1, ])
    .range([ '#fff', '#ff0000', '#000000', ]);

export const scaleX = d3.scaleLinear()
    .domain([ 0, 7, ])
    .range([ 960 * 0.25, (960 * 0.75), ]);

export const scaleY = d3.scaleLinear()
    .domain([ 0, 7, ])
    .range([ 500 * 0.25, (500 * 0.75), ]);

export const boardProps = () => d3.select('.boardVis').attr('width');

// console.log('boardProps()÷', boardProps()÷);
export const dragStarted = force => (d) => {
  if (!d3.event.active) force.alphaTarget(0.3).restart();
  d3.event.x = d.fx = d.x;
  d3.event.y = d.fy = d.y;
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

export const linkSelect = links => d3.selectAll('.link').data(links);

export const nodeSelect = (nArr) => {
  const bv = d3.select('.board').selectAll('.boardVis').style('width', '100%');

  // console.log('bv', bv.style('width'));
  console.log('d3.select', d3.select('.boardVis').selectAll('.column'));
  return d3.select('.boardVis')
    .selectAll('.column')
    .data(cIDs(nArr))

    // .data(cIDs(nArr), c => c)
    .select('.colGroup')
    .selectAll('.node')

    .data(column => nArr.filter(sameCol({ column, })))

    // .data(column => nArr.filter(sameCol({ column, })), (d, i) => { console.log('d', d); return d || i; })
    .select('.nodeCircle')

    // .attr('r', 15)
    // .attr('fill', (d => color(d.player)))
    .attr('opacity', 0.4);
};
    
export const updateNodes = (domNodes = d3.selectAll('.nodeCircle')) => (arg) => {
  domNodes
    .attr('cx', (({ x, }) => x))
    .attr('cy', (({ y, }) => y));
};

export const updateLinks = (domLinks = d3.selectAll('.link')) => () => {
  domLinks
    .attr('stroke', ((d) => {
      const a = 0;

      // console.log('d', d);

      // return color(d.source.player);
      return color(0);
    }))
    .attr('stroke-width', 3)
    .attr('x1', ({ source: { x, }, }) => x)
    .attr('y1', ({ source: { y, }, }) => y)
    .attr('x2', ({ target: { x, }, }) => x)
    .attr('y2', ({ target: { y, }, }) => y);
};
