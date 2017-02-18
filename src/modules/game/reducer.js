import { GAME_ACTIONS, } from './constants';

export default (state = {}, { type, curry, }) =>
  GAME_ACTIONS.has(type) ? curry(state) : state;
