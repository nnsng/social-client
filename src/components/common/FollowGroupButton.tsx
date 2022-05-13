import {
  EditRounded,
  MoreHorizRounded,
  PersonAddRounded,
  PersonRemoveRounded,
} from '@mui/icons-material';
import { Button, CircularProgress, Stack } from '@mui/material';
import userApi from 'api/userApi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { authActions, selectCurrentUser } from 'features/auth/authSlice';
import { IUser } from 'models';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getErrorMessage } from 'utils/toast';

export type FollowModeType = 'follow' | 'unfollow';

export interface IFollowResponse {
  currentUser: IUser;
  selectedUser: Partial<IUser>;
}

export interface IFollowGroupButtonProps {
  selectedUser?: Partial<IUser>;
  updateUser?: (user: Partial<IUser>) => void;
}

export function FollowGroupButton(props: IFollowGroupButtonProps) {
  const { selectedUser, updateUser } = props;
  const userId = selectedUser?._id as string;

  const BUTTON_HEIGHT = 36;

  const { t } = useTranslation('followGroupButton');

  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);

  const [loading, setLoading] = useState<boolean>(false);

  const handleFollow = async (mode: FollowModeType) => {
    setLoading(true);

    try {
      const updated = (await userApi[mode](userId)) as unknown as IFollowResponse;
      dispatch(authActions.setCurrentUser(updated.currentUser));
      updateUser?.(updated.selectedUser);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }

    setLoading(false);
  };

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
          {(currentUser?.following ?? []).includes(userId) ? (
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
          >
            <MoreHorizRounded />
          </Button>
        </>
      )}
    </Stack>
  );
}
