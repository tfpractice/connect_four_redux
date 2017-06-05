import React from 'react';

const Node = ({ node: { column, row, id, player, }, }) => (
  <svg className="node" id={`node::${column}::${row}`}>
    <p>id:{id} column:{column} row:{row} player:{player} </p>
    <circle fill="#ff00ff" id={id} className="nodeCircle" />
    </svg>
);

export default Node;
