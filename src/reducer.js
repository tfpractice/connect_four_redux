import { combineReducers, } from 'redux';
import { reducer as form, } from 'redux-form';
import { auth, fire, users, } from './modules';

export default combineReducers({ users, form, auth, fire, });
