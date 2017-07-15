import * as d3 from 'd3';
import { Board, Game, Node, } from 'connect_four_functional';
import { flattenBin as flatten, spread, } from 'fenugreek-collections';
import { Compare, Node as GdNode, Grid, } from 'game_grid';
import { Graph, } from 'graph-curry';

const { sameCol, } = Compare;
const { samePlayer, } = Node;
const { column: getCol, } = GdNode;
const { playerGraph, } = Board;
const { board, players: getPlayers, } = Game;
const { graph, nodes: getNodes, neighbors: nabes, } = Graph;
const { joinGrid, colGrid, rowGrid, posGrid, negGrid, } = Grid;

export const cIDs = nodes => spread(new Set(nodes.map(getCol)));

export const tupleLink = ([source, nbs,]) => nbs.map(target => ({ source, target, }));

export const reduceLink = g => e => tupleLink([e, nabes(g)(e),]);

export const concatLinks = (links, newLinks) => [...links, ...newLinks,];

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
  [pCols(g)(p), pRows(g)(p), pPos(g)(p), pNeg(g)(p),].reduce(flatten, []);
