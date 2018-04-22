import { auth as fAuth } from 'firebase';
import { Player } from 'connect_four_functional';

import { actions as AuthActs } from './auth';
import { fireBase } from '../utils';
import { actions as GameActs } from './game';
import { actions as UserActs } from './users';

const {
  setCurrentUser,
  createPlayer,
  logoutPend,
  logoutSucc,
  loginFail,
  logoutFail,
  loginPend,
  loginSucc,
} = AuthActs;

const { addOnline } = UserActs;

const { addPlayer, clearGame, removePlayer } = GameActs;

const {
  Refs: { auth, gameRef, onlineRef },
} = fireBase;

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
