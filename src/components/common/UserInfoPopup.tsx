import { Avatar, Box, Stack, Theme, Typography, useMediaQuery } from '@mui/material';
import { IUser } from 'models';
import React, { useState } from 'react';
import { IPopperPopupProps, PopperPopup } from './PopperPopup';
import { UserInfoButtonGroup } from './UserInfoButtonGroup';

export interface IUserInfoPopupProps extends IPopperPopupProps {
  selectedUser: Partial<IUser>;
}

export function UserInfoPopup(props: IUserInfoPopupProps) {
  const { selectedUser, open, anchorEl, sx } = props;

  const [isOpen, setIsOpen] = useState<boolean>(open);

  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));

  return (
    <PopperPopup
      open={(!!open || isOpen) && lgUp}
      anchorEl={anchorEl}
      placement="bottom-start"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      sx={sx}
    >
      <Box p={2} width={350}>
        <Stack alignItems="center">
          <Avatar src={selectedUser.avatar} sx={{ width: 60, height: 60 }} />

          <Box ml={2}>
            <Typography fontSize={16} fontWeight={600} pb={0}>
              {selectedUser.name}
            </Typography>

            <Typography color="text.secondary" fontSize={14} fontWeight={400}>
              @{selectedUser.username}
            </Typography>
          </Box>
        </Stack>

        {selectedUser.bio && (
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
            {selectedUser.bio}
          </Typography>
        )}

        <UserInfoButtonGroup selectedUser={selectedUser} />
      </Box>
    </PopperPopup>
  );
}
