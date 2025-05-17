import { Comment } from '@/models';
import { useAppDispatch } from '@/store/hooks';
import { commentActions } from '@/store/slices/commentSlice';
import { useEffect } from 'react';
import { SocketProps } from './SocketClient';

const EVENTS = {
  CREATE_COMMENT: 'createComment',
  EDIT_COMMENT: 'editComment',
  REMOVE_COMMENT: 'removeComment',
};

export function CommentSocket({ socket }: SocketProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!socket) return;

    socket.on(EVENTS.CREATE_COMMENT, ({ comment }: { comment: Comment }) => {
      dispatch(commentActions.create(comment));
    });
    socket.on(EVENTS.EDIT_COMMENT, ({ comment }: { comment: Comment }) => {
      dispatch(commentActions.edit(comment));
    });
    socket.on(EVENTS.CREATE_COMMENT, ({ id }: { id: string }) => {
      dispatch(commentActions.remove(id));
    });

    return () => {
      socket.off(EVENTS.CREATE_COMMENT);
      socket.off(EVENTS.EDIT_COMMENT);
      socket.off(EVENTS.REMOVE_COMMENT);
    };
  }, [socket, dispatch]);

  return null;
}
