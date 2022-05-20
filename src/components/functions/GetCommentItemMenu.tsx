import { BorderColorRounded, DeleteRounded, FlagRounded } from '@mui/icons-material';
import { IComment, IMenuItem, IUser } from 'models';
import { showComingSoonToast } from 'utils/toast';
import { IGetUserMenuProps } from './GetUserMenu';

export interface IGetCommentItemMenuProps extends IGetUserMenuProps {
  comment: IComment;
  currentUser: IUser | null;
  onEdit?: () => void;
  onRemove?: () => void;
}

export function GetCommentItemMenu(props: IGetCommentItemMenuProps) {
  const { comment, currentUser, onEdit, onRemove, t } = props;

  const isAuthor = comment.userId === currentUser?._id;
  const isAdmin = currentUser?.role === 'admin';

  const menu: IMenuItem[] = [
    {
      label: t('menu.edit'),
      icon: BorderColorRounded,
      onClick: onEdit,
      show: isAuthor,
    },
    {
      label: t('menu.delete'),
      icon: DeleteRounded,
      onClick: onRemove,
      show: isAuthor || isAdmin,
    },
    {
      label: t('menu.report'),
      icon: FlagRounded,
      onClick: showComingSoonToast,
      show: true,
    },
  ];

  return menu;
}
