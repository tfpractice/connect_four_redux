import { addOnline, addUser, } from '../users/actions';
import { fireUtils, rqUtils, } from '../../utils';
import { LOGIN, LOGOUT, SET_CURRENT_USER, } from './constants';
import { Player, } from 'connect_four_functional';
const { auth, } = fireUtils;
const { rqConstants, rqActions, } = rqUtils;
const { player, setID, } = Player;

const set = user => () => user;
const unset = () => () => null;

const loginPend = rqActions(LOGIN).pending;
const loginFail = rqActions(LOGIN).failure;
const loginSucc = rqActions(LOGIN).success;

const logoutPend = rqActions(LOGOUT).pending;
const logoutFail = rqActions(LOGOUT).failure;
const logoutSucc = rqActions(LOGOUT).success;

export const setCurrentUser = u => ({ type: SET_CURRENT_USER, curry: set(u), });

export const setCurrent = u => dispatch =>
   Promise.resolve(dispatch(setCurrentUser(u)))

  //  .then(arg => u && dispatch(addOnline(u)))
     .then(arg => dispatch(addOnline(u)))
     .catch(err => console.error(err.message));

const loginError = (error) => {
  if (error.code === 'auth/operation-not-allowed') {
    alert('You must enable Anonymous auth in the Firebase Console.');
  } else {
    console.error(error);
  }
};

export const login = (dispatch) => {
  console.log('LOGIN:AUTH:CURR', auth.currentUser);

  return Promise.resolve(dispatch(loginPend()))
    .then(() => {
      console.log('LOGIN:AUTH:CURR', auth.currentUser);
      return auth.signInAnonymously()
        .then(u => setID(u.uid)(u))
        .then((user) => {
          console.log('user,', JSON.stringify(user));
          return Promise.all([ loginSucc(user), setCurrent(user), ].map(dispatch));
        })
        .catch(loginError);
    }
);
};

export const logout = dispatch =>
  Promise.resolve(dispatch(logoutPend()))
    .then(() => auth.signOut())
    .then(() => Promise.all([ logoutSucc(null), setCurrent(null), ].map(dispatch)))
    .catch(console.error);
