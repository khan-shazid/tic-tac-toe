import { getCachedGameHistory, getSessionActiveBoard, getSessionPlayerName, getSessionActiveActivity } from '../pages/common/actions';

const initialState = {
  activeBoard: getSessionActiveBoard(),
  players: {
    playerOne: { //{name, symbol/identity}
      name: getSessionPlayerName(1),
      symbol: 1
    },
    playerTwo: {
      name: getSessionPlayerName(2),
      symbol: 2
    },
  },
  currentGameActivities: getSessionActiveActivity(), //player(obj), row, column
  activePlayer: 'playerOne',
  previousGames: getCachedGameHistory(), //{playerOne, playerTwo, currentGameActivities, finalBoard, matchedCombinationTiles: [], verdict}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "SAVE_PLAYER": {
      return {
        ...state,
        players: action.payload
      };
    }
    case "SAVE_BOARD": {
      return {
        ...state,
        activeBoard: action.payload
      };
    }
    case "SAVE_GAMES": {
      return {
        ...state,
        previousGames: action.payload
      };
    }
    case "SAVE_ACTIVITIES": {
      return {
        ...state,
        currentGameActivities: action.payload
      };
    }
    case "SAVE": {
      return {
        ...state,
        [action.payload.key]: action.payload.value
      };
    }
    default:
      return state;
  }
}
