import { useAppDispatch } from 'app/hooks';
import { IPost, IUser } from 'models';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ISocketProps } from '..';

type NotiType = 'like' | 'comment' | 'follow';
export interface INotifySocketPayload {
  type: NotiType;
  data: IPost | null;
  user: Partial<IUser>;
}

export default function NotiSocket({ socket }: ISocketProps) {
  const navigate = useNavigate();

  const { t } = useTranslation('notiSocket');

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!socket) return;

    socket.on('notify', (payload: INotifySocketPayload) => {
      const { type, user } = payload;
      const message = t(`message.${type}`, { name: user.name });
      enqueueSnackbar(message, { onClick: () => handleSnackbarClick(payload) });
    });

    return () => {
      socket.off('notify');
    };
  }, [socket, dispatch]);

  const handleSnackbarClick = ({ type, data, user }: INotifySocketPayload) => {
    if (type === 'follow') {
      navigate(`/user/${user.username}`);
      return;
    }
    navigate(`/blog/post/${data?.slug}`, { state: { openComment: type === 'comment' } });

    closeSnackbar();
  };

  return null;
}
