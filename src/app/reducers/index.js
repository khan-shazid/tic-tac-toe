import { combineReducers } from 'redux';
import gameplayReducer from './gameplay';

const appReducers = combineReducers({
  gameplay: gameplayReducer
});

const reducers = (state,action) =>{
  return appReducers(state, action)
}

export default reducers;
