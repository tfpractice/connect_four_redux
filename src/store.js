import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { applyMiddleware as applyMid, createStore } from 'redux';

import { fireMid } from './utils/firebase';
import rootR from './reducer';

const predicate = (getState, action) => false;
const collapsed = (getState, action) => action.type;
const log = createLogger({ collapsed, predicate });

export default state =>
  applyMid(thunk, log, fireMid)(createStore)(rootR, state);
