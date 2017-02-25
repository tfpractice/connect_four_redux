import { Player, } from 'connect_four_functional';
import { removeBin, removeSet, spread, } from 'fenugreek-collections';
import { ADD_USER, REMOVE_USER, SET_USERS, } from './constants';
import { fireUtils, rqUtils, } from '../../utils';
import { setCurrent, } from '../auth/actions';
const { connRef, fireApp, getPresRef, auth, db, getOnlineRef, onlineRef, } = fireUtils;
const { rqConstants, rqActions, } = rqUtils;
const { player, setID, setName, copy, } = Player;
const hasID = arr => id => new Set(arr.map(n => n.id)).has(id);
const set = users => () => users;
const add = u => arr => hasID(arr)(u.id) ? [ ...arr, ] : arr.concat(u);
const remove = ({ id, }) => arr =>
  spread(removeSet(arr)(arr.find(n => n.id === id)));

export const setUsers = u => ({ type: SET_USERS, curry: set(u), });
export const addUser = u => ({ type: ADD_USER, curry: add(u), });
export const removeUser = u => ({ type: REMOVE_USER, curry: remove(u), });
export const checkConnections = id => getPresRef(id);

export const catConn = (ref) => {
  const pushR = ref.child('connections').push();

  pushR.onDisconnect().remove();
  pushR.set(Date.now());
  return ref;
};
const updateRef = u => (ref) => {
  console.log('updated ref');
  ref.update(u); return ref;
};

export const addOnline = u => dispatch =>
  Promise.resolve(onlineRef.child(u.id))

    // .then(ref => Promise.resolve(ref.push())
    //   .then(pref => pref.onDisconnect().remove()
    //     .then(() => pref.set(Date.now())))
    //   .then(() => ref))
    .then(updateRef(u))

    .then(catConn)
    .catch(console.error);
  
export const goOffline = ({ id, }) => {
  console.log('going offline', onlineRef.child(`${id}`));
  return onlineRef.child(`${id}`).remove();
};
   
