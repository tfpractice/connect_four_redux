import { GAME_ACTIONS } from '../../modules/game/constants';
import { gameRef } from './refs';

export const fireMid = ({ dispatch, getState }) => next => action => {
  const result = next(action);

  if (GAME_ACTIONS.has(action.type)) {
    if (action.type !== `UPDATE_GAME` && getState().game.players.length) {
      gameRef.set(getState().game);
    }
  }

  return result;
};
