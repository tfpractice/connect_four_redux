import React from "react";
import { connect } from "react-redux";

import { colorMap } from "../../utils/viz";

const stateToProps = (
  { game: { players }},
  { node: { player, ...nrest }}
) => ({ fill: colorMap(`#fff`)(players).get(player) });

const Node = ({
  node: {
    column, row, id, x, y,
  }, fill,
}) => (
  <circle
    cx={column * 10}
    cy={row * 10}
    fill={fill}
    id={id}
    opacity={0.5}
    r={2}
    className="nodeCircle"
  />
);

export default connect(stateToProps)(Node);
