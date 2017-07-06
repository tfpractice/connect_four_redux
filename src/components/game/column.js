import React from 'react';
import { connect, } from 'react-redux';
import Node from './node';
import { GameActs, } from '../../modules';

import { Game, } from 'connect_four_functional';

const getID = ({ id, } = { id: '', }) => id || '';

const isActive = u => g =>
  u && getID(u) && getID(Game.active(g)) === getID(u);

const stateToProps = ({ game, auth: { user, }, }, { id, }) => ({
  game,
  nodes: game.nodes.filter(({ column, }) => column === id),
  isActive: isActive(user)(game),
});

const Column = ({ id, nodes, select, setColumn, }) => (
  <g
    className="column"
    id={`col_${id}`}
    onClick={select}
    onMouseOver={() => setColumn(id)}
  >
    <g className="colGroup" stroke={'none'}>
      {nodes.map(n => <Node key={n.id} node={n}/>)}
    </g>
  </g>
);

export default connect(stateToProps, GameActs)(Column);
