// import * as firebase from 'firebase';
import { connRef, fireApp, } from '../fire';
import { SET_CURRENT_USER, } from './constants';
import { addUser, } from '../users/actions';

const set = user => prev => ({ ...prev, user, });

export const setCurrentUser = u =>
({ type: SET_CURRENT_USER, curry: set(u), });

export const setCurrent = u => (dispatch) => {
  console.log('setting current');
  return Promise.resolve(setCurrentUser(u))
    .then(dispatch)
    .then((arg) => {
      console.log('adding user', arg);
      return dispatch(addUser(u));
    }).then(console.log)
    .catch(err => console.error(err.message));
};
  
// fireApp.auth().onAuthStateChanged((user) => {
//   if (user) {
//     console.log('before auth state chnaged', user);
//     setCurrent(user);
//   } else {
//     setCurrentUser(null);
//
//     // No user is signed in.
//   }
// });
