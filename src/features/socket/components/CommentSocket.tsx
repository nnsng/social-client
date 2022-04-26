import { useAppDispatch } from 'app/hooks';
import { commentActions } from 'features/blog/commentSlice';
import { IComment } from 'models';
import { useEffect } from 'react';
import { ISocketProps } from '..';

export default function CommentSocket({ socket }: ISocketProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!socket) return;

    socket.on('createComment', ({ comment }: { comment: IComment }) => {
      dispatch(commentActions.createComment(comment));
    });
    socket.on('removeComment', ({ id }: { id: string }) => {
      dispatch(commentActions.removeComment(id));
    });

    return () => {
      socket.off('createComment');
      socket.off('removeComment');
    };
  }, [socket, dispatch]);

  return null;
}
