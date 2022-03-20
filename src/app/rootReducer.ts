import authReducer from 'features/auth/authSlice';
import cdnReducer from 'features/cdn/cdnSlice';
import commentReducer from 'features/comment/commentSlice';
import blogReducer from 'features/blog/blogSlice';
import settingReducer from 'features/setting/settingSlice';
import socketReducer from 'features/socket/socketSlice';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  auth: authReducer,
  blog: blogReducer,
  comment: commentReducer,
  cdn: cdnReducer,
  setting: settingReducer,
  socket: socketReducer,
});

export default rootReducer;
