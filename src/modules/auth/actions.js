import { auth as fAuth, } from 'firebase';
import { Player, } from 'connect_four_functional';
import { addOnline, addUser, goOffline, } from '../users/actions';
import { addPlayer, removePlayer, } from '../game/actions';
import { fireUtils, rqUtils, } from '../../utils';
import { LOGIN, LOGOUT, SET_CURRENT_USER, } from './constants';
const { auth, onlineRef, } = fireUtils;
const { rqConstants, rqActions, } = rqUtils;
const { player, setID, setName, } = Player;

const set = user => () => user;
const unset = () => () => null;

const loginPend = rqActions(LOGIN).pending;
const loginFail = rqActions(LOGIN).failure;
const loginSucc = rqActions(LOGIN).success;

const logoutPend = rqActions(LOGOUT).pending;
const logoutFail = rqActions(LOGOUT).failure;
const logoutSucc = rqActions(LOGOUT).success;

export const setCurrentUser = u => ({ type: SET_CURRENT_USER, curry: set(u), });

export const createPlayer = u =>
u.displayName ? setName(u.displayName)(setID(u.uid)(u)) : u;

export const setCurrent = u => dispatch =>
   Promise.resolve(dispatch(setCurrentUser(u)))
     .then((arg) => {
       console.log('preparing add', JSON.stringify(u));
       return dispatch(addOnline(u));
     })
     .catch(err => console.error(err.message));
     
export const unsetCurrent = () => dispatch =>
  Promise.resolve(dispatch(setCurrentUser(null)))
    .catch(err => console.error(err.message));
          
export const takeOffline = (u) => {
  console.log('takeOffline', u);
  console.log('takeOffline', auth.currentUser);
  return (onlineRef.child(u.id).remove()).then(() => u);
};
export const authPlayer = amod => createPlayer(amod.currentUser);

  // export const takeOffline = u =>
  // u && onlineRef.child(`${u.uid}`).remove().then(() => u);

export const deleteU = u => u && u.delete().then(() => {
  console.log('u', u);
  return u;
});

export const login = ({ displayName, } = { displayName: '', }) => dispatch =>
  Promise.resolve(dispatch(loginPend()))
    .then(() => fAuth().signInAnonymously()
      .then(u =>
        u.updateProfile({ displayName: (displayName || u.uid), })
          .then(() => {
            console.log('user', u);
            return Promise.all(
        [ loginSucc(u), setCurrent(createPlayer(u)), addPlayer(createPlayer(u)), ].map(dispatch));
          }))
      .catch(loginFail)
);

// export const logout = u => dispatch =>
//   Promise.resolve(dispatch(logoutPend()))
//     .then(() => auth.currentUser)
//
//     // .then(takeOffline)
//
//     .then((au) => {
//       console.log('logoout', u);
//       console.log('au', au);
//
//       // return u && goOffline({ id: u.uid, })
//       return u && Promise.resolve(takeOffline(u))
//
//         // .then(() => u.delete())
//
//         .then(() => Promise.all(
//           [ logoutSucc(null), unsetCurrent(null), ].map(dispatch)));
//     })
//     .catch(e => dispatch(logoutFail(e.message)));
//
export const logout = (user = authPlayer(auth)) => (dispatch, getState) => {
  console.log('logging out user arg', user, getState().auth.user, auth.currentUser);
  return Promise.resolve(dispatch(logoutPend()))
    .then(() => user)
    .then(takeOffline)

    // .then(deleteU)
    // .then(createPlayer)
    .then((u) => {
      console.log('auth.currentUser', auth.currentUser);
      return Promise.all([
        logoutSucc(),
        removePlayer(getState().auth.user),
        unsetCurrent(),
        auth.currentUser.delete(),
      
      ].map(dispatch));
    })
    .catch(e => dispatch(logoutFail(e.message)));
};
