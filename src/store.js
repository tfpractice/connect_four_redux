import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import { applyMiddleware, createStore, } from 'redux';

import { reducer as rootR, } from './modules';

const collapsed = (getState, action) => action.type;
const log = createLogger({ collapsed, });

// export default state => applyMiddleware(thunk, log)(createStore)(rootR, state);
