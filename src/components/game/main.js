import React from 'react';
import Grid from 'material-ui/Grid';
import { connect } from 'react-redux';
import { Game } from 'connect_four_functional';
import Button from 'material-ui/Button';
import Card, { CardActions, CardContent, CardHeader } from 'material-ui/Card';

import { GameActs } from '../../modules';
import Alert from './alert';
import Board from './board';
import Players from './players';

const { winner } = Game;
const isOver = game => game.players.length > 1 && winner(game);

const stateToProps = ({ game }) => ({ game, ended: isOver(game) });

const GameComponent = ({ start, ended, game, resetGame, clearGame }) =>
  (<Grid container align="center" justify="center">
    {ended && <Alert open={ended} />}
    <Grid item xs={11} className="Alert">
      <Board />
    </Grid>

    <Grid item xs={11} className="GameGrid">
      <Card>
        <CardHeader title={`in play?${game.inPlay}`} />
        <CardContent>
          <Players />
        </CardContent>
        <CardActions>
          <Button onClick={start}>Start game</Button>
          <Button onClick={clearGame}>clearGame game</Button>
          <Button onClick={() => resetGame(game)}>Reset game</Button>
        </CardActions>
      </Card>
    </Grid>
  </Grid>);

export default connect(stateToProps, GameActs)(GameComponent);
