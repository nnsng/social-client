import {
  EditRounded,
  FlagRounded,
  MoreHorizRounded,
  PersonAddRounded,
  PersonOffRounded,
  PersonRemoveRounded,
} from '@mui/icons-material';
import { Button, CircularProgress, Stack } from '@mui/material';
import { userApi } from '~/api';
import { useAppDispatch, useAppSelector } from '~/app/hooks';
import { selectCurrentUser, userActions } from '~/redux/slices/userSlice';
import { FollowModeTypes, FollowUser, MenuOption, User } from '~/models';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { showComingSoonToast, showErrorToastFromServer } from '~/utils/toast';
import { ChatIcon } from '../icons';
import { ActionMenu } from './ActionMenu';

export interface FollowResponse {
  currentUser: User;
  selectedUser: Partial<User>;
}

export interface UserInfoButtonGroupProps {
  user?: Partial<User>;
  updateUser?: (user: Partial<User>) => void;
}

export function UserInfoButtonGroup(props: UserInfoButtonGroupProps) {
  const { user, updateUser } = props;
  const userId = user?._id as string;

  const { t } = useTranslation('userInfoButtonGroup');

  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);

  const anchorRef = useRef<any>(null);
  const [loading, setLoading] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  const closeMenu = () => setOpenMenu(false);

  const handleFollow = async (action: FollowModeTypes) => {
    setLoading(true);

    try {
      const updated = await userApi[action](userId);
      dispatch(userActions.setCurrentUser(updated.currentUser));
      updateUser?.(updated.selectedUser);
    } catch (error) {
      showErrorToastFromServer(error);
    }

    setLoading(false);
  };

  const userInfoMenu: MenuOption[] = [
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
          to="/settings?tab=edit-profile"
        >
          {t('editProfile')}
        </Button>
      ) : (
        <>
          {(currentUser?.following ?? []).some(({ _id }: FollowUser) => _id === userId) ? (
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
          >
            <ChatIcon width={18} />
          </Button>

          <Button
            ref={anchorRef}
            onClick={() => setOpenMenu((x) => !x)}
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
            menu={userInfoMenu}
            open={openMenu}
            anchorEl={anchorRef.current}
            onClose={closeMenu}
            sx={{ zIndex: (theme) => theme.zIndex.drawer + 2 }}
          />
        </>
      )}
    </Stack>
  );
}
