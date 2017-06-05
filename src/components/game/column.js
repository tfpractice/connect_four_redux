import React from 'react';
import { connect, } from 'react-redux';
import Node from './node';

const stateToProps = ({ game: { nodes, }, }, { id, }) =>
  ({ nodes: nodes.filter(({ column, }) => column === id), });
  
const Column = ({ id, active, next, nodes, mOver, clk, }) => (
  <svg className="column" id={`col_${id}`} onClick={clk} onMouseOver={mOver}>
    <g className="colGroup" stroke={'none'}>
      {nodes.map(n => <Node key={n.id} node={n}/>)}
          </g>
    </svg>
);

export default connect(stateToProps)(Column);
