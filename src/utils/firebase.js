import * as firebase from 'firebase';
export const config = {
  apiKey: process.env.C4REDUX_FIREBASE_KEY,
  authDomain: 'conn4redux.firebaseapp.com',
  databaseURL: 'https://conn4redux.firebaseio.com',
  storageBucket: 'conn4redux.appspot.com',
  messagingSenderId: '353870376265',
};

firebase.initializeApp(config);
export const db = firebase.database();
const connRef = db.ref('.info/connected');

connRef.on('value', (snapshot) => {
  if (snapshot.val()) {
    console.log(snapshot.val());
  }
});
