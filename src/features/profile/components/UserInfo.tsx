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
import { IFollow, IUser } from 'models';
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

  const MAX_SHOWED_USER = 5;

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

          {smUp && (
            <Typography component="p" fontSize={{ xs: 14, sm: 16 }} mt={-0.5}>
              @{userInfo.username}
            </Typography>
          )}

          <Stack
            sx={{
              '& > span:first-of-type': {
                ml: 0,
              },
            }}
          >
            {['following', 'followers'].map((x) => (
              <Tooltip
                key={x}
                title={
                  <List disablePadding>
                    {(userInfo as any)[x].slice(0, MAX_SHOWED_USER).map((user: IFollow) => (
                      <ListItem key={user._id} disablePadding>
                        {user.name ?? t('you')}
                      </ListItem>
                    ))}
                    {(userInfo as any)[x].length > MAX_SHOWED_USER && (
                      <ListItem disablePadding>
                        {t('others', { rest: (userInfo as any)[x].length - MAX_SHOWED_USER })}
                      </ListItem>
                    )}
                  </List>
                }
                arrow
              >
                <Stack
                  direction={smUp ? 'row' : 'column-reverse'}
                  alignItems="center"
                  sx={{
                    mr: 3,
                    fontSize: { xs: 12, sm: 14 },
                  }}
                >
                  <Typography component="span" fontSize="inherit" fontWeight={600} mr={{ sm: 0.5 }}>
                    {(userInfo as any)[x]?.length || 0}
                  </Typography>

                  <Typography component="span" fontSize="inherit">
                    {t(x)}
                  </Typography>
                </Stack>
              </Tooltip>
            ))}
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
