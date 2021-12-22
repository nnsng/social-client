import authReducer from 'features/auth/authSlice';
import cdnReducer from 'features/cdn/cdnSlice';
import commentReducer from 'features/comment/commentSlice';
import postReducer from 'features/post/postSlice';
import settingReducer from 'features/setting/settingSlice';
import socketReducer from 'features/socket/socketSlice';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  auth: authReducer,
  post: postReducer,
  comment: commentReducer,
  cdn: cdnReducer,
  setting: settingReducer,
  socket: socketReducer,
});

export default rootReducer;
