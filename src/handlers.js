import { auth, connRef, onlineRef, } from './utils/firebase';
import { login, logout, } from './modules/auth/actions';
import { addUser, removeUser, setUsers, } from './modules/users/actions';

export const authHandler = (store) => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      console.log('AUTH:SIGNEDIN.', user);
    } else {
      console.log('AUTH:SIGNEDOUT.');
    }
  });
};

export const connHandler = (store) => {
  connRef.on('value', (snap) => {
    if (snap.val()) {
      console.log('CONN:NEW connection apperaed', auth.currentUser.toJSON());

      // auth.currentUser && store.dispatch(login());
      store.dispatch(login());
    } else {
      console.log('CONN:user disconnected', snap.val());
    }
  });
};

export const onlineHandler = (store) => {
  onlineRef.limitToLast(10).on('child_added', (snap) => {
    store.dispatch(addUser(snap.val()));

    // snap.hasChild('connections') || snap.ref.remove();
  });
  
  onlineRef.limitToLast(10).on('child_changed', (snap) => {
    console.log('CHILD CHANGED', snap.val(), snap.hasChild('connections'));
    console.log('CHILD CHANGED', snap.hasChild('connections'));

    // snap.hasChild('connections') || snap.ref.remove();

    snap.hasChild('connections') || store.dispatch(logout());
  });

  onlineRef.limitToLast(10).on('child_removed', (snap) => {
    store.dispatch(removeUser(snap.val()));
  });
};
