import { combineReducers } from 'redux';
import {
  commentReducer,
  configReducer,
  otherReducer,
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
  other: otherReducer,
  socket: socketReducer,
  config: configReducer,
});

export default rootReducer;
