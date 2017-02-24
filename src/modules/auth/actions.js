import { Player, } from 'connect_four_functional';
import { addOnline, addUser, goOffline, } from '../users/actions';
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

export const catConn = ({ id, }) => {
  const pushR = onlineRef.child(`${id}`).child('connections').push();

  pushR.onDisconnect().remove();
  pushR.set(Date.now);
};
export const createPlayer = u => setName(u.displayName)(setID(u.uid)(u));

export const setCurrent = u => dispatch =>
   Promise.resolve(dispatch(setCurrentUser(u)))
     .then((arg) => {
       console.log(JSON.stringify(u));
       dispatch(addOnline(u));
     })
     .catch(err => console.error(err.message));

export const login = ({ displayName, } = { displayName: '', }) => dispatch =>
  Promise.resolve(dispatch(loginPend()))
    .then(() => auth.signInAnonymously()
      .then(u =>
        u.updateProfile({ displayName: (displayName || u.uid), })

          // .then(() => setID(u.uid)(u))
          // .then(p => setName(u.displayName)(p))
          .then(() => {
            console.log('user', u);
            return Promise.all(
        [ loginSucc(u), setCurrent(createPlayer(u)), ].map(dispatch));
          }))
      .catch(loginFail)
);

export const logout = () => dispatch =>
  Promise.resolve(dispatch(logoutPend()))
    .then(() => auth.currentUser)
    .then(u => auth.signOut()
      .then(() => goOffline({ id: u.uid, }))
      .then(() => u.delete()))
    .then(() => Promise.all(
      [ logoutSucc(null), setCurrent(null), ].map(dispatch)))
    .catch(console.error);
