import { MenuOutlined } from '@mui/icons-material';
import { Box, IconButton, Stack } from '@mui/material';
import { useState } from 'react';
import { Brand, Sidebar, UserActions } from '..';

export function HeaderMobile() {
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

      <UserActions />
    </Stack>
  );
}
