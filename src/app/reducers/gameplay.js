import { getCachedAllPokemons, getCachedMyPokemons } from '../pages/common/actions';

const initialState = {
  activeBoard: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
  players: {
    playerOne: {
      name: '',
      symbol: 'O'
    }, //{name, symbol/identity}
    playerTwo: {
      name: '',
      symbol: 'X'
    },
  },
  currentGameActivities: [], //player(obj), row, column
  activePlayer: 'playerOne',
  previousGames: [], //{playerOne, playerTwo, currentGameActivities, finalBoard, matchedCombinationTiles: [], verdict}
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
