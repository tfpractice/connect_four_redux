// import  from '../../utils/firebase';
import { fireUtils, rqUtils, } from '../../utils';
import { addUser, } from '../users/actions';

// import { , } from './constants';
import { LOGIN, SET_CURRENT_USER, } from './constants';

// import { addUser, } from '../users/actions';

const { connRef, fireApp, } = fireUtils;
const { rqConstants, rqActions, } = rqUtils;

const set = user => () => user;
const unset = () => () => null;

const loginPending = rqActions(LOGIN).pending;
const loginFailure = rqActions(LOGIN).failure;
const loginSuccess = rqActions(LOGIN).success;

export const setCurrentUser = u => ({ type: SET_CURRENT_USER, curry: set(u), });

export const setCurrent = u => (dispatch) => {
  console.log('setting current');
  return Promise.resolve(setCurrentUser(u))
    .then(dispatch)
    .then((arg) => {
      console.log('adding user', arg);
      return dispatch(addUser(u));
    }).then(console.log)
    .catch(err => console.error(err.message));
};

// export const login=()
