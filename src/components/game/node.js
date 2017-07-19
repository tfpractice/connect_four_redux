import React from 'react';
import { connect, } from 'react-redux';
import { colorMap, } from '../../utils/viz';

const stateToProps = ({ game: { players, }, }, { node: { player, ...nrest }, }) => ({ fill: colorMap('#fff')(players).get(player), });

const Node = ({ node: { column, row, id, }, fill, }) => (
  <g className="node" id={id}>
    <circle cx={column} cy={row} fill={fill} id={id} r="3" className="nodeCircle" />
  </g>
);

export default connect(stateToProps)(Node);
