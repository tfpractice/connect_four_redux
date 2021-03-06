export const CLAIM_NEXT = 'CLAIM_NEXT';
export const END_IF_WON = 'END_IF_WON';
export const SET_COLUMN = 'SET_COLUMN';
export const SET_MIN = 'SET_MIN';
export const SET_NODES = 'SET_NODES';
export const SET_PLAYERS = 'SET_PLAYERS';
export const SET_PLAYSTATE = 'SET_PLAYSTATE';
export const START_GAME = 'START_GAME';
export const STOP_GAME = 'STOP_GAME';
export const TOGGLE_PLAYERS = 'TOGGLE_PLAYERS';
export const TOGGLE_STATE = 'TOGGLE_STATE';
export const ADD_PLAYER = 'ADD_PLAYER';
export const REMOVE_PLAYER = 'REMOVE_PLAYER';
export const UPDATE_GAME = 'UPDATE_GAME';
export const CLEAR_GAME = 'CLEAR_GAME';
export const RESET_GAME = 'RESET_GAME';
export const GAME_ACTIONS = new Set([
  CLEAR_GAME,
  CLAIM_NEXT,
  END_IF_WON,
  SET_COLUMN,
  SET_MIN,
  SET_NODES,
  SET_PLAYERS,
  SET_PLAYSTATE,
  START_GAME,
  STOP_GAME,
  RESET_GAME,
  TOGGLE_PLAYERS,
  TOGGLE_STATE,
  ADD_PLAYER,
  REMOVE_PLAYER,
  UPDATE_GAME,
]);
