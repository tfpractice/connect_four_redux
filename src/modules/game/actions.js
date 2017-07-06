import { Game, } from 'connect_four_functional';
import { ADD_PLAYER, CLAIM_NEXT, REMOVE_PLAYER, SET_COLUMN,
  SET_NODES, START_GAME,
  UPDATE_GAME, } from './constants';

const players = ({ players, }) => players;
const hasID = i => ({ id, }) => id === i;
const matches = p0 => p1 => hasID(p0.id)(p1);
const xMatches = p0 => p1 => !matches(p0)(p1);
const update = next => p => matches(next)(p) ? (next) : p;

const reset = game => state => Game.setPlayers(game.players)();

export const playerByID = i => g => players(g).find(hasID(i));
export const findPlr = p => g => players(g).find(matches(p));
export const hasPlr = p => g => players(g).some(matches(p));
export const mendPlr = p => g => Game.setPlayers(players(g).map(update(p)))(g);
export const pushPlr = p => g => Game.setPlayers(players(g).concat(p))(g);

export const addPlr = p => g => hasPlr(p)(g) ? mendPlr(p)(g) : pushPlr(p)(g);
export const rmPlr = p => g => Game.setPlayers((players(g)).filter(xMatches(p)))(g);

export const setNodes = nodes => ({ type: SET_NODES, curry: Game.setNodes(nodes), });
export const setPlayers = players => ({ type: SET_NODES, curry: Game.setPlayers(players), });

export const addPlayer = p =>
  ({ type: ADD_PLAYER, curry: addPlr(p), });
  
export const updateGame = g =>
  ({ type: UPDATE_GAME, curry: state => g, });

export const removePlayer = player =>
  ({ type: REMOVE_PLAYER, curry: rmPlr(player), });

export const setColumn = cID =>
  ({ type: SET_COLUMN, curry: Game.setColumn(cID), });
  
export const resetGame = game =>
  ({ type: UPDATE_GAME, curry: reset(game), });

export const start = () => ({ type: START_GAME, curry: Game.start, });
export const claimNext = () => ({ type: CLAIM_NEXT, curry: Game.claimNext, });

export const select = () => ({ type: START_GAME, curry: Game.select, });
