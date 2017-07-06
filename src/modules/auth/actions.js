import { auth as fAuth, } from 'firebase';
import { Player, } from 'connect_four_functional';
import { addOnline, } from '../users/actions';
import { addPlayer, removePlayer, } from '../game/actions';
import { fireUtils, rqUtils, } from '../../utils';
import { LOGIN, LOGOUT, SET_CURRENT_USER, } from './constants';

const { auth, onlineRef, } = fireUtils;
const { rqActions, } = rqUtils;
const { setID, setName, } = Player;

const set = user => () => user || null;
const unset = () => () => null;

const loginPend = rqActions(LOGIN).pending;
const loginFail = rqActions(LOGIN).failure;
const loginSucc = rqActions(LOGIN).success;
const logoutPend = rqActions(LOGOUT).pending;
const logoutFail = rqActions(LOGOUT).failure;
const logoutSucc = rqActions(LOGOUT).success;

export const createPlayer = (u) => {
  console.log('createPlayer', u);
  return u.uid ? setName(u.displayName || u.uid)(setID(u.uid)(u)) : u;
};

export const setCurrentUser = u => ({ type: SET_CURRENT_USER, curry: set(u), });

export const setCurrent = u => dispatch =>
  Promise.resolve(dispatch(setCurrentUser(u)))
    .then(arg => dispatch(addOnline(u)))
    .catch(err => console.error(err.message));
    
export const unsetCurrent = () => dispatch =>
  Promise.resolve(dispatch(setCurrentUser(null)))
    .catch(err => console.error(err.message));
         
export const takeOffline = u => onlineRef.child(u.id).remove().then(() => u);
export const authPlayer = amod => createPlayer(amod.currentUser);
export const deleteU = u => u && u.delete().then(() => u);

export const login = ({ displayName, } = { displayName: '', }) => dispatch =>
  Promise.resolve(dispatch(loginPend()))
    .then(() => fAuth().signInAnonymously()
      .then(u =>
        u.updateProfile({ displayName: (displayName || u.uid), })
          .then(() => Promise.all([
            loginSucc(u), setCurrent(createPlayer(u)), addPlayer(createPlayer(u)),
          ].map(dispatch))))
      .catch(loginFail)
    );
export const logout = (user = authPlayer(auth)) => (dispatch, getState) => {
  console.log('logging out user arg', user, getState().auth.user, auth.currentUser);
  return Promise.resolve(dispatch(logoutPend()))
    .then(() => user)
    .then(takeOffline)
    .then(u => Promise.all([
      logoutSucc(),
      removePlayer(getState().auth.user),
      unsetCurrent(),
      auth.currentUser.delete(),
    ].map(dispatch)))
    .catch(e => dispatch(logoutFail(e.message)));
};
