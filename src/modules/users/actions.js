import { ADD_USER, REMOVE_USER, } from './constants';
import { connRef, } from '../../utils/firebase';
import * as firebase from 'firebase';

connRef.on('value', (snapshot) => {
  if (snapshot.val()) {
    firebase.auth().signInAnonymously().catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;

      if (errorCode === 'auth/operation-not-allowed') {
        alert('You must enable Anonymous auth in the Firebase Console.');
      } else {
        console.error(error);
      }
    }); console.log('user slogged on', snapshot.val());
  }
});

const add = user => arr => arr.concat(user);
const remove = user => arr => arr;

export const addUser = u => ({ type: ADD_USER, curry: add(u), });
export const removeUser = u => ({ type: ADD_USER, curry: remove(u), });
