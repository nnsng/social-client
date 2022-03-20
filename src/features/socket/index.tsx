import { commentActions } from 'features/comment/commentSlice';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectSocket } from './socketSlice';

export default function SocketClient() {
  const dispatch = useAppDispatch();
  const socket = useAppSelector(selectSocket);

  // Create comment
  useEffect(() => {
    if (!socket) return;

    socket.on('createComment', ({ comment }: any) => {
      dispatch(commentActions.createComment(comment));
    });

    return () => {
      socket.off('createComment');
    };
  }, [socket, dispatch]);

  // Remove comment
  useEffect(() => {
    if (!socket) return;

    socket.on('removeComment', ({ id }: any) => {
      dispatch(commentActions.removeComment(id));
    });

    return () => {
      socket.off('removeComment');
    };
  }, [socket, dispatch]);

  return null;
}
