import { auth, connRef, onlineRef, } from './utils/firebase';
import { login, logout, } from './modules/auth/actions';
import { addUser, removeUser, setUsers, } from './modules/users/actions';

export const authHandler = (store) => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      console.log('AUTH:SIGNEDIN.', user);

      // store.dispatch(login());
    } else {
      console.log('AUTH:SIGNEDOUT.');
    }
  });
};

export const connHandler = (store) => {
  connRef.on('value', (snap) => {
    if (snap.val()) {
      // db.ref.connections(auth.currentUser.uid)
      console.log('CONN:NEW connection apperaed', auth.currentUser.toJSON());
      auth.currentUser && store.dispatch(login());
    } else {
      console.log('CONN:user disconnected', snap.val());

      // console.log('CONN:user disconnected currentUser', auth.currentUser);

      // auth.currentUser && store.dispatch(logout());
    }
  });
};

export const onlineHandler = (store) => {
  onlineRef.limitToLast(10).on('child_added', (snap) => {
    store.dispatch(addUser(snap.val()));
  });
  
  onlineRef.limitToLast(10).on('child_changed', (snap) => {
    console.log('CHILD CHANGED', snap.val());
    console.log('CHILD CHANGED connections', snap.val().connections);

    // snap.hasChild('connections') || store.dispatch(removeUser(snap.val()));
    snap.hasChild('connections') || snap.ref.remove();
  });

  onlineRef.limitToLast(10).on('child_removed', (snap) => {
    console.log('CHILD REMOVED', snap.val());

    store.dispatch(removeUser(snap.val()));
  });
};
