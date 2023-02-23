import { combineReducers } from 'redux';
import commentReducer from './commentSlice';
import configReducer from './configSlice';
import postReducer from './postSlice';
import settingReducer from './settingSlice';
import socketReducer from './socketSlice';
import userReducer from './userSlice';

const rootReducer = combineReducers({
  user: userReducer,
  post: postReducer,
  comment: commentReducer,
  settings: settingReducer,
  socket: socketReducer,
  config: configReducer,
});

export default rootReducer;
