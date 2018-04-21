import { combineReducers } from "redux";
import { reducer as form } from "redux-form";

import { reducer as auth } from "./auth";
import { reducer as game } from "./game";
import { reducer as users } from "./users";

export default combineReducers({ users, form, auth, game });
