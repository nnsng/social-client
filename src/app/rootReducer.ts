import { combineReducers } from 'redux';
import userReducer from '~/features/auth/userSlice';
import commentReducer from '~/features/blog/commentSlice';
import postReducer from '~/features/blog/postSlice';
import settingReducer from '~/features/settings/settingSlice';
import socketReducer from '~/features/socket/socketSlice';

const rootReducer = combineReducers({
  user: userReducer,
  post: postReducer,
  comment: commentReducer,
  settings: settingReducer,
  socket: socketReducer,
});

export default rootReducer;
