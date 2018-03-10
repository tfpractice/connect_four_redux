import { Board, Game, Node } from 'connect_four_functional';
import { flattenBin as flatten, spread } from 'fenugreek-collections';
import { Node as GdNode, Grid } from 'game_grid';
import { Graph } from 'graph-curry';

const { samePlayer } = Node;
const { column: getCol } = GdNode;
const { playerGraph } = Board;
const { board, players: getPlayers, playerNodes } = Game;
const { graph, nodes: getNodes, neighbors: nabes } = Graph;
const { joinGrid, colGrid, rowGrid, posGrid, negGrid } = Grid;

export const cIDs = nodes => spread(new Set(nodes.map(getCol)));

export const tupleLink = ([ source, nbs ]) =>
  nbs.map(target => ({ source, target }));

export const reduceLink = g => e => tupleLink([ e, nabes(g)(e) ]);

export const concatLinks = (links, newLinks) => [ ...links, ...newLinks ];

export const graphLinks = graph =>
  getNodes(graph)
    .map(reduceLink(graph))
    .reduce(concatLinks, []);

export const pCols = g => p => graphLinks(colGrid(playerGraph(g)(p)));

export const pRows = g => p => graphLinks(rowGrid(playerGraph(g)(p)));

export const pPos = g => p => graphLinks(posGrid(playerGraph(g)(p)));

export const pNeg = g => p => graphLinks(negGrid(playerGraph(g)(p)));

export const playerVectors = g => p =>
  [ pCols(g)(p), pRows(g)(p), pPos(g)(p), pNeg(g)(p) ].reduce(flatten, []);

export const pLinks = nodes => ({ id: player }) =>
  graphLinks(joinGrid(graph(...nodes.filter(samePlayer({ player })))));

export const userLinks = g =>
  getPlayers(g)
    .map(pLinks(g.nodes))
    .reduce(flatten, []);

export const linkPipeline = game => pl =>
  [
    playerNodes,
    fn => fn(pl),
    nArr => graph(...nArr),
    joinGrid,
    graphLinks,
  ].reduce((a, fn) => fn(a), game);

export const playerLinks = game =>
  game.players.map(linkPipeline(game)).reduce(flatten, []);

export const boardLinks = game =>
  [ board, joinGrid, graphLinks ].reduce((a, fn) => fn(a), game);
