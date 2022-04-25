import { BorderColorRounded, DeleteRounded, FlagRounded, LinkRounded } from '@mui/icons-material';
import { IMenuItem, IPost } from 'models';
import { copyPostLink, showToastComingSoon } from 'utils/common';
import { IGetMenuProps } from '.';

export interface IGetPostMenuProps extends IGetMenuProps {
  post: IPost;
  isAuthorized: boolean;
  onRemovePost?: () => void;
}

export function GetPostMenu(props: IGetPostMenuProps) {
  const { post, isAuthorized, onRemovePost, navigate, t } = props;

  const menu: IMenuItem[] = [
    {
      label: t('menu.edit'),
      icon: BorderColorRounded,
      onClick: () => navigate?.(`/blog/edit/${post._id}`),
      show: isAuthorized,
    },
    {
      label: t('menu.delete'),
      icon: DeleteRounded,
      onClick: onRemovePost,
      show: isAuthorized,
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
      onClick: showToastComingSoon,
      show: true,
    },
  ];

  return menu;
}
