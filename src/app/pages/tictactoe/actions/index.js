export const updatePlayers = (data) => async (dispatch) => {
  dispatch({
			type: 'SAVE_PLAYER',
			payload: data
		});
}

export const updateBoard = (data) => async (dispatch) => {
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
  dispatch({
			type: 'SAVE_GAMES',
			payload: data
		});
}

export const saveActivities = (data) => async (dispatch) => {
  dispatch({
			type: 'SAVE_ACTIVITIES',
			payload: data
		});
}

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
