import React from 'react';

const Node = ({ node: { column, row, id, player, }, }) => (
  <svg className="node" id={`node::${column}::${row}`}>
    <circle fill="#ff00ff" id={id} className="nodeCircle" />
    </svg>
);

export default Node;
