import { Game, } from 'connect_four_functional';
import { CLAIM_NEXT, END_IF_WON, SET_COLUMN, SET_MIN, SET_NODES, SET_PLAYERS,
  SET_PLAYSTATE, START_GAME, STOP_GAME, TOGGLE_PLAYERS, TOGGLE_STATE, } from './constants';
const {
claimNext,
 // claimNext, claimSwap, endIfWon, select, setColumn, setMin, setNodes,
 //     setPlayers, setPlayState, start, stop, togglePlayers, toggleState,
} = Game;

export const setNodes = nodes => ({ type: SET_NODES, curry: Game.setNodes(nodes), });
export const setPlayers = players => ({ type: SET_NODES, curry: Game.setPlayers(players), });

// export const setNodes = nodes => ({ type: SET_NODES, curry: Game.setNodes(nodes), });
// export const setNodes = nodes => ({ type: SET_NODES, curry: Game.setNodes(nodes), });
