import { MenuOutlined } from '@mui/icons-material';
import { Box, Drawer, IconButton, Stack } from '@mui/material';
import { ReactNode, useState } from 'react';
import { useCustomMediaQuery } from '~/hooks';
import { themeVariables } from '~/utils/theme';

interface SidebarWrapperProps {
  children: ReactNode;
}

const SIDEBAR_TOP = themeVariables.headerHeight + 16;

export function SidebarWrapper({ children }: SidebarWrapperProps) {
  const [open, setOpen] = useState(false);

  const mdUp = useCustomMediaQuery('up', 'md');

  if (mdUp) {
    return (
      <Stack
        component="aside"
        direction="column"
        sx={{
          position: 'sticky',
          top: SIDEBAR_TOP,
          height: `calc(100vh - ${SIDEBAR_TOP}px)`,
        }}
      >
        {children}
      </Stack>
    );
  }

  return (
    <Box>
      <IconButton onClick={() => setOpen((x) => !x)}>
        <MenuOutlined />
      </IconButton>

      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        <Stack
          direction="column"
          sx={{
            width: '75vw',
            maxWidth: 300,
            px: 1,
            pt: 3,
          }}
        >
          {children}
        </Stack>
      </Drawer>
    </Box>
  );
}
