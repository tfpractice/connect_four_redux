let i = 0;

// postMessage(i);
// onmessage = function(e) {
//   postMessage(++i);
// };
// importScripts('../../utils/viz.js');
onmessage = function(event) {
  i++;
  console.log('event.data', event.data);

  postMessage(++i);
};
