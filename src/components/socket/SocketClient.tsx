import { useEffect } from 'react';
import { useAppSelector } from '~/store/hooks';
import { selectCurrentUser } from '~/store/slices/userSlice';
import { selectSocket } from '~/store/slices/socketSlice';
import { CommentSocket } from './CommentSocket';
import { Socket } from 'socket.io-client';
import { NotificationSocket } from './NotificationSocket';

export interface SocketProps {
  socket: Socket;
}

export function SocketClient() {
  const socket = useAppSelector(selectSocket);
  const currentUser = useAppSelector(selectCurrentUser);

  useEffect(() => {
    if (!socket || !currentUser) return;
    socket.emit('joinSocial', { userId: currentUser._id });

    return () => {
      socket.emit('leaveSocial', { userId: currentUser._id });
    };
  }, [socket, currentUser]);

  if (!socket) return null;

  const SocketComponents = [CommentSocket, NotificationSocket];

  return (
    <>
      {SocketComponents.map((Component, idx) => (
        <Component key={idx} socket={socket} />
      ))}
    </>
  );
}
