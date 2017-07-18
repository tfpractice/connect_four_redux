import React from 'react';
import { connect, } from 'react-redux';
import { colorMap, } from '../../utils/viz';

const stateToProps = ({ game: { players, }, }, { node: { player, ...nrest }, }) => {
  // console.log('nrest', nrest);
  const a = 0;

  return ({ fill: colorMap('#fff')(players).get(player), });
};

const Node = ({ node: { column, row, id, }, fill, }) => (
  <g className="node" id={id}>
    <circle cx={column} cy={row} fill={fill} id={id} r="5" className="nodeCircle" />
  </g>
);

export default connect(stateToProps)(Node);
