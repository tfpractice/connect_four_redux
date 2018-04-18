import { Game } from "connect_four_functional";

import {
  ADD_PLAYER,
  CLAIM_NEXT,
  CLEAR_GAME,
  REMOVE_PLAYER,
  RESET_GAME,
  SET_COLUMN,
  SET_NODES,
  START_GAME,
  UPDATE_GAME,
} from "./constants";
import { fireUtils } from "../../utils";
import { unsetCurrent } from "../auth/actions";

const { auth, gameRef, onlineRef } = fireUtils;

const clear = () => Game.setPlayers([])(Game.game());

export const setNodes = nodes => ({
  type: SET_NODES,
  curry: Game.setNodes(nodes),
});

export const setPlayers = players => ({
  type: SET_NODES,
  curry: Game.setPlayers(players),
});

export const addPlayer = p => ({ type: ADD_PLAYER, curry: Game.addPlr(p) });

export const updateGame = g => ({ type: UPDATE_GAME, curry: state => g });

export const removePlayer = player => ({
  type: REMOVE_PLAYER,
  curry: Game.rmPlr(player),
});

export const setColumn = cID => ({
  type: SET_COLUMN,
  curry: Game.setColumn(cID),
});

export const resetGame = game => ({ type: RESET_GAME, curry: Game.resetGame });

// export const clearGame2 = game => ({ type: CLEAR_GAME, curry: clear });

export const clearGame = game => dispatch => {
  Promise.resolve()
    .then(() => auth.currentUser)
    .then(u => u && u.delete())
    .then(() => onlineRef.remove())
    .then(() => gameRef.remove())
    .then(() => unsetCurrent())
    .then(dispatch)
    .then(() => ({ type: CLEAR_GAME, curry: clear }))
    .then(dispatch);
};

export const start = () => ({ type: START_GAME, curry: Game.start });

export const claimNext = () => ({ type: CLAIM_NEXT, curry: Game.claimNext });

export const select = () => ({ type: START_GAME, curry: Game.select });
