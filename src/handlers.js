import { auth, connRef, onlineRef, } from './utils/firebase';
import { login, logout, } from './modules/auth/actions';
import { addUser, removeUser, setUsers, } from './modules/users/actions';

export const authHandler = (store) => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      console.log('User is signed in.', user);
    } else {
      console.log('No user is signed in.', user);
    }
  });
};

export const connHandler = (store) => {
  connRef.on('value', (snap) => {
    if (snap.val()) {
      console.log('user apperaed', snap.val());
      store.dispatch(login);
    } else {
      console.log('user disconnected', snap.val());

      // store.dispatch(logout);
    }
  });
};

export const onlineHandler = (store) => {
  onlineRef.limitToLast(10).on('child_added', (snap) => {
    store.dispatch(addUser(snap.val()));
  });

  onlineRef.limitToLast(10).on('child_removed', (snap) => {
    store.dispatch(removeUser(snap.val()));
  });
};
