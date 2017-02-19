import { combineReducers, } from 'redux';
import { reducer as form, } from 'redux-form';
import { users, } from './modules';

export default combineReducers({ users, form, });
