import { Avatar, Box, Stack, Theme, Typography, useMediaQuery } from '@mui/material';
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

  const smUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));

  return (
    <Box
      sx={{
        ...themeMixins.paperBorder(),
        p: { xs: 1, sm: 2 },
        mb: 2,
      }}
    >
      <Stack alignItems="center" position="relative">
        <Avatar
          src={userInfo.avatar}
          sx={{
            width: { xs: 60, sm: 100 },
            height: { xs: 60, sm: 100 },
            bgcolor: 'action.hover',
            flexShrink: 0,
          }}
        />

        <Box ml={3} flexGrow={1}>
          <Typography
            component="div"
            sx={{
              fontSize: { xs: 20, sm: 28 },
              fontWeight: 600,
              mb: 0,
            }}
          >
            {userInfo.name}
          </Typography>

          <Typography
            component="p"
            sx={{
              fontSize: { xs: 16, sm: 18 },
              mt: -0.5,
            }}
          >
            @{userInfo.username}
          </Typography>

          <Stack
            sx={{
              fontSize: { xs: 14, sm: 16 },
              '& > span:first-of-type': {
                ml: 0,
              },
            }}
          >
            {['following', 'followers'].map((x) => (
              <Typography
                key={x}
                component="span"
                fontSize="inherit"
                fontWeight={400}
                sx={{
                  ml: 3,
                  textAlign: { xs: 'center', sm: 'unset' },
                }}
              >
                {smUp && <b>{(userInfo as any)[x]?.length || 0} </b>}

                {t(x)}

                {!smUp && (
                  <>
                    <br />
                    <b>{(userInfo as any)[x]?.length || 0}</b>
                  </>
                )}
              </Typography>
            ))}
          </Stack>
        </Box>

        {smUp && (
          <Box position="absolute" bottom={0} right={0}>
            <FollowGroupButton selectedUser={userInfo} updateUser={updateUser} />
          </Box>
        )}
      </Stack>

      {userInfo.bio && (
        <Typography
          variant="body1"
          sx={{
            mt: { xs: 1, sm: 2 },
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

      {!smUp && <FollowGroupButton selectedUser={userInfo} updateUser={updateUser} />}
    </Box>
  );
}
