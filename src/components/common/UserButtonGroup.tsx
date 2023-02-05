import {
  AccountCircleRounded,
  ForumRounded,
  PersonAddRounded,
  PersonRemoveRounded,
} from '@mui/icons-material';
import { Button, CircularProgress, Stack } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { userApi } from '~/api';
import { useAppDispatch, useAppSelector } from '~/app/hooks';
import { FollowModeTypes, User } from '~/models';
import { selectCurrentUser, userActions } from '~/redux/slices/userSlice';
import { showErrorToastFromServer } from '~/utils/toast';
import { GrayButton } from './GrayButton';

export interface UserButtonGroupProps {
  user: Partial<User>;
  updateUser?: (user: Partial<User>) => void;
}

export function UserButtonGroup({ user, updateUser }: UserButtonGroupProps) {
  const userId = user?._id!;

  const navigate = useNavigate();

  const { t } = useTranslation('userInfoButtonGroup');

  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);

  const [loading, setLoading] = useState(false);

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

  const renderFollowButton = () => {
    const isFollowed = currentUser?.following!.find(({ _id }) => _id === userId);

    if (isFollowed) {
      return (
        <GrayButton
          variant="contained"
          startIcon={loading ? <CircularProgress size={16} /> : <PersonRemoveRounded />}
          disabled={loading}
          onClick={() => handleFollow('unfollow')}
        >
          {t('unfollow')}
        </GrayButton>
      );
    }

    return (
      <Button
        variant="contained"
        startIcon={loading ? <CircularProgress size={16} color="inherit" /> : <PersonAddRounded />}
        disabled={loading}
        onClick={() => handleFollow('follow')}
      >
        {t('follow')}
      </Button>
    );
  };

  return (
    <Stack
      alignItems="center"
      spacing={1}
      sx={{
        '& > button': {
          flex: 1,
          height: 36,
        },
      }}
    >
      {currentUser?._id === userId ? (
        <GrayButton
          startIcon={<AccountCircleRounded />}
          fullWidth
          onClick={() => navigate(`/profile/${user.username!}`)}
        >
          {t('viewProfile')}
        </GrayButton>
      ) : (
        <>
          {renderFollowButton()}

          <GrayButton variant="contained" startIcon={<ForumRounded />}>
            {t('message')}
          </GrayButton>
        </>
      )}
    </Stack>
  );
}
