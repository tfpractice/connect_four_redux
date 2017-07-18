import React from 'react';
import Column from './column';
import { connect, } from 'react-redux';
import Visualization from './visualization';
import Grid from 'material-ui/Grid';

const stateToProps = ({ game, }) =>
  ({ game, colIDs: [ ...new Set(game.nodes.map(n => n.column)), ], });
// "-0.5, -0.5, 100, 100"
const Board = ({ nodes, actions, colIDs, active, winner, }) => (
  <Grid container justify="center"  className="board">
    <Grid item xs={10}  className="boardGrid">
      <svg viewBox="0,0,100%,100%" height="60vw" width="100%" preserveAspectRatio="xMinYMin meet" className="boardVis">
        <Visualization />
        {colIDs.map(id => <Column key={id} id={id} />) }

      </svg>
    </Grid>
  </Grid>
);

export default connect(stateToProps)(Board);
