import React from 'react';
import Column from './column';
import { connect, } from 'react-redux';
import Visualization from './visualization';
import Grid from 'material-ui/Grid';

const stateToProps = ({ game, }) =>
  ({ game, colIDs: [ ...new Set(game.nodes.map(n => n.column)), ], });

const Board = ({ nodes, actions, colIDs, active, winner, }) => (
  <Grid container className="board">
    <Grid item xs={12}>
      <svg className="boardVis" width={1000} height={600}>
        <Visualization />
        {colIDs.map(id => <Column key={id} id={id} />) }
      </svg>
    </Grid>
  </Grid>
  );

export default connect(stateToProps)(Board);
