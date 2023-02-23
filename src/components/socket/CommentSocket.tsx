import { useEffect } from 'react';
import { Socket } from 'socket.io-client';
import { useAppDispatch } from '~/store/hooks';
import { commentActions } from '~/store/slices/commentSlice';
import { Comment } from '~/models';

export interface SocketProps {
  socket: Socket;
}

export function CommentSocket({ socket }: SocketProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!socket) return;

    socket.on('createComment', ({ comment }: { comment: Comment }) => {
      dispatch(commentActions.create(comment));
    });
    socket.on('editComment', ({ comment }: { comment: Comment }) => {
      dispatch(commentActions.edit(comment));
    });
    socket.on('removeComment', ({ id }: { id: string }) => {
      dispatch(commentActions.remove(id));
    });

    return () => {
      socket.off('createComment');
      socket.off('editComment');
      socket.off('removeComment');
    };
  }, [socket, dispatch]);

  return null;
}
