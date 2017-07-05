import React from 'react';
import { connect, } from 'react-redux';
import { pColor, } from './visualization/funcs';

const colors = game => game.players.map((p, i) =>
  [ p.id, pColor(game.players)(p.id), ]).reduce((p, [ key, val, ]) =>
  Object.assign(p, { [key]: val, }), {});
  
const stateToProps = ({ game, }) => ({ colors: colors(game), });

const Node = ({ node: { column, row, id, player, }, colors, }) => (
  <g className="node" id={`node::${column}::${row}`}>
    <circle cx={column} cy={5 - row} fill={player ? colors[player] : '#fff'} id={id} r={'5%'} className="nodeCircle" />
  </g>
);

export default connect(stateToProps)(Node);
