import { connRef, fireApp, onlineRef, } from './utils/firebase';
import { login, } from './modules/auth/actions';
import { addUser, setUsers, } from './modules/users/actions';

export const connHandler = (store) => {
  connRef.on('value', (snapshot) => {
    if (snapshot.val()) {
      store.dispatch(login);
    }
  });
};

export const onlineHandler = (store) => {
  onlineRef.limitToLast(10).on('child_added', (snap) => {
    store.dispatch(addUser(snap.val()));
  });

  // onlineRef.limitToLast(10).on('child_removed', (snap) => {
    // store.dispatch(addUser(snap.val()));
  // });
  // onlineRef.limitToLast(10).on('value', (snap) => {
  //   // console.log('adding online', u);
  //
  //   snap.forEach(c => console.log('cval', c.val()));
  //   console.log('child_added', snap.val());
  //
  //   // return store.dispatch(setUsers(snap.val()));
  // });
};
