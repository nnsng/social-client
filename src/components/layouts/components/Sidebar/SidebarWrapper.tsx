import { MenuOutlined } from '@mui/icons-material';
import { Drawer, IconButton, Stack } from '@mui/material';
import { ReactNode } from 'react';
import { useCustomMediaQuery } from '~/hooks';
import { useAppDispatch } from '~/store/hooks';
import { configActions } from '~/store/slices/configSlice';
import { themeVariables } from '~/utils/theme';

interface SidebarWrapperProps {
  type: 'normal' | 'drawer';
  children: ReactNode;
  open: boolean;
  onClose?: () => void;
}

export function SidebarWrapper({ type, children, open, onClose }: SidebarWrapperProps) {
  const mdDown = useCustomMediaQuery('down', 'md');

  const dispatch = useAppDispatch();

  const toggleSidebar = () => {
    dispatch(configActions.toggleSidebar());
  };

  if (type === 'drawer' && mdDown) {
    return (
      <>
        <IconButton onClick={toggleSidebar}>
          <MenuOutlined />
        </IconButton>

        <Drawer anchor="left" open={open} onClose={onClose}>
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
      </>
    );
  }

  if (type === 'normal' && !mdDown) {
    return (
      <Stack
        component="aside"
        direction="column"
        sx={{
          position: 'sticky',
          top: themeVariables.headerHeight + 16,
        }}
      >
        {children}
      </Stack>
    );
  }

  return null;
}
