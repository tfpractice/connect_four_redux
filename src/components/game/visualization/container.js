import { connect, } from 'react-redux';
import { Game, } from 'connect_four_functional';
import { flattenBin as flatten, } from 'fenugreek-collections';
import { Grid, } from 'game_grid';
import Visualization from './component';
import { graphLinks, pColor, pLinks, } from './funcs';

const { joinGrid, } = Grid;
const { board, players: getPlayers, } = Game;

const mapStateToProps = ({ players, game, }) => {
  const nodes = game.nodes;
  const myGrid = joinGrid(board(game));
  const links = getPlayers(game).map(pLinks(game.nodes)).reduce(flatten, []);
  const omniLinks = graphLinks(myGrid);
  
  const colors = game => game.players.map((p, i) =>
    [ p.id, pColor(game.players)(p.id), ])
    .reduce((p, [ key, val, ]) => Object.assign(p, { [key]: val, }), {});
  
  return ({
    links, omniLinks, colors: colors(game), nodes, game,
  });
};

export default connect(mapStateToProps)(Visualization);
