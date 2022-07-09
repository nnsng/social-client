import {
  AddCircleRounded,
  BookmarkRounded,
  DarkModeRounded,
  LogoutOutlined,
  Settings,
} from '@mui/icons-material';
import { authActions } from 'features/auth/authSlice';
import { IMenuItem } from 'models';
import { NavigateFunction } from 'react-router-dom';

export interface IUseUserMenuProps {
  openAppearanceDialog: () => void;
  navigate?: NavigateFunction;
  dispatch?: any;
  t?: any;
}

export function useUserMenu(props: IUseUserMenuProps) {
  const { openAppearanceDialog, navigate, dispatch, t } = props;

  const logout = () => {
    dispatch(authActions.logout({ navigate }));
  };

  const userMenu: IMenuItem[] = [
    {
      label: t('menu.create'),
      icon: AddCircleRounded,
      onClick: () => navigate?.('/blog/create', { state: { hideHeaderMenu: true } }),
    },
    {
      label: t('menu.saved'),
      icon: BookmarkRounded,
      onClick: () => navigate?.('/blog/saved'),
    },
    {
      label: t('menu.appearance'),
      icon: DarkModeRounded,
      onClick: openAppearanceDialog,
    },
    {
      label: t('menu.settings'),
      icon: Settings,
      onClick: () => navigate?.('/settings'),
    },
    {
      label: t('menu.logout'),
      icon: LogoutOutlined,
      onClick: logout,
    },
  ];

  const dividers: number[] = [0, 1, 3];

  return { userMenu, dividers };
}
