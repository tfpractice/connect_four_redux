import { ADD_USER, REMOVE_USER, SET_USERS, } from './constants';

import { fireUtils, rqUtils, } from '../../utils';
import { setCurrent, } from '../auth/actions';

const { connRef, fireApp, auth, db, getOnlineRef, onlineRef, } = fireUtils;
const { rqConstants, rqActions, } = rqUtils;

const set = users => () => users;
const add = user => arr => arr.concat(user);
const remove = ({ id, }) => arr => arr;

export const setUsers = u => ({ type: SET_USERS, curry: set(u), });
export const addUser = u => ({ type: ADD_USER, curry: add(u), });
export const removeUser = u => ({ type: ADD_USER, curry: remove(u), });

// export const getUsers = u=>dispatch=>
// onlineRef.once('value')
export const addOnline = u => dispatch =>
 Promise.resolve(getOnlineRef(u.uid))
   .then((x) => {
     x.onDisconnect().remove();
     x.set(true);
     return u;
   })

   .then(addUser)
   .then(dispatch)

   .catch(console.error)

;
