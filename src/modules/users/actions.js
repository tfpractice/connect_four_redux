import { removeBin, } from 'fenugreek-collections';
import { ADD_USER, REMOVE_USER, SET_USERS, } from './constants';
import { fireUtils, rqUtils, } from '../../utils';
import { setCurrent, } from '../auth/actions';
const { connRef, fireApp, auth, db, getOnlineRef, onlineRef, } = fireUtils;
const { rqConstants, rqActions, } = rqUtils;

const set = users => () => users;
const add = user => arr => arr.concat(user);
const remove = ({ id, }) => arr => removeBin(arr, arr.find(n => n.id === id));

export const setUsers = u => ({ type: SET_USERS, curry: set(u), });
export const addUser = u => ({ type: ADD_USER, curry: add(u), });
export const removeUser = u => ({ type: REMOVE_USER, curry: remove(u), });

export const addOnline = u => dispatch =>
 Promise.resolve(onlineRef.push())
   .then((ref) => {
     ref.onDisconnect().remove();
     ref.set(u);
     return u;
   })

  //  .then(addUser)
  //  .then(dispatch)
   .catch(console.error);
   
