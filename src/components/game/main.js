import Button from "material-ui/Button";
import Card, { CardActions, CardHeader } from "material-ui/Card";
import Grid from "material-ui/Grid";
import React from "react";
import { connect } from "react-redux";
import { Game } from "connect_four_functional";

import Alert from "./alert";
import Board from "./board";
import Players from "./players";
import { GameActs } from "../../modules";
import { pSort } from "../../utils/viz";

const { winner, players: getPlrs } = Game;

const isOver = game => game.players.length > 1 && winner(game);

const stateToProps = ({ game }) => ({
  game,
  ended: isOver(game),
  players: pSort(getPlrs(game)),
});

const GameComponent = ({
  start, ended, game, resetGame, clearGame,
}) => (
  <Grid container alignContent="center" justify="center">
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
  </Grid>
);

export default connect(stateToProps, GameActs)(GameComponent);
