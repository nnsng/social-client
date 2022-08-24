import userReducer from 'features/auth/userSlice';
import blogReducer from 'features/blog/blogSlice';
import commentReducer from 'features/blog/commentSlice';
import chatReducer from 'features/chat/chatSlice';
import notiReducer from 'features/common/notiSlice';
import settingReducer from 'features/settings/settingSlice';
import socketReducer from 'features/socket/socketSlice';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  user: userReducer,
  post: blogReducer,
  comment: commentReducer,
  settings: settingReducer,
  socket: socketReducer,
  noti: notiReducer,
  chat: chatReducer,
});

export default rootReducer;
