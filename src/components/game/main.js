import React from 'react';
import Grid from 'material-ui/Grid';
import { connect } from 'react-redux';
import { Game } from 'connect_four_functional';
import Button from 'material-ui/Button';
import Card, {
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
} from 'material-ui/Card';

// import React from 'react';
// import Grid from 'material-ui/Grid';
// import { Game, } from 'connect_four_functional';
// import { connect, } from 'react-redux';
import { PlayerCard } from '../player';
import { pSort } from '../../utils/viz';

// const stateToProps = ({ game, }) => ({ players: pSort(Game.players(game)), });

// const Players = ({ players, }) => (
//   <Grid container align="center" justify="center">
//     {players.map((p, i) => (
//       <Grid item xs sm={6} key={p.id}>
//         <PlayerCard player={p}/>
//       </Grid>
//     ))}
//   </Grid>

import { GameActs } from '../../modules';
import Alert from './alert';
import Board from './board';
import Players from './players';

const { winner, players: getPlrs } = Game;
const isOver = game => game.players.length > 1 && winner(game);

const stateToProps = ({ game }) => ({
  game,
  ended: isOver(game),
  players: pSort(getPlrs(game)),
});

const GameComponent = ({ start, ended, game, resetGame, clearGame }) =>
  (<Grid container align="center" justify="center">
    {ended && <Alert open={ended} />}
    <Grid item xs={9} className="Alert">
      <Board />
    </Grid>

    <Grid item xs={11} className="GameGrid">
      <Card>
        <CardHeader title={<Players />} />
        <CardActions>
          <Button onClick={start}>Start game</Button>
          <Button onClick={clearGame}>clearGame game</Button>
          <Button onClick={() => resetGame(game)}>Reset game</Button>
        </CardActions>
      </Card>
    </Grid>
  </Grid>);

export default connect(stateToProps, GameActs)(GameComponent);
