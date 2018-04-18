
import { removeSet, spread, } from 'fenugreek-collections';import { ADD_USER, REMOVE_USER, SET_USERS } from './constants'; import { fireUtils } from '../../utils';
 

const { getPresRef, onlineRef } = fireUtils;

const hasID = arr => id => new Set(arr.map(n => n.id)).has(id);

const set = users => () => users;

const add = u => arr => arr.filter(p => p.id !== u.id).concat(u);

const remove = ({ id }) => arr =>
  spread(removeSet(arr)(arr.find(n => n.id === id)));

export const setUsers = u => ({ type: SET_USERS, curry: set(u) });

export const addUser = u => ({ type: ADD_USER, curry: add(u) });

export const removeUser = u => ({ type: REMOVE_USER, curry: remove(u) });

export const checkConnections = id => getPresRef(id);

export const addDiscon = ref => Promise.resolve(ref.onDisconnect())
  .then(dRef => {
    console.log(`conn`, ref.child(`connections`));

    ref.child(`connections`).on(`value`, snap => {
      console.log(`connection valu`, snap.val());

      snap.hasChildren() === false ? dRef.remove() : dRef.update({ connections: ref.child(`connections`).push().key });
    });
    console.log(`dref removed`, dRef, ref.toJSON());

    //
    // dRef.update({ connections: ref.child('connections').push().key, });
  })
  .then(r => { console.log(`addDiscon`, r, ref); return ref; });

// .update(
//   { connections: ref.child('connections').push(), }, () =>
//     console.log(ref.child('connections'))
// ))
//   .then((r) => { console.log('addDiscon', r, ref); return ref; });

export const catConn = ref =>
  Promise.resolve(ref.child(`connections`).push())
    .then(pref => pref.onDisconnect().remove()
      .then(() => pref.set(Date.now())))
    .then(() => ref);

const updateRef = u => ref => ref.update(u).then(() => ref);

export const addOnline = u => dispatch =>
  Promise.resolve(onlineRef.child(u.id))
    .then(updateRef(u))
    .then(catConn)
    .catch(console.error);

//
// export const takeOffline = u => onlineRef.child(u.id).remove().then(() =>
//   u);

export const goOffline = ({ id }) => {
  console.log(`going offline`, onlineRef.child(`${id}`));
  return onlineRef.child(`${id}`).remove()
  ;
};

