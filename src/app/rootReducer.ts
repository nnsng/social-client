import authReducer from 'features/auth/authSlice';
import blogReducer from 'features/blog/blogSlice';
import cdnReducer from 'features/common/cdnSlice';
import commentReducer from 'features/comment/commentSlice';
import configReducer from 'features/common/configSlice';
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
  config: configReducer,
});

export default rootReducer;
