import { connRef, fireApp, } from './utils/firebase';
import { setCurrent, } from './modules/auth/actions';

export const connHandler = (store) => {
  connRef.on('value', (snapshot) => {
    if (snapshot.val()) {
      // store.dispatch(addUser('3'));
      fireApp.auth().signInAnonymously()
        .then((u) => {
          // console.log('auth', fireApp.auth().currentUser);
          console.log('dispatched middle', u);
          store.dispatch(setCurrent(u));
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;

          if (errorCode === 'auth/operation-not-allowed') {
            alert('You must enable Anonymous auth in the Firebase Console.');
          } else {
            console.error(error);
          }
        });
    }
  });

  // return next(action);
};
