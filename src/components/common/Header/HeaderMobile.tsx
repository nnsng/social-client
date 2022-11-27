import { MenuOutlined } from '@mui/icons-material';
import { Avatar, Box, IconButton, Stack } from '@mui/material';
import { useAppSelector } from 'app/hooks';
import { selectCurrentUser } from 'features/auth/userSlice';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Brand, Sidebar } from '../';

export function HeaderMobile() {
  const currentUser = useAppSelector(selectCurrentUser);

  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <Stack alignItems="center" justifyContent="space-between" height="100%">
      <Box>
        <IconButton onClick={() => setOpenSidebar((x) => !x)}>
          <MenuOutlined />
        </IconButton>

        <Sidebar open={openSidebar} onClose={() => setOpenSidebar(false)} />
      </Box>

      <Brand />

      <Box>
        <Link to={`/profile/${currentUser?.username}`}>
          <Avatar
            src={currentUser?.avatar}
            alt={currentUser?.name}
            sx={{
              width: 36,
              height: 36,
              cursor: 'pointer',
            }}
          />
        </Link>
      </Box>
    </Stack>
  );
}
