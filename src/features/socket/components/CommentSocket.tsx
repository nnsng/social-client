import { useAppDispatch } from 'app/hooks';
import { commentActions } from 'features/blog/commentSlice';
import { useEffect } from 'react';
import { ISocketProps } from '..';

export default function CommentSocket({ socket }: ISocketProps) {
  const dispatch = useAppDispatch();

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
