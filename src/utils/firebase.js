import * as firebase from "firebase";

import { GAME_ACTIONS } from "../modules/game/constants";

// export REACT_APP_C4REDUX_FIREBASE_KEY=AIzaSyDip1FeXdolfDIUzmXSubiv7ooUpXIc9tY

export const config = {
  // apiKey: process.env.REACT_APP_C4REDUX_FIREBASE_KEY,
  apiKey: `AIzaSyDip1FeXdolfDIUzmXSubiv7ooUpXIc9tY`,
  authDomain: `conn4redux.firebaseapp.com`,
  databaseURL: `https://conn4redux.firebaseio.com`,
  storageBucket: `conn4redux.appspot.com`,
  messagingSenderId: `353870376265`,
};

export const fireApp = firebase.initializeApp(config);

export const db = fireApp.database();

export const auth = fireApp.auth();

export const connRef = db.ref(`.info/connected`);

export const onlineRef = db.ref(`online`);

export const pushRef = onlineRef.push();

export const presenceRef = db.ref(`connections`);

export const gameRef = db.ref(`game`);

export const getPresRef = id => presenceRef.child(`${id}`);

export const getOnlineRef = id => onlineRef.push(`${id}`);

export const fireMid = ({ dispatch, getState }) => next => action => {
  const result = next(action);

  if (GAME_ACTIONS.has(action.type)) {
    if (action.type !== `UPDATE_GAME` && getState().game.players.length) {
      gameRef.set(getState().game);
    }
  }

  return result;
};
