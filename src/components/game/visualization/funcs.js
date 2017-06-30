
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
  // console.log('player', player);
  const a = 0;

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
  
export const boardScaleX = base => box => d3.scaleLinear()
  .domain([ box.width * 0.1, box.width * 0.9, ])
  .range([ 0, 7, ]);
  
export const boardScaleY = base => box => d3.scaleLinear()
  .domain([ box.height * 0.1, box.height * 0.9, ])
  .range([ 0, 6, ]);

  //
export const getBox = sel => d3.select(sel).node().getBoundingClientRect();

export const color = d3.scaleOrdinal()
    .domain([ null, 0, 1, ])
    .range([ '#fff', '#ff0000', '#000000', ]);

export const boardProps = () => d3.select('.boardVis').attr('width');

export const dragStarted = force => (d) => {
  console.log('d3.event', d3.event);
  if (!d3.event.active) force.alphaTarget(0.3).restart();
    d.x=boardScaleX()(getBox('.boardVis'))(d3.event.x) = d.fx;
    d.y=boardScaleY()(getBox('.boardVis'))(d3.event.y) = d.fy;
};

export const dragged = force => (d) => {
  d.fx = d3.event.sourceEvent.x;
  d.fy = d3.event.sourceEvent.y;
};

export const dragEnded = force => (d) => {
  if (!d3.event.active) force.alphaTarget(0);
  d.fx = d.column;
  d.fy = d.row;
};

export const linkSelect = links =>
  d3.selectAll('.link').data(links);

export const nodeSelect = (nArr) => {
  const bv = d3.select('.board')
  .selectAll('.boardVis');

  return d3.select('.boardVis')
    .selectAll('.column')
    .data(cIDs(nArr))

    .select('.colGroup')
    .selectAll('.node')

    .data(column => nArr.filter(sameCol({ column, })))

    .select('.nodeCircle')
    
    .attr('cx', (d, i) => d.row)

    .attr('cy', (d, i) => d.column)

    .attr('r', (d, i) => 1 / 10)

    .attr('opacity', 0.4);
};
    
export const updateNodes = (domNodes = d3.selectAll('.nodeCircle')) => (arg) => {
  domNodes

    .attr('cx', (({ x, }) => boardScaleX()(getBox('.boardVis'))(x)))
    .attr('cy', (({ y, }) => boardScaleY()(getBox('.boardVis'))(y)));

    // .attr('r', 1);

    //
    // .attr('cx', ((d, i) => d.column))
    // .attr('cy', ((d, i) => d.row));
};

export const updateLinks = (domLinks = d3.selectAll('.link')) => () => {
  domLinks
    .attr('stroke', ((d) => {
      const a = 0;

      return color(0);
    }))
    .attr('stroke-width', 1 / 42)
    .attr('x1', d => boardScaleX()(getBox('.boardVis'))(d.source.x))
    .attr('y1', d => boardScaleY()(getBox('.boardVis'))(d.source.y))
    .attr('x2', d => boardScaleX()(getBox('.boardVis'))(d.target.x))
    .attr('y2', d => boardScaleY()(getBox('.boardVis'))(d.target.y));
};
