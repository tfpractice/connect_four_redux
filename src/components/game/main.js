import React, { Component } from 'react';
import Grid from 'material-ui/Grid';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';
import Card, { CardActions, CardContent, CardHeader } from 'material-ui/Card';
import Alert from './alert';
import { GameActs } from '../../modules';
import Board from './board';
import Players from './players';

const stateToProps = ({ game }) => ({ game });

class Game extends Component {
  render() {
    const { start, game, resetGame, clearGame } = this.props;

    return (
      <Grid container align="center" justify="center">
        <Grid item xs={10} className="GameGrid">
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
      </Grid>
    );
  }
}

const PureGame = ({ start, game, resetGame, clearGame }) => {
  console.log('gmae', game);

  return (
    <Grid container align="center" justify="center">
      <Grid item xs={10} className="GameGrid">
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
    </Grid>
  );
};

export default connect(stateToProps, GameActs)(Game);
