import { combineReducers } from 'redux';
import user from './user'
import browser from './browser'

const rootReducer = combineReducers ({
  user,
  browser
});

export default rootReducer;
