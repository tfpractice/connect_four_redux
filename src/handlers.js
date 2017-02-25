import { auth, connRef, onlineRef, } from './utils/firebase';
import { createPlayer, login, logout, setCurrent, } from './modules/auth/actions';
import { addUser, removeUser, setUsers, } from './modules/users/actions';

export const authHandler = (store) => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      console.log('AUTH:SIGNEDIN.', user);
    } else {

    }
  });
};

export const connHandler = (store) => {
  connRef.on('value', (snap) => {
    if (snap.val()) {
      auth.currentUser && store.dispatch(login());
    } else {
      console.log('CONN:user disconnected', snap.val());
    }
  });
};

export const onlineHandler = (store) => {
  const loggedIn = () => auth.currentUser;
  const authID = () => loggedIn() && auth.currentUser.uid;
  const matchID = val => val == authID();

  onlineRef.limitToLast(10).on('child_added', (snap) => {
    store.dispatch(addUser(snap.val()));

    // snap.hasChild('connections') || snap.ref.remove();
  });
  
  onlineRef.limitToLast(10).on('child_changed', (snap) => {
    if (!snap.hasChild('connections')) {
      if (matchID(snap.key)) {
        store.dispatch(logout());
      } else {
        snap.ref.remove();
      }
    }
  });

  onlineRef.limitToLast(10).on('child_removed', (snap) => {
    store.dispatch(removeUser(snap.val()));
  });
};
