import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, } from 'react-redux';
import { Main, } from './components';
import getStore from './store';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { connRef, fireApp, } from './modules/fire';
import { connHandler, } from './handlers';
import { setCurrent, } from './modules/auth/actions';
import { addUser, } from './modules/users/actions';

// import App from './container';
import Routes from './routes';
import './index.css';
injectTapEventPlugin();
const store = getStore();

connHandler(store);

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>, document.getElementById('root')
);

// connRef.on('value', (snapshot) => {
//   if (snapshot.val()) {
//     console.log('addue', addUser('3'));
//
//     // store.dispatch(addUser('3'));
//     fireApp.auth().signInAnonymously()
//       .then((u) => {
//         console.log('auth', fireApp.auth().currentUser);
//         console.log('anon', u);
//         return setCurrent(u);
//       }).then(store.dispatch)
//
//       .catch((error) => {
//         // Handle Errors here.
//         const errorCode = error.code;
//         const errorMessage = error.message;
//
//         if (errorCode === 'auth/operation-not-allowed') {
//           alert('You must enable Anonymous auth in the Firebase Console.');
//         } else {
//           console.error(error);
//         }
//       });
//   }
// });

// fireApp.auth().onAuthStateChanged((user) => {
//   if (user) {
//     console.log('before auth state chnaged', user);
//     setCurrent(user);
//   } else {
//     setCurrent(null);
//
//     // No user is signed in.
//   }
// });
