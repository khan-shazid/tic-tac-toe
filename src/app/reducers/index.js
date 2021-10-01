import { combineReducers } from 'redux';

const appReducers = combineReducers({
});

const reducers = (state,action) =>{
  return appReducers(state, action)
}

export default reducers;
