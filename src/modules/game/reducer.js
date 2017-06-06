import { Game, } from 'connect_four_functional';
import { GAME_ACTIONS, } from './constants';

export default (state = Game.game([]), { type, curry, }) =>
  GAME_ACTIONS.has(type) ? curry(state) : state;
