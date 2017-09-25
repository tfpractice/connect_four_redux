import React from 'react';
import Grid from 'material-ui/Grid';
import { Game } from 'connect_four_functional';
import { connect } from 'react-redux';
import { PlayerCard } from '../player';
import { pSort } from '../../utils/viz';

const stateToProps = ({ game }) => ({ players: pSort(Game.players(game)) });

const Players = ({ players }) =>
  (<Grid container align="center" justify="center">
    {players.map((p, i) =>
      (<Grid item xs sm={6} key={p.id}>
        <PlayerCard player={p} />
      </Grid>)
    )}
  </Grid>);

export default connect(stateToProps)(Players);
