import { combineReducers } from 'redux';
import {
  commentReducer,
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
  socket: socketReducer,
});

export default rootReducer;
