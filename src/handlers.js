import { auth, connRef, onlineRef, } from './utils/firebase';
import { createPlayer, login, logout, setCurrent, } from './modules/auth/actions';
import { addUser, removeUser, setUsers, } from './modules/users/actions';

const loggedIn = () => !!auth.currentUser;
const loggedOut = () => !loggedIn();
const getUser = () => loggedIn() && auth.currentUser;
const authID = () => loggedIn() ? getUser.uid : '';

const matchID = val => val == authID();
const authSnap = snap => matchID(snap.key);
const nonAuth = snap => !authSnap(snap);

const hasVal = snap => !!snap.val();
const reconnected = snap => hasVal(snap) && loggedIn();
const hasName = snap => snap.hasChild('name');
const hasConn = snap => hasName(snap) && snap.hasChild('connections');
const noConn = snap => hasName(snap) && !hasConn(snap);

const isCurrent = snap => hasName(snap) && authSnap(snap);
const isAlt = snap => hasName(snap) && nonAuth(snap);
const curDiscon = snap => isCurrent(snap) && noConn(snap);
const altDiscon = snap => isAlt(snap) && noConn(snap);
const connKey = snap => snap.key === 'connections';

export const authHandler = (store) => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      console.log('AUTH:SIGNEDIN.', user);
    } else {

    }
  });
};

// export const connHandler = (store) => {
//   connRef.on('value', (snap) => {
//     if (snap.val()) {
//       auth.currentUser && store.dispatch(login());
//     } else {
//       console.log('CONN:user disconnected', snap.val());
//     }
//   });
// };

export const connHandler = (store) => {
  connRef.on('value', (snap) => {
    reconnected(snap) && store.dispatch(login(getUser()));
  });
};

export const onlineHandler = (store) => {
  // const loggedIn = () => auth.currentUser;
  // const authID = () => loggedIn() && auth.currentUser.uid;
  // const matchID = val => val == authID();

  // onlineRef.limitToLast(10).on('child_added', (snap) => {
  //   store.dispatch(addUser(snap.val()));
  //
  //   // snap.hasChild('connections') || snap.ref.remove();
  // });
  
  onlineRef.once('child_added', (snap) => {
    hasName(snap) && store.dispatch(removeUser({ id: 'computer', }));
  });
  onlineRef.on('child_added', (snap) => {
    hasName(snap) && store.dispatch(addUser(snap.val()));
  });
  
  // onlineRef.limitToLast(10).on('child_changed', (snap) => {
  //   if (!snap.hasChild('connections')) {
  //     if (matchID(snap.key)) {
  //       store.dispatch(logout());
  //     } else {
  //       snap.ref.remove();
  //     }
  //   }
  // });
  onlineRef.on('child_changed', (snap) => {
    if (curDiscon(snap)) {
      console.log('child_changed curDiscon(snap)', snap.key, snap.val());
  
      store.dispatch(logout());
    } else if (noConn(snap)) {
      console.log('child_changed noConn(snap)', snap.key, snap.val());
  
      snap.ref.remove();
    } else if (hasConn(snap)) {
      console.log('child_changed hasConn(snap)', snap.key, snap.val());
  
      store.dispatch(addUser(snap.val()));
    }
  });

  // onlineRef.limitToLast(10).on('child_removed', (snap) => {
  //   store.dispatch(removeUser(snap.val()));
  // });
  //
  
  onlineRef.on('child_removed', (snap) => {
    console.log('child removed', snap.val());
    if (noConn(snap)) {
      store.dispatch(removeUser(snap.val()));
    }
  
    if (curDiscon(snap)) {
      console.log('child_removed alternate curDiscon disconnected', snap.val(), snap.key());
    }
  });
};

// const gref = db.ref('game');
// const deckRef = gref.child('deck');
// const disRef = gref.child('discard');
//
// export const gameHandler = (store) => {
//   gref.on('value', (snap) => {
//     if (hasVal(snap)) {
//       store.dispatch(updateGame(snap.val()));
//     }
//   });
// };
