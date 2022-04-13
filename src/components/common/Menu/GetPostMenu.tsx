import { BorderColorRounded, DeleteRounded, FlagRounded, LinkRounded } from '@mui/icons-material';
import { IMenuItem, Post } from 'models';
import { copyPostLink } from 'utils/common';
import { GetMenuProps } from '.';

export interface GetPostMenuProps extends GetMenuProps {
  post: Post;
  isAuthorized: boolean;
  onRemovePost?: () => void;
}

export function GetPostMenu(props: GetPostMenuProps) {
  const { post, isAuthorized, onRemovePost, navigate, t } = props;

  const menu: IMenuItem[] = [
    {
      label: t('menu.edit'),
      icon: BorderColorRounded,
      onClick: () => navigate?.(`/blog/edit/${post._id}`),
      active: isAuthorized,
    },
    {
      label: t('menu.delete'),
      icon: DeleteRounded,
      onClick: onRemovePost,
      active: isAuthorized,
    },
    {
      label: t('menu.copyLink'),
      icon: LinkRounded,
      onClick: () => copyPostLink(post),
      active: true,
    },
    {
      label: t('menu.report'),
      icon: FlagRounded,
      onClick: () => {},
      active: true,
    },
  ];

  return menu;
}
