import React from 'react';
import Column from './column';
import { connect, } from 'react-redux';
import Visualization from './visualization';

const stateToProps = ({ game, }) =>
  ({ game, colIDs: [ ...new Set(game.nodes.map(n => n.column)), ], });

const Board = ({ nodes, actions, colIDs, active, winner, }) => (
  <section className="board">
    <svg className="boardVis" stroke="green" width={1000} height={600}>
      <Visualization nodes={nodes} />
      {colIDs.map(id => <Column key={id} id={id} />) }
    </svg>
  </section>
  );

export default connect(stateToProps)(Board);
