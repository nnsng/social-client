import {
  EditRounded,
  FlagRounded,
  MoreHorizRounded,
  PersonAddRounded,
  PersonOffRounded,
  PersonRemoveRounded,
} from '@mui/icons-material';
import { Button, CircularProgress, MenuItem, Stack } from '@mui/material';
import { userApi } from 'api';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { authActions, selectCurrentUser } from 'features/auth/authSlice';
import { chatActions } from 'features/chat/chatSlice';
import { FollowModeType, IFollow, IMenuItem, IUser } from 'models';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { showComingSoonToast, showErrorToast } from 'utils/toast';
import { ChatIcon } from '../icons';
import { ActionMenu } from './ActionMenu';

export interface IFollowResponse {
  currentUser: IUser;
  selectedUser: Partial<IUser>;
}

export interface IUserInfoButtonGroupProps {
  user?: Partial<IUser>;
  updateUser?: (user: Partial<IUser>) => void;
}

export function UserInfoButtonGroup(props: IUserInfoButtonGroupProps) {
  const { user, updateUser } = props;
  const userId = user?._id as string;

  const { t } = useTranslation('userInfoButtonGroup');

  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);

  const anchorRef = useRef<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const toggleMenu = () => setOpenMenu(!openMenu);
  const closeMenu = () => setOpenMenu(false);

  const handleFollow = async (action: FollowModeType) => {
    setLoading(true);

    try {
      const updated = (await userApi[action](userId)) as unknown as IFollowResponse;
      dispatch(authActions.setCurrentUser(updated.currentUser));
      updateUser?.(updated.selectedUser);
    } catch (error) {
      showErrorToast(error);
    }

    setLoading(false);
  };

  const startChat = () => {
    user && dispatch(chatActions.startChat(user));
  };

  const handleMenuItemClick = (callback?: () => void) => {
    closeMenu();
    callback?.();
  };

  const userInfoMenu: IMenuItem[] = [
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

  const BUTTON_HEIGHT = 36;

  return (
    <Stack alignItems="center" spacing={1} mt={{ xs: 1, sm: 2 }}>
      {currentUser?._id === userId ? (
        <Button
          startIcon={<EditRounded />}
          fullWidth
          sx={{
            height: BUTTON_HEIGHT,
            color: 'text.primary',
            bgcolor: 'action.hover',
            '&:hover': {
              bgcolor: 'action.selected',
            },
          }}
          component={Link}
          to="/settings/edit-profile"
        >
          {t('editProfile')}
        </Button>
      ) : (
        <>
          {(currentUser?.following ?? []).some(({ _id }: IFollow) => _id === userId) ? (
            <Button
              variant="contained"
              startIcon={loading ? <CircularProgress size={16} /> : <PersonRemoveRounded />}
              fullWidth
              disabled={loading}
              onClick={() => handleFollow('unfollow')}
              sx={{
                height: BUTTON_HEIGHT,
                color: 'text.primary',
                bgcolor: 'action.hover',
                '&:hover': {
                  bgcolor: 'action.selected',
                },
              }}
            >
              {t('unfollow')}
            </Button>
          ) : (
            <Button
              variant="contained"
              startIcon={loading ? <CircularProgress size={16} /> : <PersonAddRounded />}
              fullWidth
              disabled={loading}
              onClick={() => handleFollow('follow')}
              sx={{ height: BUTTON_HEIGHT }}
            >
              {t('follow')}
            </Button>
          )}

          <Button
            sx={{
              height: BUTTON_HEIGHT,
              px: 2,
              color: 'text.primary',
              bgcolor: 'action.hover',
              '&:hover': {
                bgcolor: 'action.selected',
              },
            }}
            onClick={startChat}
          >
            <ChatIcon width={18} />
          </Button>

          <Button
            ref={anchorRef}
            onClick={toggleMenu}
            sx={{
              height: BUTTON_HEIGHT,
              px: 2,
              color: 'text.primary',
              bgcolor: 'action.hover',
              '&:hover': {
                bgcolor: 'action.selected',
              },
            }}
          >
            <MoreHorizRounded />
          </Button>

          <ActionMenu
            open={openMenu}
            anchorEl={anchorRef.current}
            onClose={closeMenu}
            sx={{ zIndex: (theme) => theme.zIndex.drawer + 2 }}
          >
            {userInfoMenu.map(({ label, icon: Icon, onClick }, idx) => (
              <MenuItem
                key={idx}
                onClick={() => handleMenuItemClick(onClick)}
                sx={{
                  py: 1.5,
                  px: 2.5,
                  fontSize: 15,
                }}
              >
                <Icon sx={{ mr: 2, fontSize: 18 }} />
                {label}
              </MenuItem>
            ))}
          </ActionMenu>
        </>
      )}
    </Stack>
  );
}
