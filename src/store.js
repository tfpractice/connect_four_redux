import thunk from "redux-thunk";
import { applyMiddleware as applyMid, createStore } from "redux";
import { createLogger } from "redux-logger";

import rootR from "./reducer";
import { fireMid } from "./utils/firebase";

const predicate = (getState, action) => true;

const collapsed = (getState, action) => action.type;

const log = createLogger({ collapsed, predicate });

export default state =>
  applyMid(thunk, log, fireMid)(createStore)(rootR, state);
