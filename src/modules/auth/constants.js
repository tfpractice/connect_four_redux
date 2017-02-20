import { rqUtils, } from '../../utils';
const { rqConstants, } = rqUtils;

export const LOGIN = 'LOGIN';
export const LOGIN_ACTIONS = rqConstants(LOGIN);

// export const LOGOUT = 'LOGOUT';
// export const REGISTRATION = 'REGISTRATION';

export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const UPDATE_CURRENT_USER = 'UPDATE_CURRENT_USER';
export const USER_ACTIONS =
 new Set([ SET_CURRENT_USER, UPDATE_CURRENT_USER, ]);

// export const REGISTRATION_ACTIONS = rqConstants(REGISTRATION);

// export const LOGOUT_ACTIONS = rqConstants(LOGOUT);

export const SET_USER = 'SET_USER';

 // export const USER_ACTIONS = new Set([ SET_USER, ]);

export const AUTH_ACTIONS = new Set([
  // ...REGISTRATION_ACTIONS,
  ...LOGIN_ACTIONS,

  // ...LOGOUT_ACTIONS,
  ...USER_ACTIONS,
]);
