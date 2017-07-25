import React, { Component } from 'react';
import Grid from 'material-ui/Grid';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';
import Card, { CardActions, CardContent, CardHeader } from 'material-ui/Card';
import Alert from './alert';
import { GameActs } from '../../modules';
import Board from './board';
import Players from './players';
import { Game } from 'connect_four_functional';

const { winner } = Game;
const isOver = game => game.players.length > 1 && winner(game);

const stateToProps = ({ game }) => ({ game });

const GameComponent = ({ start, game, resetGame, clearGame }) =>
  (<Grid container align="center" justify="center">
    <Grid item xs={11} className="Alert">
      {isOver(game) ? <Alert open={isOver(game)} /> : <Board />}
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
