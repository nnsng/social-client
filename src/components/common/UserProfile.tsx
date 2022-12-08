import { AccountCircleRounded, LogoutOutlined, SettingsRounded } from '@mui/icons-material';
import { Avatar, Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from '~/app/hooks';
import { selectCurrentUser, userActions } from '~/features/auth/userSlice';
import { MenuOption } from '~/models';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ActionMenu } from './ActionMenu';

export function UserProfile() {
  const navigate = useNavigate();

  const { t } = useTranslation('header');

  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);

  const [openMenu, setOpenMenu] = useState(false);

  const anchorRef = useRef<any>(null);

  const navigateTo = (path: string) => {
    setOpenMenu(false);
    navigate(path);
  };

  const logout = () => {
    dispatch(userActions.logout(navigate));
  };

  const menu: MenuOption[] = [
    {
      label: t('user.profile'),
      icon: AccountCircleRounded,
      onClick: () => navigateTo(`/profile/${currentUser?.username}`),
    },
    {
      label: t('user.settings'),
      icon: SettingsRounded,
      onClick: () => navigateTo('/settings'),
    },
    {
      label: t('user.logout'),
      icon: LogoutOutlined,
      onClick: logout,
    },
  ];

  return (
    <Box>
      <Avatar
        src={currentUser?.avatar}
        alt={currentUser?.name}
        ref={anchorRef}
        onClick={() => setOpenMenu((x) => !x)}
        sx={{
          width: 36,
          height: 36,
          cursor: 'pointer',
        }}
      />

      <ActionMenu
        open={openMenu}
        menu={menu}
        anchorEl={anchorRef.current}
        onClose={() => setOpenMenu(false)}
      />
    </Box>
  );
}
