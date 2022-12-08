import { useAppDispatch } from '~/app/hooks';
import { commentActions } from '~/features/blog/commentSlice';
import { Comment } from '~/models';
import { useEffect } from 'react';
import { SocketProps } from '..';

export default function CommentSocket({ socket }: SocketProps) {
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
