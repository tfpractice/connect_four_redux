import * as firebase from 'firebase';

export const config = {
  apiKey: process.env.REACT_APP_C4REDUX_FIREBASE_KEY,
  authDomain: 'conn4redux.firebaseapp.com',
  databaseURL: 'https://conn4redux.firebaseio.com',
  storageBucket: 'conn4redux.appspot.com',
  messagingSenderId: '353870376265',
};

export const fireApp = firebase.initializeApp(config);
export const db = fireApp.database();
export const auth = fireApp.auth();
export const connRef = db.ref('.info/connected');
export const onlineRef = db.ref('online');
export const getOnlineRef = id => onlineRef.child(`${id}`);
