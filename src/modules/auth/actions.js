import { addOnline, addUser, } from '../users/actions';
import { fireUtils, rqUtils, } from '../../utils';
import { LOGIN, LOGOUT, SET_CURRENT_USER, } from './constants';
import { Player, } from 'connect_four_functional';
const { auth, } = fireUtils;
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

// export const connectCurrent=()=>dispatch=>
// dispatch

export const setCurrent = u => dispatch =>
   Promise.resolve(dispatch(setCurrentUser(u)))
     .then(arg => dispatch(addOnline(u)))
     .catch(err => console.error(err.message));

export const login = () => dispatch =>
  Promise.resolve(dispatch(loginPend()))
    .then(() => auth.signInAnonymously()
      .then(u => setID(u.uid)(u))
      .then(u => setName(u.displayName || u.uid)(u))
      .then(user => Promise.all(
        [ loginSucc(user), setCurrent(user), ].map(dispatch)))
      .catch(loginFail)
);

// onlineRef.child(u.id)

export const logout = () => dispatch =>
  Promise.resolve(dispatch(logoutPend()))
    .then(() => auth.currentUser)
    .then((u) => { auth.signOut(); return u.delete(); })
    .then(() => Promise.all(
      [ logoutSucc(null), setCurrent(null), ].map(dispatch)))
    .catch(console.error);
