import { USER_ACTIONS, } from './constants';

export default (state = [], { type, curry, }) =>
  USER_ACTIONS.has(type) ? curry(state) : state;
