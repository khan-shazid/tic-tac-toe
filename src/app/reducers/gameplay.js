import { getCachedAllPokemons, getCachedMyPokemons } from '../pages/common/actions';

const initialState = {
  activeBoard: [[0, 1, 0], [1, 2, 0], [0, 2, 1]],
  players: {
    playerOne: {}, //{name, symbol/identity}
    playerTwo: {},
  },
  gameActivity: [],
  activePlayer: '',
  previousGames: [], //{playerOne, playerTwo, gameActivity, finalBoard}
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
    case "SAVE": {
      return {
        ...state,
        [action.payload.type]: action.payload.data
      };
    }
    default:
      return state;
  }
}
