import { auth as fAuth } from 'firebase';
import { Player } from 'connect_four_functional';

import { addOnline } from '../users/actions';
import { addPlayer, clearGame, removePlayer } from '../game/actions';
import { fireBase, rqUtils } from '../../utils';
import { LOGIN, LOGOUT, SET_CURRENT_USER } from './constants';

const {
  Refs: { auth, gameRef, onlineRef },
} = fireBase;

const { rqActions } = rqUtils;

const { setID, setName } = Player;

const set = user => () => user || null;

const unset = () => () => null;

export const {
  pending: loginPend,
  failure: loginFail,
  success: loginSucc,
} = rqActions(LOGIN);

export const {
  pending: logoutPend,
  failure: logoutFail,
  success: logoutSucc,
} = rqActions(LOGOUT);

export const createPlayer = u =>
  u.uid ? setName(u.displayName || u.uid)(setID(u.uid)(u)) : u;

export const setCurrentUser = u => ({ type: SET_CURRENT_USER, curry: set(u) });

export const setCurrent = u => dispatch =>
  Promise.resolve(dispatch(setCurrentUser(u)))
    .then(arg => dispatch(addOnline(u)))
    .catch(err => console.error(err.message));

export const unsetCurrent = () => dispatch =>
  Promise.resolve(dispatch(setCurrentUser(null))).catch(err =>
    console.error(err.message));

export const takeOffline = u =>
  onlineRef
    .child(u.uid)
    .remove()
    .then(() => u);

export const authPlayer = amod => createPlayer(amod.currentUser);

export const deleteU = u => u && u.delete().then(() => u);

export const login = ({ displayName } = { displayName: `` }) => dispatch =>
  Promise.resolve(dispatch(loginPend())).then(() =>
    fAuth()
      .signInAnonymously()
      .then(u =>
        u
          .updateProfile({ displayName: displayName || u.uid })
          .then(() =>
            Promise.all([
              loginSucc(u),
              setCurrent(createPlayer(u)),
              addPlayer(createPlayer(u)),
            ].map(dispatch))))
      .catch(loginFail));

export const clearGameFB = () => dispatch => {
  Promise.resolve()
    .then(() => fAuth.currentUser)
    .then(u => u && u.delete())
    .then(() => onlineRef.remove())
    .then(() => gameRef.remove())
    .then(unsetCurrent)
    .then(dispatch)
    .then(clearGame)
    .then(dispatch);
};

export const logout = (u = authPlayer(auth)) => (dispatch, getState) =>
  Promise.resolve(dispatch(logoutPend()))
    .then(() => auth.currentUser)
    .then(takeOffline)
    .then(deleteU)
    .then(u =>
      Promise.all([
        logoutSucc(),
        removePlayer(getState().auth.user),
        unsetCurrent(),
        clearGameFB(),
      ].map(dispatch)))
    .catch(e => dispatch(logoutFail(e.message)));
