import {
  Avatar,
  Box,
  List,
  ListItem,
  Stack,
  Theme,
  Tooltip,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { UserInfoButtonGroup } from 'components/common';
import { FollowUser, User } from 'models';
import { useTranslation } from 'react-i18next';
import { themeMixins } from 'utils/theme';

export interface UserInfoProps {
  userInfo: Partial<User>;
  updateUser?: (user: Partial<User>) => void;
}

export default function UserInfo(props: UserInfoProps) {
  const { userInfo, updateUser } = props;

  const { t } = useTranslation('profile');

  const smUp = useMediaQuery<Theme>((theme) => theme.breakpoints.up('sm'));

  const MAX_SHOWED_USER = 5;

  const followArray: ('following' | 'followers')[] = ['following', 'followers'];

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
            width: { xs: 60, sm: 80 },
            height: { xs: 60, sm: 80 },
            flexShrink: 0,
          }}
        />

        <Box sx={{ ml: { xs: 1, sm: 2 }, flexGrow: 1 }}>
          <Typography component="div" fontSize={{ xs: 20, sm: 24 }} fontWeight={600} mb={0}>
            {userInfo.name}
          </Typography>

          <Typography component="p" fontSize={{ xs: 12, sm: 16 }} mt={-0.5}>
            @{userInfo.username}
          </Typography>

          <Stack sx={{ '& > span:first-of-type': { ml: 0 } }}>
            {followArray.map((x) => {
              const numberOfUsers = userInfo?.[x]?.length || 0;
              return (
                <Tooltip
                  key={x}
                  title={
                    <List disablePadding>
                      {userInfo?.[x]?.slice(0, MAX_SHOWED_USER).map((user: FollowUser) => (
                        <ListItem key={user._id} disablePadding>
                          {user.name ?? t('you')}
                        </ListItem>
                      ))}
                      {numberOfUsers > MAX_SHOWED_USER && (
                        <ListItem disablePadding>
                          {t('others', { rest: numberOfUsers - MAX_SHOWED_USER })}
                        </ListItem>
                      )}
                    </List>
                  }
                  arrow
                >
                  <Stack
                    sx={{
                      flexDirection: { xs: 'column-reverse', sm: 'row' },
                      alignItems: 'center',
                      mr: 3,
                      fontSize: { xs: 12, sm: 14 },
                    }}
                  >
                    <Typography
                      component="span"
                      fontSize="inherit"
                      fontWeight={600}
                      mr={{ sm: 0.5 }}
                    >
                      {numberOfUsers}
                    </Typography>

                    <Typography component="span" fontSize="inherit">
                      {t(x)}
                    </Typography>
                  </Stack>
                </Tooltip>
              );
            })}
          </Stack>
        </Box>

        {smUp && (
          <Box position="absolute" bottom={0} right={0}>
            <UserInfoButtonGroup user={userInfo} updateUser={updateUser} />
          </Box>
        )}
      </Stack>

      {userInfo.bio && (
        <Typography
          fontSize={14}
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

      {!smUp && <UserInfoButtonGroup user={userInfo} updateUser={updateUser} />}
    </Box>
  );
}
