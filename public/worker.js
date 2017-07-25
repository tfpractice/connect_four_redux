const i = 0;

import 'babel-polyfill';

// const viz = require('src/utils/viz');
import {
  applyTicks,
  linkForces,
  mountSimulation,
  simInit,
} from '../src/utils/viz';

// self.importScripts('../src/utils/viz');

// console.log('viz', viz);

// onmessage = function(event) {
//   postMessage(calculatorService.calculate(event.data));
// };
// self.importScripts('babel-polyfill');
postMessage(i);

// onmessage = function(e) {
//   postMessage(++i);
// };

//

onmessage = function(event) {
  console.log('event.data', event.data);
  console.log('public worker');
  applyTicks(simInit(game));

  // postMessage(++i);
};
