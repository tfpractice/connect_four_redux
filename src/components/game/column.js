import React from 'react';
import { connect, } from 'react-redux';
import Node from './node';
import { GameActs, } from '../../modules';

import { Board as C4Board, Node as C4Node, Game, } from 'connect_four_functional';
const getID = ({ id, } = { id: '', }) => id || '';

const isActive = u => g =>
   u && getID(u) && getID(Game.active(g)) === getID(u);

// const{actions}
// const { sameCol, samePlayer } = C4Node;
// const { next, winComp, fromElements } = C4Board;

// const colNodes = nodes => column => nodes.filter(sameCol({ column, }));

const mapStateToProps = ({ players: [ active, passive, ], nodes, auth: { user, }, }, { id, actions, }) => {
  // const curriedClaim = actions.setNodePlayer(active);
  // const claimNext = (nodes) => next(nodes) && curriedClaim(next(nodes));
  //
  // const hasWon = (nodes) => ({ id: player }) =>
  // 	winComp(fromElements(...nodes.filter(samePlayer({ player }))));
  // const endIfWon = () => {
  // console.log(nodes.filter(samePlayer({ player: active.id, })).length);

  // 	return [active, passive].some(hasWon(nodes)) ? actions.endGame() : actions.togglePlayers();
  // };
  // //
  // const clk = () => {
  console.log('clk');

  //
  //   // console.log('clicked winneR?', [active, passive].some(hasWon(nodes)));
  //   return claimNext(colNodes(nodes)(id)) && endIfWon();
  // };

  //
  // return ({
  // 	id,
  // 	active,
  // 	clk,
  // 	nodes: colNodes(nodes)(id),
  // 	next: next(colNodes(nodes)(id)),
  // 	mOver: () => {
  // 		console.log('mouse over col', id);
  // 		return actions.setColumn(id);
  // 	},
  // });
};
const stateToProps = ({ game, auth: { user, }, }, { id, }) => {
  // console.log('user', user);
  const a = 0;

  return ({
    game,
    nodes: game.nodes.filter(({ column, }) => column === id),
    isActive: isActive(user)(game),
  });
};
const Column = ({ id, active, next, nodes, game, mOver, clk, claimNext, setColumn, isActive, }) => {
  console.log('next(game)', Game.next(game));
  console.log('Game.colNodes(game)', Game.colNodes(game));
  return (
  <svg className="column" id={`col_${id}`}
    onClick={() => isActive && claimNext(game)}
    onMouseOver={() => isActive && setColumn(id)}>
    <g className="colGroup" stroke={'none'}>
      {nodes.map(n => <Node key={n.id} node={n}/>)}
    </g>
  </svg>
  );
};

export default connect(stateToProps, GameActs)(Column);
