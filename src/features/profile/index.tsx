import { MoreHorizRounded, PersonAddRounded, PersonRemoveRounded } from '@mui/icons-material';
import { Avatar, Box, Button, Container, Paper, Stack, Typography } from '@mui/material';
import userApi from 'api/userApi';
import { useAppSelector } from 'app/hooks';
import { ContainedGrayButton, Header, NotFound, PageTitle } from 'components/common';
import { selectCurrentUser } from 'features/auth/authSlice';
import { IUser } from 'models';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { themeVariables } from 'utils/theme';

export interface IProfileProps {}

export default function ProfilePage(props: IProfileProps) {
  const { username } = useParams();

  const { t } = useTranslation('profile');

  const currentUser = useAppSelector(selectCurrentUser);

  const [userInfo, setUserInfo] = React.useState<Partial<IUser> | null>(null);

  useEffect(() => {
    if (!username) return;

    (async () => {
      const user = (await userApi.getUserInfo(username)) as unknown as Partial<IUser>;
      setUserInfo(user);
    })();
  }, [username]);

  if (!userInfo) return <NotFound showHeader />;

  return (
    <>
      <PageTitle title="Profile" />
      <Header />

      <Box component="main">
        <Container maxWidth="md">
          <Paper
            sx={{
              p: 2,
              bgcolor: 'action.hover',
              borderRadius: 2,
            }}
          >
            <Stack alignItems="center">
              <Avatar
                src={userInfo.avatar}
                sx={{
                  width: 120,
                  height: 120,
                  bgcolor: 'action.hover',
                  flexShrink: 0,
                }}
              />

              <Box ml={2} flexGrow={1} position="relative">
                <Typography fontSize={32} fontWeight={600} mb={0}>
                  {userInfo.name}
                </Typography>

                <Typography fontSize={20} mt={-0.5}>
                  @{userInfo.username}
                </Typography>

                <Stack>
                  <Typography variant="subtitle2">
                    <b>100</b> Following
                  </Typography>
                  <Typography variant="subtitle2">
                    <b>100</b> Follower
                  </Typography>
                </Stack>

                {(currentUser?._id !== userInfo._id || true) && (
                  <Stack
                    alignItems="center"
                    spacing={1}
                    sx={{
                      position: 'absolute',
                      right: 0,
                      bottom: 0,
                      mt: 1,
                    }}
                  >
                    {(currentUser?.following || []).includes(userInfo._id || '') ? (
                      <ContainedGrayButton variant="contained" startIcon={<PersonRemoveRounded />}>
                        {t('buttonLabel.unfollow')}
                      </ContainedGrayButton>
                    ) : (
                      <Button variant="contained" startIcon={<PersonAddRounded />}>
                        {t('buttonLabel.follow')}
                      </Button>
                    )}

                    <ContainedGrayButton sx={{ width: '25%' }}>
                      <MoreHorizRounded />
                    </ContainedGrayButton>
                  </Stack>
                )}
              </Box>
            </Stack>
          </Paper>
        </Container>
      </Box>
    </>
  );
}
