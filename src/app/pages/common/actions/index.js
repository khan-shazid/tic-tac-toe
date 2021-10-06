import { CACHED_GAME_HISTORY, SESSIONED_ACTIVE_BOARD, SESSIONED_ACTIVE_ACTIVITY, SESSIONED_PLAYER_ONE, SESSIONED_PLAYER_TWO } from '../../../constants';

export const getCachedGameHistory = () => {
  return localStorage.getItem(CACHED_GAME_HISTORY) ? JSON.parse(localStorage.getItem(CACHED_GAME_HISTORY)) : [];
}

export const getSessionActiveBoard = () => {
  return sessionStorage.getItem(SESSIONED_ACTIVE_BOARD) ? JSON.parse(sessionStorage.getItem(SESSIONED_ACTIVE_BOARD)) : [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
}

export const getSessionActiveActivity = () => {
  return sessionStorage.getItem(SESSIONED_ACTIVE_ACTIVITY) ? JSON.parse(sessionStorage.getItem(SESSIONED_ACTIVE_ACTIVITY)) : [];
}

export const getSessionPlayerName = (flag) => {
  if (flag === 1) {
    return sessionStorage.getItem(SESSIONED_PLAYER_ONE) ? sessionStorage.getItem(SESSIONED_PLAYER_ONE) : '';
  }
  if (flag === 2) {
    return sessionStorage.getItem(SESSIONED_PLAYER_TWO) ? sessionStorage.getItem(SESSIONED_PLAYER_TWO) : '';
  }
}

export const savePlayerNameInSession = (playerOneName, playerTwoName) => {
  sessionStorage.setItem(SESSIONED_PLAYER_ONE, playerOneName);
  sessionStorage.setItem(SESSIONED_PLAYER_TWO, playerTwoName);
}
