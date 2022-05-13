import { MoreHorizRounded, PersonAddRounded, PersonRemoveRounded } from '@mui/icons-material';
import { Avatar, Box, Button, Stack, Typography } from '@mui/material';
import { useAppSelector } from 'app/hooks';
import { selectCurrentUser } from 'features/auth/authSlice';
import { IUser } from 'models';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ContainedGrayButton } from './ContainedGrayButton';
import { IPopperPopupProps, PopperPopup } from './PopperPopup';

export interface IUserInfoPopupProps extends IPopperPopupProps {
  user: Partial<IUser>;
}

export function UserInfoPopup(props: IUserInfoPopupProps) {
  const { user, open, anchorEl, sx } = props;

  const { t } = useTranslation('userInfoPopup');

  const [isOpen, setIsOpen] = useState(open);

  const currentUser = useAppSelector(selectCurrentUser);

  return (
    <PopperPopup
      open={!!open || isOpen}
      anchorEl={anchorEl}
      placement="bottom-start"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      sx={sx}
    >
      <Box p={2} width={350}>
        <Stack alignItems="center">
          <Avatar src={user.avatar} sx={{ width: 60, height: 60 }} />

          <Box ml={2}>
            <Typography variant="subtitle1" color="text.primary" fontWeight={600} pb={0}>
              {user.name}
            </Typography>

            <Typography variant="subtitle2" color="text.secondary" fontWeight={400}>
              @{user.username}
            </Typography>
          </Box>
        </Stack>

        <Typography
          variant="body2"
          sx={{
            mt: 2,
            p: 1,
            fontStyle: 'italic',
            bgcolor: 'action.hover',
            borderRadius: 0.5,
            borderLeft: 4,
            borderColor: 'primary.main',
          }}
        >
          {user.bio}
        </Typography>

        {currentUser?._id !== user._id && (
          <Stack alignItems="center" spacing={1} mt={2}>
            {(currentUser?.following || []).includes(user._id || '') ? (
              <ContainedGrayButton
                variant="contained"
                startIcon={<PersonRemoveRounded />}
                fullWidth
              >
                {t('buttonLabel.unfollow')}
              </ContainedGrayButton>
            ) : (
              <Button variant="contained" startIcon={<PersonAddRounded />} fullWidth>
                {t('buttonLabel.follow')}
              </Button>
            )}

            <ContainedGrayButton sx={{ width: '25%' }}>
              <MoreHorizRounded />
            </ContainedGrayButton>
          </Stack>
        )}
      </Box>
    </PopperPopup>
  );
}
