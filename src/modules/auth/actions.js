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

export const createPlayer = u => setName(u.displayName)(setID(u.uid)(u));

export const setCurrent = u => dispatch =>
   Promise.resolve(dispatch(setCurrentUser(u)))
     .then((arg) => {
       console.log(JSON.stringify(u));
       dispatch(addOnline(u));
     })
     .catch(err => console.error(err.message));
     
export const unsetCurrent = () => dispatch =>
        Promise.resolve(dispatch(setCurrentUser(null)))

          .catch(err => console.error(err.message));
          
export const takeOffline = u => dispatch =>
  onlineRef.child(u.id).remove();

export const login = ({ displayName, } = { displayName: '', }) => dispatch =>
  Promise.resolve(dispatch(loginPend()))
    .then(() => auth.signInAnonymously()
      .then(u =>
        u.updateProfile({ displayName: (displayName || u.uid), })
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
    .then((u) => {
      console.log('logoout', u);
      return auth.signOut()
        .then(() => {
          console.log('goig off');
          return u && goOffline({ id: u.uid, });
        })
        .then(() => Promise.all(
          [ logoutSucc(null), unsetCurrent(null), ].map(dispatch)))
        .then((arf) => {
          console.log('now delete', u, arf);
          return u.delete();
        });
    })

    .catch(e => dispatch(logoutFail(e.message)));
