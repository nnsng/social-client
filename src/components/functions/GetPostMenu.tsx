import { BorderColorRounded, DeleteRounded, FlagRounded, LinkRounded } from '@mui/icons-material';
import { IMenuItem, IPost, IUser } from 'models';
import { copyPostLink } from 'utils/common';
import { showComingSoonToast } from 'utils/toast';
import { IGetUserMenuProps } from './GetUserMenu';

export interface IGetPostMenuProps extends IGetUserMenuProps {
  post: IPost;
  currentUser: IUser | null;
  onRemove?: () => void;
}

export function GetPostMenu(props: IGetPostMenuProps) {
  const { post, currentUser, onRemove, navigate, t } = props;

  const isAuthor = post.authorId === currentUser?._id;
  const isAdmin = currentUser?.role === 'admin';

  const menu: IMenuItem[] = [
    {
      label: t('menu.edit'),
      icon: BorderColorRounded,
      onClick: () => navigate?.(`/blog/edit/${post._id}`, { state: { hideHeaderMenu: true } }),
      show: isAuthor,
    },
    {
      label: t('menu.delete'),
      icon: DeleteRounded,
      onClick: onRemove,
      show: isAuthor || isAdmin,
    },
    {
      label: t('menu.copyLink'),
      icon: LinkRounded,
      onClick: () => copyPostLink(post),
      show: true,
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
