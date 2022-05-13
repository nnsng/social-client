import { Avatar, Box, Stack, Typography } from '@mui/material';
import { FollowGroupButton } from 'components/common';
import { IUser } from 'models';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { themeMixins } from 'utils/theme';

export interface IUserInfoProps {
  userInfo: Partial<IUser>;
  updateUser?: (user: Partial<IUser>) => void;
}

export default function UserInfo(props: IUserInfoProps) {
  const { userInfo, updateUser } = props;

  const { t } = useTranslation('profile');

  return (
    <Box
      sx={{
        p: 2,
        mb: 2,
        borderRadius: 2,
        ...themeMixins.paperBorder(),
      }}
    >
      <Stack alignItems="center" position="relative">
        <Avatar
          src={userInfo.avatar}
          sx={{
            width: 120,
            height: 120,
            bgcolor: 'action.hover',
            flexShrink: 0,
          }}
        />

        <Box ml={2} flexGrow={1}>
          <Typography fontSize={32} fontWeight={600} mb={0}>
            {userInfo.name}
          </Typography>

          <Typography fontSize={20} mt={-0.5}>
            @{userInfo.username}
          </Typography>

          <Stack mt={1}>
            <Typography variant="subtitle2" fontWeight={400}>
              <b>{userInfo.following?.length || 0}</b> {t('following')}
            </Typography>

            <Typography variant="subtitle2" fontWeight={400} ml={3}>
              <b>{userInfo.followers?.length || 0}</b> {t('followers')}
            </Typography>
          </Stack>
        </Box>

        <Box position="absolute" bottom={0} right={0}>
          <FollowGroupButton selectedUser={userInfo} updateUser={updateUser} />
        </Box>
      </Stack>

      {userInfo.bio && (
        <Typography
          variant="body1"
          sx={{
            mt: 2,
            p: 1,
            textAlign: 'center',
            fontStyle: 'italic',
            bgcolor: 'action.hover',
            borderRadius: 0.5,
            borderLeft: 4,
            borderColor: 'primary.main',
          }}
        >
          {userInfo.bio}
        </Typography>
      )}
    </Box>
  );
}
