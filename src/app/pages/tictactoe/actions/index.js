import { CACHED_GAME_HISTORY, SESSIONED_ACTIVE_BOARD, SESSIONED_ACTIVE_ACTIVITY, SESSIONED_PLAYER_ONE, SESSIONED_PLAYER_TWO } from '../../../constants';

export const updatePlayers = (data) => async (dispatch) => {
  dispatch({
		type: 'SAVE_PLAYER',
		payload: data
	});
}

export const updateBoard = (data) => async (dispatch) => {
  sessionStorage.setItem(SESSIONED_ACTIVE_BOARD, JSON.stringify(data));
  dispatch({
		type: 'SAVE_BOARD',
		payload: data
	});
}

export const update = (key, value) => async (dispatch) => {
  dispatch({
		type: 'SAVE',
		payload: {
      key, value
    }
	});
}

export const saveGames = (data) => async (dispatch) => {
  localStorage.setItem(CACHED_GAME_HISTORY, JSON.stringify(data));
  await dispatch({
		type: 'SAVE_GAMES',
		payload: data
	});
}

export const saveActivities = (data) => async (dispatch) => {
  sessionStorage.setItem(SESSIONED_ACTIVE_ACTIVITY, JSON.stringify(data));
  dispatch({
		type: 'SAVE_ACTIVITIES',
		payload: data
	});
}

export const clearSession = () => async (dispatch) => {
  sessionStorage.setItem(SESSIONED_ACTIVE_BOARD, '');
  sessionStorage.setItem(SESSIONED_ACTIVE_ACTIVITY, '');
  sessionStorage.setItem(SESSIONED_PLAYER_ONE, '');
  sessionStorage.setItem(SESSIONED_PLAYER_TWO, '');
  dispatch({
		type: 'SAVE_ACTIVITIES',
		payload: []
	});
  dispatch({
		type: 'SAVE_BOARD',
		payload: [[0,0,0],[0,0,0],[0,0,0]]
	});
  dispatch({
		type: 'SAVE',
		payload: {key: 'activePlayer', value: 'playerOne'}
	});
  dispatch({
		type: 'SAVE_PLAYER',
		payload: {
      playerOne: { //{name, symbol/identity}
        name: '',
        symbol: 1
      },
      playerTwo: {
        name: '',
        symbol: 2
      },
    }
	});
}

/*
 * checkIfAnyMatchingCombination method
 * takes in a board array and check for any combinations which would determine the game result
*/
export const checkIfAnyMatchingCombination = (board) => {
  if (board[0][0]) {
    if ((board[0][0] === board[0][1]) && (board[0][0] === board[0][2])) {
      return ({
        verdict: board[0][0] === 1 ? 'playerOne' : 'playerTwo',
        matchedCombinationTiles: [[0,0],[0,1],[0,2]]
      })
    }
    if ((board[0][0] === board[1][0]) && (board[0][0] === board[2][0])) {
      return ({
        verdict: board[0][0] === 1 ? 'playerOne' : 'playerTwo',
        matchedCombinationTiles: [[0,0],[1,0],[2,0]]
      })
    }
    if ((board[0][0] === board[1][1]) && (board[0][0] === board[2][2])) {
      return ({
        verdict: board[0][0] === 1 ? 'playerOne' : 'playerTwo',
        matchedCombinationTiles: [[0,0],[1,1],[2,2]]
      })
    }
  }
  if (board[0][1]) {
    if ((board[0][1] === board[1][1]) && (board[0][1] === board[2][1])) {
      return ({
        verdict: board[0][1] === 1 ? 'playerOne' : 'playerTwo',
        matchedCombinationTiles: [[0,1],[1,1],[2,1]]
      })
    }
  }
  if (board[0][2]) {
    if ((board[0][2] === board[1][1]) && (board[0][2] === board[2][0])) {
      return ({
        verdict: board[0][2] === 1 ? 'playerOne' : 'playerTwo',
        matchedCombinationTiles: [[0,2],[1,1],[2,0]]
      })
    }
    if ((board[0][2] === board[1][2]) && (board[0][2] === board[2][2])) {
      return ({
        verdict: board[0][2] === 1 ? 'playerOne' : 'playerTwo',
        matchedCombinationTiles: [[0,2],[1,2],[2,2]]
      })
    }
  }
  if (board[1][0]) {
    if ((board[1][0] === board[1][1]) && (board[1][0] === board[1][2])) {
      return ({
        verdict: board[1][0] === 1 ? 'playerOne' : 'playerTwo',
        matchedCombinationTiles: [[1,0],[1,1],[1,2]]
      })
    }
  }
  if (board[2][0]) {
    if ((board[2][0] === board[2][1]) && (board[2][0] === board[2][2])) {
      return ({
        verdict: board[2][0] === 1 ? 'playerOne' : 'playerTwo',
        matchedCombinationTiles: [[2,0],[2,1],[2,2]]
      })
    }
  }
  return ({
    verdict: '',
    matchedCombinationTiles: []
  })
}
