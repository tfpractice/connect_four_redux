import { ADD_USER, REMOVE_USER, } from './constants';
import { connRef, fireApp, } from '../fire';

import { setCurrent, } from '../auth/actions';

const add = user => arr => arr.concat(user);
const remove = user => arr => arr;

export const addUser = u => ({ type: ADD_USER, curry: add(u), });
export const removeUser = u => ({ type: ADD_USER, curry: remove(u), });
