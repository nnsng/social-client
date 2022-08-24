import { useAppSelector } from 'app/hooks';
import { selectCurrentUser } from 'features/auth/userSlice';
import { useEffect } from 'react';
import ChatSocket from './components/ChatSocket';
import CommentSocket from './components/CommentSocket';
import NotiSocket from './components/NotiSocket';
import { selectSocket } from './socketSlice';

export interface SocketProps {
  socket: any;
}

export default function SocketClient() {
  const socket = useAppSelector(selectSocket);
  const currentUser = useAppSelector(selectCurrentUser);

  useEffect(() => {
    if (!socket || !currentUser) return;
    socket.emit('joinSocial', { userId: currentUser._id });

    return () => {
      socket.emit('leaveSocial', { userId: currentUser._id });
    };
  }, [socket, currentUser]);

  const SocketComponents = [NotiSocket, CommentSocket, ChatSocket];

  return (
    <>
      {SocketComponents.map((Component, idx) => (
        <Component key={idx} socket={socket} />
      ))}
    </>
  );
}
