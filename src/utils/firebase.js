import * as firebase from 'firebase';
export const config = {
  apiKey: process.env.REACT_APP_C4REDUX_FIREBASE_KEY,
  authDomain: 'conn4redux.firebaseapp.com',
  databaseURL: 'https://conn4redux.firebaseio.com',
  storageBucket: 'conn4redux.appspot.com',
  messagingSenderId: '353870376265',
};

console.log(process.env.REACT_APP_C4REDUX_FIREBASE_KEY);
firebase.initializeApp(config);
export const db = firebase.database();

export const connRef = db.ref('.info/connected');

connRef.on('value', (snapshot) => {
  if (snapshot.val()) {
    console.log(snapshot.val());
  }
});
