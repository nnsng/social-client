import authReducer from 'features/auth/authSlice';
import blogReducer from 'features/blog/blogSlice';
import commentReducer from 'features/blog/commentSlice';
import configReducer from 'features/common/configSlice';
import uploadReducer from 'features/common/uploadSlice';
import settingReducer from 'features/setting/settingSlice';
import socketReducer from 'features/socket/socketSlice';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  auth: authReducer,
  blog: blogReducer,
  comment: commentReducer,
  upload: uploadReducer,
  setting: settingReducer,
  socket: socketReducer,
  config: configReducer,
});

export default rootReducer;
