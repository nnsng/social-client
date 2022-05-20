import { useAppDispatch } from 'app/hooks';
import { notiActions } from 'features/common/notiSlice';
import { INotification } from 'models';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ISocketProps } from '..';

export default function NotiSocket({ socket }: ISocketProps) {
  const navigate = useNavigate();

  const { t } = useTranslation('notification');

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!socket) return;

    socket.on('notify', (payload: INotification) => {
      const { type, user } = payload;
      const message = t(`message.${type}`, { name: user.name });
      dispatch(notiActions.add(payload));
      enqueueSnackbar(message, { onClick: () => handleSnackbarClick(payload) });
    });

    return () => {
      socket.off('notify');
    };
  }, [socket, dispatch]);

  const handleSnackbarClick = (payload: INotification) => {
    const { type, post, user } = payload;

    if (type === 'follow') {
      navigate(`/user/${user.username}`);
      return;
    }
    navigate(`/blog/post/${post.slug}`, { state: { openComment: type === 'comment' } });

    closeSnackbar();

    dispatch(notiActions.markAsRead([payload]));
  };

  return null;
}
