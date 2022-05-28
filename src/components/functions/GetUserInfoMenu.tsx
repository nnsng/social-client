import { FlagRounded, PersonOffRounded } from '@mui/icons-material';
import { IMenuItem } from 'models';
import { showComingSoonToast } from 'utils/toast';
import { IGetUserMenuProps } from './GetUserMenu';

export interface IGetUserInfoMenuProps extends IGetUserMenuProps {}

export function GetUserInfoMenu(props: IGetUserInfoMenuProps) {
  const { t } = props;

  const menu: IMenuItem[] = [
    {
      label: t('menu.block'),
      icon: PersonOffRounded,
      onClick: showComingSoonToast,
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
