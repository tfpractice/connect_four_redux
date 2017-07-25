import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { auth, game, users } from './modules';

export default combineReducers({ users, form, auth, game });
