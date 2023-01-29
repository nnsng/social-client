import { combineReducers } from 'redux';
import {
  commentReducer,
  commonReducer,
  configReducer,
  postReducer,
  settingReducer,
  socketReducer,
  userReducer,
} from '~/redux/slices';

const rootReducer = combineReducers({
  user: userReducer,
  post: postReducer,
  comment: commentReducer,
  settings: settingReducer,
  common: commonReducer,
  socket: socketReducer,
  config: configReducer,
});

export default rootReducer;
