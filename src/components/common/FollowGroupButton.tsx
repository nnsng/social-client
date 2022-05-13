import {
  EditRounded,
  MoreHorizRounded,
  PersonAddRounded,
  PersonRemoveRounded,
} from '@mui/icons-material';
import { Button, Stack } from '@mui/material';
import { useAppSelector } from 'app/hooks';
import { selectCurrentUser } from 'features/auth/authSlice';
import { IUser } from 'models';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export interface IFollowGroupButtonProps {
  selectedUser?: Partial<IUser>;
}

export function FollowGroupButton({ selectedUser }: IFollowGroupButtonProps) {
  const userId = selectedUser?._id as string;

  const { t } = useTranslation('followGroupButton');

  const currentUser = useAppSelector(selectCurrentUser);

  return (
    <Stack alignItems="center" spacing={1} mt={2}>
      {currentUser?._id === userId ? (
        <Button
          startIcon={<EditRounded />}
          fullWidth
          sx={{
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
              startIcon={<PersonRemoveRounded />}
              fullWidth
              sx={{
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
            <Button variant="contained" startIcon={<PersonAddRounded />} fullWidth>
              {t('follow')}
            </Button>
          )}

          <Button
            sx={{
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
