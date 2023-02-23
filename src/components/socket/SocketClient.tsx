import { useEffect } from 'react';
import { useAppSelector } from '~/store/hooks';
import { selectCurrentUser } from '~/store/slices/userSlice';
import { selectSocket } from '~/store/slices/socketSlice';
import { CommentSocket } from './CommentSocket';

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

  const SocketComponents = [CommentSocket];

  return (
    <>
      {SocketComponents.map((Socket, idx) => (
        <Socket key={idx} socket={socket} />
      ))}
    </>
  );
}
