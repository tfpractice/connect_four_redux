import React from 'react';
import Column from './column';
import { connect, } from 'react-redux';
import Visualization from './visualization';
import Grid from 'material-ui/Grid';

const stateToProps = ({ game, }) =>
  ({ game, colIDs: [ ...new Set(game.nodes.map(n => n.column)), ], });

const Board = ({ nodes, actions, colIDs, active, winner, }) => (
  <Grid container className="board">
    <Grid item xs>
      <svg viewBox="0, 0, 10, 10" className="boardVis">
        <Visualization />
        {colIDs.map(id => <Column key={id} id={id} />) }
      </svg>
    </Grid>
  </Grid>
  );

export default connect(stateToProps)(Board);
