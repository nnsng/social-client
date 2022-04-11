import {
  AddCircleOutlineOutlined,
  BookmarkBorderOutlined,
  LanguageRounded,
  ListAltOutlined,
  LogoutOutlined,
  SettingsOutlined,
} from '@mui/icons-material';
import { authActions } from 'features/auth/authSlice';
import { configActions } from 'features/common/configSlice';
import { IMenuItem } from 'models';
import { NavigateFunction } from 'react-router-dom';
import { localConfig } from 'utils/common';

export interface GetUserMenuItemListProps {
  navigate: NavigateFunction;
  dispatch: any;
  t: any;
}

export default function GetUserMenuItemList(props: GetUserMenuItemListProps) {
  const { navigate, dispatch, t } = props;

  const handleGotoPage = (path: string) => {
    navigate(path);
  };

  const changeLanguage = () => {
    const currentLanguage = localConfig.get('lang');
    dispatch(configActions.changeLanguage(currentLanguage === 'en' ? 'vi' : 'en'));
  };

  const handleLogout = () => {
    dispatch(authActions.logout({ navigate }));
  };

  const userMenuItemList: IMenuItem[] = [
    {
      label: t('menu.create'),
      icon: AddCircleOutlineOutlined,
      onClick: () => handleGotoPage('/blog/create'),
    },
    {
      label: t('menu.myPosts'),
      icon: ListAltOutlined,
      onClick: () => handleGotoPage('/blog/my'),
    },
    {
      label: t('menu.saved'),
      icon: BookmarkBorderOutlined,
      onClick: () => handleGotoPage('/blog/saved'),
    },
    {
      label: t('menu.language'),
      icon: LanguageRounded,
      onClick: changeLanguage,
    },
    {
      label: t('menu.settings'),
      icon: SettingsOutlined,
      onClick: () => handleGotoPage('/settings'),
    },
    {
      label: t('menu.logout'),
      icon: LogoutOutlined,
      onClick: handleLogout,
    },
  ];

  const dividers: number[] = [1, 2, 4];

  return { userMenuItemList, dividers };
}
