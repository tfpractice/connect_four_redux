import React from 'react';
import { connect } from 'react-redux';

import Node from './node';
import { Game as GMod } from '../../modules';

const stateToProps = ({ game, auth: { user }}, { id }) => ({ nodes: game.nodes.filter(({ column }) => column === id) });

const mergeProps = (s, { setColumn, ...d }, { id, ...o }) => ({ ...s,
                                                                ...d,
                                                                ...o,
                                                                setColumn: () => setColumn(id) });

const Column = ({ id, nodes, select, setColumn }) => (
  <g id={`col_${id}`} className="colGroup" onMouseOver={setColumn}>
    {nodes.map(n => <Node onClick={select} key={n.id} {...n} />)}
  </g>
);

export default connect(stateToProps, GMod.actions, mergeProps)(Column);
