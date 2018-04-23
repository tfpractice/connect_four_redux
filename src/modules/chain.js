import { auth as fAuth } from 'firebase';

import { addOnline } from '../utils/firebase/actions';
import { addPlayer, clearGame, removePlayer } from './game/actions';
import { auth, gameRef, onlineRef } from '../utils/firebase/refs';
import {
  createPlayer,
  loginFail,
  loginPend,
  loginSucc,
  logoutFail,
  logoutPend,
  logoutSucc,
  setCurrentUser,
} from './auth/actions';
import { fireBase } from '../utils';

export const setCurrent = u => dispatch =>
  Promise.resolve(setCurrentUser(u))
    .then(dispatch)
    .then(() => addOnline(u))
    .then(dispatch)
    .catch(console.error);

export const unsetCurrent = () => dispatch =>
  Promise.resolve(setCurrentUser(null))
    .then(dispatch)
    .catch(console.error);

export const takeOffline = u =>
  onlineRef
    .child(u.uid)
    .remove()
    .then(() => u);

export const authPlayer = amod => createPlayer(amod.currentUser);

export const deleteU = u => u && u.delete().then(() => u);

export const login = ({ displayName } = { displayName: `` }) => dispatch =>
  Promise.resolve(loginPend())
    .then(dispatch)
    .then(() =>
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
        .catch(e => dispatch(loginFail(e.message))));

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
  Promise.resolve(logoutPend())
    .then(dispatch)
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
