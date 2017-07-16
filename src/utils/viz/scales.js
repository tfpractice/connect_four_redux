import * as d3 from 'd3';
import { Board, Game, Node, } from 'connect_four_functional';
import { flattenBin as flatten, spread, } from 'fenugreek-collections';

// import { Compare, Node as GdNode, Grid, } from 'game_grid';
// import { Graph, } from 'graph-curry';

// 
// const { sameCol, } = Compare;
// const { samePlayer, } = Node;
// const { column: getCol, } = GdNode;
// const { playerGraph, } = Board;
// const { board, players: getPlayers, } = Game;
// const { graph, nodes: getNodes, neighbors: nabes, } = Graph;
// const { joinGrid, colGrid, rowGrid, posGrid, negGrid, } = Grid;

export const getBox = sel =>
  d3.select(sel).node().getBoundingClientRect();

export const selWidth = sel => getBox(sel).width;

export const selHeight = sel => getBox(sel).height;

export const boardScaleX = base => box => d3.scaleLinear()
  .domain([ 0, box.width * 0.9, ])
  .range([ 0, 7, ]);

export const boardScaleY = base => box => d3.scaleLinear()
  .domain([ 0, box.height * 0.9, ])
  .range([ 0, 6, ]);

export const selectorScaleX = sel => data => d3.scaleLinear()
  .domain([ 0, getBox(sel).width * 0.9, ])
  .range(d3.extent(data.map(d => d.column)));

export const selectorScaleY = sel => data => d3.scaleLinear()
  .domain([ 0, getBox(sel).height * 0.9, ])
  .range(d3.extent(data.map(d => d.row)));

export const color = d3.scaleOrdinal()
  .domain([ null, 0, 1, ])
  .range([ '#fff', '#F44336', '#000000', ]);

export const pColor = players => d3.scaleOrdinal()
  .domain([ null, ...d3.extent(players.map(p => p.id)), ])
  .range([ '#fff', '#ff0000', '#000000', ]);

export const colorMap = (def = '#fff') => players =>
  new Map(players.map(p => [ p.id, pColor(players)(p.id), ]))
    .set(null, def).set(undefined, def).set('', def);

const pExtent = players => d3.extent(players.map(p => p.id));
const exIdx = players => p => pExtent(players).indexOf(p.id);
const compareIDX = players => (a, b) => exIdx(players)(a) - exIdx(players)(b);

export const pSort = players => [ ...players, ].sort(compareIDX(players));

export const pColorDomain = players => d3.scaleOrdinal()
  .domain([ null, ...d3.extent(players.map(p => p.id)), ]);

export const pColorRange = players =>
  (range = [ '#fff', '#ff0000', '#000000', ]) =>
    pColorDomain(players).range(range);

export const setContainer = (drag = d3.drag()) =>
  drag.container(d3.select('.boardVis').node());
