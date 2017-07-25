const i = 0;

// importScripts('/bundle.js');
postMessage(i);

// onmessage = function(e) {
//   postMessage(++i);
// };

//

onmessage = function(event) {
  console.log('event.data', event.data);
  console.log('public worker');

  // postMessage(++i);
};
