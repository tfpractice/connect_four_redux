/* eslint-disable */
import * as d3 from 'd3';
// const C4Func = require('connect_four_functional');
import * as C4Func from 'connect_four_functional';
console.log('C4Func', C4Func);
import { spread, flattenBin as flatten } from 'fenugreek-collections';
const { Utils, 
  Board: C4Board,
   Traversals, 
   Node: { column: getCol, samePlayer } } =
C4Func;
// const { Commands: { spread, flatten } } = Utils;
const { next, nodes: gNodes, neighbors: nabes } = C4Board;
const { fromElements } = C4Board;
const { omniGraph, colGraph, rowGraph, posGraph, negGraph } = Traversals;

export const playerGraph = (g) => ({ id: player }) =>
  fromElements(...gNodes(g).filter(samePlayer({ player })));
export const cIDs = nodes => spread(new Set(nodes.map(getCol)));
export const tupleLink = ([source, nbs]) => nbs.map(target => ({ source, target }));
export const reduceLink = (g) => (e) => tupleLink([e, nabes(g)(e)]);
export const concatLinks = (links, newLinks) => [...links, ...newLinks];
export const graphLinks = (graph) =>
  gNodes(graph).map(reduceLink(graph)).reduce(concatLinks, []);

export const color = d3.scaleOrdinal()
  .domain([null, 0, 1])
  .range(['steelblue', '#ff0000', '#000000']);

export const scaleX = d3.scaleLinear()
  .domain([0, 7])
  .range([960 * .25, (960 * .75)]);

export const scaleY = d3.scaleLinear()
  .domain([0, 7])
  .range([500 * .25, (500 * .75)]);

// export const playerLinks = (g) => (p) => graphLinks(playerGraph(g)(p));
export const pCols = (g) => (p) => graphLinks(colGraph(playerGraph(g)(p)));
export const pRows = (g) => (p) => graphLinks(rowGraph(playerGraph(g)(p)));
export const pPos = (g) => (p) => graphLinks(posGraph(playerGraph(g)(p)));
export const pNeg = (g) => (p) => graphLinks(negGraph(playerGraph(g)(p)));
export const playerLinks = (g) => (p) =>
  [pCols(g)(p), pRows(g)(p), pPos(g)(p), pNeg(g)(p)].reduce(flatten, []);

export const dragStarted = (force) => (d) => {
  if (!d3.event.active) force.alphaTarget(0.3).restart();
  d3.event.x = d.fx = d.x;
  d3.event.y = d.fy = d.y;
};

export const dragged = (force) => (d) => {
  d.fx = d3.event.sourceEvent.x;
  d.fy = d3.event.sourceEvent.y;
};

export const dragEnded = (force) => (d) => {
  if (!d3.event.active) force.alphaTarget(0);
  d.fx = null;
  d.fy = null;
};
