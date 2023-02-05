import { AccountCircleRounded, PersonAddRounded, PersonRemoveRounded } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  CardContent,
  CircularProgress,
  Stack,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { userApi } from '~/api';
import { useAppDispatch, useAppSelector } from '~/app/hooks';
import { User } from '~/models';
import { selectCurrentUser, userActions } from '~/redux/slices/userSlice';
import { showErrorToastFromServer } from '~/utils/toast';
import { CustomCard, GrayButton } from '../common';

interface UserCardProps {
  user: Partial<User>;
}

export function UserCard({ user }: UserCardProps) {
  const navigate = useNavigate();

  const { t } = useTranslation('userCard');

  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);

  const [loading, setLoading] = useState(false);

  const handleFollow = async (action: 'follow' | 'unfollow') => {
    setLoading(true);

    try {
      const updated = await userApi[action](user._id!);
      dispatch(userActions.setCurrentUser(updated.currentUser));
    } catch (error) {
      showErrorToastFromServer(error);
    }

    setLoading(false);
  };

  const renderButton = () => {
    if (user._id === currentUser?._id) {
      return (
        <GrayButton
          variant="contained"
          fullWidth
          startIcon={<AccountCircleRounded />}
          onClick={() => navigate(`/profile/${currentUser!.username}`)}
        >
          {t('viewProfile')}
        </GrayButton>
      );
    }

    if (currentUser?.following?.find(({ _id }) => _id === user._id)) {
      return (
        <GrayButton
          variant="contained"
          fullWidth
          startIcon={loading ? <CircularProgress size={16} /> : <PersonRemoveRounded />}
          onClick={() => handleFollow('unfollow')}
        >
          {t('unfollow')}
        </GrayButton>
      );
    }

    return (
      <Button
        variant="contained"
        fullWidth
        startIcon={loading ? <CircularProgress size={16} color="inherit" /> : <PersonAddRounded />}
        onClick={() => handleFollow('follow')}
      >
        {t('follow')}
      </Button>
    );
  };

  return (
    <CustomCard>
      <CardContent sx={{ '&:last-child': { p: 0 } }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <Stack flex={1} spacing={2}>
            <Avatar
              src={user.avatar}
              sx={{ width: 60, height: 60 }}
              component={Link}
              to={`/profile/${user.username}`}
            >
              {user.name![0].toUpperCase()}
            </Avatar>

            <Box>
              <Typography
                component={Link}
                to={`/profile/${user.username}`}
                variant="body1"
                fontWeight={600}
              >
                {user.name}
              </Typography>

              <Typography variant="body2">@{user.username}</Typography>
            </Box>
          </Stack>

          <Stack flexShrink={0} alignItems="center">
            {renderButton()}
          </Stack>
        </Stack>
      </CardContent>
    </CustomCard>
  );
}
