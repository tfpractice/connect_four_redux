import React from 'react';
import { connect, } from 'react-redux';
import { color, } from './visualization/funcs';

const colors = game => game.players.map((p, i) => [ p.id, color(i), ])
  .reduce((p, [ key, val, ]) => Object.assign(p, { [key]: val, }), {});
const stateToProps = ({ game, }) => ({ colors: colors(game), });

const Node = ({ node: { column, row, id, player, }, colors, }) => (
  <g className="node" id={`node::${column}::${row}`}>
    <circle cx={column} cy={row} fill={player ? colors[player] : '#fff'} id={id} r={'5%'} className="nodeCircle" />
  </g>
);

export default connect(stateToProps)(Node);
