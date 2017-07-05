import React from 'react';
import Grid from 'material-ui/Grid';
import { connect, } from 'react-redux';
import { PlayerCard, } from '../player';

const Players = ({ players, }) => (
  <Grid container justify="center">
    {players.map((p, i) => (
      <Grid item xs={11} sm={6}>
        <PlayerCard key={p.id} player={p}/>
      </Grid>
    ))}
  </Grid>
);

export default Players;
