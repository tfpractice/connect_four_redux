import * as d3 from 'd3';
import { connect, } from 'react-redux';
import { Game, } from 'connect_four_functional';
import { flattenBin as flatten, spread, } from 'fenugreek-collections';
import { Grid, } from 'game_grid';
import Visualization from './component';
import { color, dragEnded, dragged, dragStarted, graphLinks, linkSelect,
nodeSelect, playerLinks, pLinks, updateLinks, updateNodes, } from './funcs';

const { joinGrid, } = Grid;
const { board, players: getPlayers, } = Game;

const mapStateToProps = ({ players, game, }) => {
  const nodes = game.nodes;
  const myGrid = joinGrid(board(game));
  const links = getPlayers(game).map(pLinks(game.nodes)).reduce(flatten, []);
  const omniLinks = graphLinks(myGrid);
  
  const myForce = d3.forceSimulation(nodes)
   .force('charge', d3.forceManyBody())
   .force('link', d3.forceLink(omniLinks).distance(30).id(({ id, }) => id))

  //  .force('link', d3.forceLink(omniLinks).distance((d) => { console.log('d', d); return 15; }).id(({ id, }) => id))

  //  .force('center', d3.forceCenter(960 / 2, 500 / 2))
   .on('tick.n', updateNodes(nodeSelect(nodes)))
   .on('tick.l', updateLinks(linkSelect(links)));

  // const bp = boardProps();
  //
  // console.log('bp', bp);

  nodeSelect(nodes).call(d3.drag()
    .on('start', dragStarted(myForce))
    .on('drag', dragged(myForce))
    .on('end', dragEnded(myForce)));

  const colors = game.players.map((p, i) => [ p.id, color(i), ])
  .reduce((p, [ key, val, ]) => Object.assign(p, { [key]: val, }), {});

  console.log('colors', colors);
  return ({ links, colors, players, });
};

export default connect(mapStateToProps)(Visualization);
