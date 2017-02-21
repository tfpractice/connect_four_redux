import { addOnline, addUser, } from '../users/actions';
import { fireUtils, rqUtils, } from '../../utils';
import { LOGIN, SET_CURRENT_USER, } from './constants';

const { connRef, fireApp, auth, db, getOnlineRef, } = fireUtils;
const { rqConstants, rqActions, } = rqUtils;

const set = user => () => user;
const unset = () => () => null;

const loginPending = rqActions(LOGIN).pending;
const loginFailure = rqActions(LOGIN).failure;
const loginSuccess = rqActions(LOGIN).success;

export const setCurrentUser = u => ({ type: SET_CURRENT_USER, curry: set(u), });

export const setCurrent = u => dispatch =>

   Promise.resolve(dispatch(setCurrentUser(u)))
     .then((arg) => {
       console.log('datab', db.ref('online'));
       return dispatch(addOnline(u));
     })
     .catch(err => console.error(err.message));

export const login = dispatch =>
  Promise.resolve(dispatch(loginPending()))
    .then(() => auth.signInAnonymously()
      .then(user => Promise.all(
      [ loginSuccess(user), setCurrent(user), ].map(dispatch)))
      .catch((error) => {
        if (error.code === 'auth/operation-not-allowed') {
          alert('You must enable Anonymous auth in the Firebase Console.');
        } else {
          console.error(error);
        }
      })
);
