import { FlagRounded, PersonOffRounded } from '@mui/icons-material';
import { Avatar, Box, Stack, Typography } from '@mui/material';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActionMenu, CustomCard, UserButtonGroup } from '~/components/common';
import { MenuOption, User } from '~/models';
import { showComingSoonToast } from '~/utils/toast';

export interface UserInfoProps {
  userInfo: Partial<User>;
  updateUser?: (user: Partial<User>) => void;
}

export function UserInfo(props: UserInfoProps) {
  const { userInfo, updateUser } = props;

  const { t } = useTranslation('profile');

  const [openMenu, setOpenMenu] = useState(false);

  const anchorRef = useRef<any>(null);

  const actionMenu: MenuOption[] = [
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

  const followArray: ('following' | 'followers')[] = ['following', 'followers'];

  return (
    <CustomCard
      sx={{
        p: { xs: 1, sm: 2 },
        mb: 1,
      }}
    >
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        justifyContent="space-between"
        alignItems="flex-end"
        sx={{ '& > div': { width: '100%' } }}
      >
        <Stack>
          <Avatar
            src={userInfo.avatar}
            sx={{
              width: { xs: 60, sm: 80 },
              height: { xs: 60, sm: 80 },
              flexShrink: 0,
            }}
          />

          <Box flexGrow={1} ml={{ xs: 1, sm: 2 }}>
            <Typography variant="h6" component="p">
              {userInfo.name}
            </Typography>

            <Typography variant="body1" component="p" mb={0.5}>
              @{userInfo.username}
            </Typography>

            <Stack sx={{ '& > span:first-of-type': { ml: 0 } }}>
              {followArray.map((x) => (
                <Typography key={x} variant="subtitle2" component="span" fontWeight={400} mr={2}>
                  <strong>{userInfo?.[x]?.length || 0}</strong> {t(x)}
                </Typography>
              ))}
            </Stack>
          </Box>
        </Stack>

        <Box mt={{ xs: 1, sm: 0 }} maxWidth={{ sm: 300 }}>
          <UserButtonGroup user={userInfo} updateUser={updateUser} showActionMenu />
        </Box>
      </Stack>

      {userInfo.bio && (
        <Box
          mt={{ xs: 1, sm: 2 }}
          p={1}
          sx={{
            bgcolor: 'action.hover',
            borderRadius: 0.5,
            borderLeft: 4,
            borderColor: 'primary.main',
          }}
        >
          <Typography variant="subtitle2" fontWeight={400} textAlign="center" fontStyle="italic">
            {userInfo.bio}
          </Typography>
        </Box>
      )}

      <ActionMenu
        menu={actionMenu}
        open={openMenu}
        anchorEl={anchorRef.current}
        onClose={() => setOpenMenu(false)}
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 2 }}
      />
    </CustomCard>
  );
}
