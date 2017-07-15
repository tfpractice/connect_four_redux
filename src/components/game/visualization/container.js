import { connect, } from 'react-redux';
import { Game, } from 'connect_four_functional';
import { flattenBin as flatten, } from 'fenugreek-collections';
import { Grid, } from 'game_grid';
import Visualization from './component';
import { colorMap, graphLinks, loadGameGraph, nodeInit, pLinks, } from './funcs';

const { joinGrid, } = Grid;
const { board, players: getPlayers, } = Game;

const mapStateToProps = ({ game, }) => {
  const nodes = game.nodes;
  const myGrid = joinGrid(board(game));
  const links = getPlayers(game).map(pLinks(game.nodes)).reduce(flatten, []);
  const omniLinks = graphLinks(myGrid);
  const sim = nodeInit(game);

  return ({
    links, omniLinks, nodes, sim, game, cMap: colorMap()(game.players),
  });
};

export default connect(mapStateToProps)(Visualization);
