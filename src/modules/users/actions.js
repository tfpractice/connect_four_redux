import { ADD_USER, REMOVE_USER, } from './constants';
import { connRef, fireApp, } from '../fire';

// import * as firebase from 'firebase';
import { setCurrent, } from '../auth/actions';

const add = user => arr => arr.concat(user);
const remove = user => arr => arr;

export const addUser = u => ({ type: ADD_USER, curry: add(u), });
export const removeUser = u => ({ type: ADD_USER, curry: remove(u), });

// // export const fireListen = (app) => {
// connRef
//   .on('value', (snapshot) => {
//     if (snapshot.val()) {
//       console.log('addue', addUser('3'));
//       addUser('3');
//       fireApp.auth().signInAnonymously()
//         .catch((error) => {
//         // Handle Errors here.
//           const errorCode = error.code;
//           const errorMessage = error.message;
//
//           if (errorCode === 'auth/operation-not-allowed') {
//             alert('You must enable Anonymous auth in the Firebase Console.');
//           } else {
//             console.error(error);
//           }
//         });
//     }
//   });
//
// // };
// export const applyFire = ({ getState, dispatch, }) => {
// connRef.on('value', (snapshot) => {
  // if (snapshot.val()) {
  //   console.log('addue', addUser('3'));
  //   addUser('3');
  //   fireApp.auth().signInAnonymously()
  //     .catch((error) => {
  //       // Handle Errors here.
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //
  //       if (errorCode === 'auth/operation-not-allowed') {
  //         alert('You must enable Anonymous auth in the Firebase Console.');
  //       } else {
  //         console.error(error);
  //       }
  //     });
  // }
// });

// };

// export
