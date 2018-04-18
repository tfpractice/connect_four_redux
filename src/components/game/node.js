import React from "react";
import { connect } from "react-redux";

import { colorMap } from "../../utils/viz";

const mapState = ({ game: { players }}, { player }) => ({
  fill: colorMap(`#fff`)(players).get(player),
});

const Node = ({
  onClick, column, row, id, fill,
}) => (
  <circle
    cx={column * 10}
    cy={row * 10}
    fill={fill}
    id={id}
    onClick={onClick}
    opacity={0.5}
    r={2}
    className="nodeCircle"
  />
);

export default connect(mapState)(Node);
