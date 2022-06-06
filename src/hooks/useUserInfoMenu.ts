import { FlagRounded, PersonOffRounded } from '@mui/icons-material';
import { IMenuItem } from 'models';
import { showComingSoonToast } from 'utils/toast';
import { IUseUserMenuProps } from './useUserMenu';

export interface IUseUserInfoMenuProps extends IUseUserMenuProps {}

export function useUserInfoMenu(props: IUseUserInfoMenuProps) {
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
