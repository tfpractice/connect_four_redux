import Grid from "material-ui/Grid";
import React from "react";
import { connect } from "react-redux";
import { Game } from "connect_four_functional";

import { PlayerCard } from "../player";
import { pSort } from "../../utils/viz";

const stateToProps = ({ game }) => ({ players: pSort(Game.players(game)) });

const Players = ({ players }) => (
  <Grid container alignContent="center" justify="center">
    {players.map((p, i) => (
      <Grid item xs sm={6} key={p.id}>
        <PlayerCard player={p} />
      </Grid>
    ))}
  </Grid>
);

export default connect(stateToProps)(Players);
