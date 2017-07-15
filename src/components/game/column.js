import React from 'react';
import { connect, } from 'react-redux';
import Node from './node';
import { GameActs, } from '../../modules';

const stateToProps = ({ game, auth: { user, }, }, { id, }) =>
  ({ nodes: game.nodes.filter(({ column, }) => column === id), });

const mergeProps = (s, { setColumn, ...d }, { id, ...o }) =>
  ({ ...s, ...d, ...o, setColumn: () => setColumn(id), });
  
const Column = ({ id, nodes, select, setColumn, }) => (
  <g
    id={`col_${id}`}
    className="column"
    onClick={select}
    onMouseOver={setColumn}
  >
    <g className="colGroup" stroke={'none'}>
      {nodes.map(n => <Node key={n.id} node={n}/>)}
    </g>
  </g>
);

export default connect(stateToProps, GameActs, mergeProps)(Column);
