import {
  EditRounded,
  MoreHorizRounded,
  PersonAddRounded,
  PersonRemoveRounded,
} from '@mui/icons-material';
import { Button, CircularProgress, MenuItem, Stack } from '@mui/material';
import { userApi } from 'api';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { authActions, selectCurrentUser } from 'features/auth/authSlice';
import { chatActions } from 'features/chat/chatSlice';
import { useUserInfoMenu } from 'hooks';
import { FollowModeType, IFollow, IUser } from 'models';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { showErrorToast } from 'utils/toast';
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

  const menu = useUserInfoMenu({ t });

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
              sx={{
                height: BUTTON_HEIGHT,
                color: 'text.primary',
                bgcolor: 'action.hover',
                '&:hover': {
                  bgcolor: 'action.selected',
                },
              }}
              onClick={() => handleFollow('unfollow')}
            >
              {t('unfollow')}
            </Button>
          ) : (
            <Button
              variant="contained"
              startIcon={loading ? <CircularProgress size={16} /> : <PersonAddRounded />}
              fullWidth
              disabled={loading}
              sx={{ height: BUTTON_HEIGHT }}
              onClick={() => handleFollow('follow')}
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
            sx={{
              height: BUTTON_HEIGHT,
              px: 2,
              color: 'text.primary',
              bgcolor: 'action.hover',
              '&:hover': {
                bgcolor: 'action.selected',
              },
            }}
            onClick={toggleMenu}
          >
            <MoreHorizRounded />
          </Button>

          <ActionMenu open={openMenu} anchorEl={anchorRef.current} onClose={closeMenu}>
            {menu.map(({ label, icon: Icon, onClick }, idx) => (
              <MenuItem
                key={idx}
                sx={{
                  py: 1.5,
                  px: 2.5,
                  fontSize: 15,
                }}
                onClick={() => handleMenuItemClick(onClick)}
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
