import React from 'react';
import Column from './column';
import { connect, } from 'react-redux';
import Visualization from './visualization';

// import Visualization from '../visualization';
const stateToProps = ({ game, }) =>
  ({ game, colIDs: [ ...new Set(game.nodes.map(n => n.column)), ], });

const Board = ({ nodes, actions, colIDs, active, winner, }) => {
  console.log('colIDs', colIDs);
  return (
  <section className="board">
    <svg className="boardVis" stroke="green" width={1000} height={600}>
      <Visualization nodes={nodes} />
      "I am the board"
      {colIDs.map(id => <Column key={id} id={id} />) }
    </svg>
  </section>
  );
};

//
// Board.propTypes = {
//   nodes: PropTypes.array.isRequired,
//   actions: PropTypes.object.isRequired,
// };

export default connect(stateToProps)(Board);
