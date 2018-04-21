import * as Modules from '../../modules';
import { auth, connRef, gameRef, onlineRef } from './middlerware';

console.log(`Modules`, Modules);

const { Auth, Game, Users } = Modules;

const {
  actions: { addPlayer, updateGame },
} = Game;

const { login, logout } = Auth.actions;

const { removeUser } = Users.actions;

const loggedIn = () => !!auth.currentUser;

// const loggedOut = () => !loggedIn();

const getUser = () => loggedIn() && auth.currentUser;

const authID = () => (loggedIn() ? getUser().uid : ``);

const matchID = val => val == authID();

const authSnap = snap => matchID(snap.key);

// const nonAuth = snap => !authSnap(snap);

const hasVal = snap => !!snap.val();

const reconnected = snap => hasVal(snap) && loggedIn();

const hasName = snap => snap.hasChild(`name`);

const hasConn = snap => hasName(snap) && snap.hasChild(`connections`);

const noConn = snap => hasName(snap) && !hasConn(snap);

const isCurrent = snap => hasName(snap) && authSnap(snap);

// const isAlt = snap => hasName(snap) && nonAuth(snap);

const curDiscon = snap => isCurrent(snap) && noConn(snap);

// const altDiscon = snap => isAlt(snap) && noConn(snap);

// const connKey = snap => snap.key === `connections`;

export const authHandler = store => {
  auth.onAuthStateChanged(user => {
    if (user) {
      // console.log(`AUTH:SIGNEDIN.`, user);
    }
  });
};

export const connHandler = store => {
  connRef.on(
    `value`,
    snap => reconnected(snap) && store.dispatch(login(getUser()))
  );
};

export const onlineHandler = store => {
  onlineRef.once(`child_added`, snap => {
    hasName(snap) && store.dispatch(removeUser({ id: `computer` }));
  });
  onlineRef.on(`child_added`, snap => {
    hasName(snap) && store.dispatch(addPlayer(snap.val()));
  });

  onlineRef.on(`child_changed`, snap => {
    if (curDiscon(snap)) {
      // console.log(`child_changed curDiscon(snap)`, snap.key, snap.val());
      //
      store.dispatch(logout());
    } else if (noConn(snap)) {
      // console.log(`child_changed noConn(snap)`, snap.key, snap.val());

      snap.ref.remove();
    } else if (hasConn(snap)) {
      // console.log('child_changed hasConn(snap)', snap.key, snap.val());

      store.dispatch(addPlayer(snap.val()));
    }
  });

  onlineRef.on(`child_removed`, snap => {
    // console.log('child removed', snap.val());
    if (noConn(snap)) {
      console.log(`child_removed alternate  disconn`, snap.val(), snap.key);
      store.dispatch(removeUser(snap.val()));
    }

    if (curDiscon(snap)) {
      console.log(
        `child_removed alternate curDiscon disconnected`,
        snap.val(),
        snap.key
      );
    }
  });
};

export const gameHandler = store => {
  gameRef.on(`value`, snap => {
    if (hasVal(snap)) {
      snap.val().players.length && store.dispatch(updateGame(snap.val()));
    }
  });
};

const applyHandlers = store => {
  authHandler(store);
  connHandler(store);
  gameHandler(store);
  onlineHandler(store);

  return store;
};

export default applyHandlers;
