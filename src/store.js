import { createLogger, } from 'redux-logger';
import thunk from 'redux-thunk';
import { applyMiddleware as applyMid, createStore, } from 'redux';
import rootR from './reducer';

const collapsed = (getState, action) => action.type;
const log = createLogger({ collapsed, });

export default state => applyMid(thunk, log)(createStore)(rootR, state);
