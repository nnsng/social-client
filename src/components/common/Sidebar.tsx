import {
  AddCircleOutlineOutlined,
  AddCircleRounded,
  BookmarkBorderOutlined,
  BookmarkRounded,
  DarkModeOutlined,
  DarkModeRounded,
  HomeOutlined,
  HomeRounded,
  MailOutlined,
  MailRounded,
  NotificationsOutlined,
  NotificationsRounded,
} from '@mui/icons-material';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  SxProps,
  Typography,
} from '@mui/material';
import { useAppSelector } from 'app/hooks';
import { selectCurrentUser } from 'features/auth/userSlice';
import { useCustomMediaQuery } from 'hooks';
import { Fragment, ReactNode, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { themeVariables } from 'utils/theme';
import { showComingSoonToast } from 'utils/toast';
import { AppearanceDialog } from './AppearanceDialog';

export interface SidebarItem {
  label: string;
  icon: typeof HomeRounded;
  activeIcon: typeof HomeRounded;
  active?: boolean;
  onClick?: () => void;
}

export interface SidebarProps {
  open?: boolean;
  onClose?: () => void;
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const { t } = useTranslation('sidebar');

  const currentUser = useAppSelector(selectCurrentUser);

  const [openDialog, setOpenDialog] = useState(false);

  const navigateTo = (path: string) => {
    onClose?.();
    navigate(path);
  };

  const checkPathActive = (path: string) => {
    return location.pathname === path;
  };

  const menu: SidebarItem[] = [
    {
      label: t('home'),
      icon: HomeOutlined,
      activeIcon: HomeRounded,
      active: checkPathActive('/blog'),
      onClick: () => navigateTo('/blog'),
    },
    {
      label: t('messages'),
      icon: MailOutlined,
      activeIcon: MailRounded,
      active: checkPathActive('/messages'),
      onClick: showComingSoonToast,
    },
    {
      label: t('notifications'),
      icon: NotificationsOutlined,
      activeIcon: NotificationsRounded,
      active: checkPathActive('/notifications'),
      onClick: showComingSoonToast,
    },
    {
      label: t('create'),
      icon: AddCircleOutlineOutlined,
      activeIcon: AddCircleRounded,
      active: checkPathActive('/blog/create'),
      onClick: () => navigateTo('/blog/create'),
    },
    {
      label: t('saved'),
      icon: BookmarkBorderOutlined,
      activeIcon: BookmarkRounded,
      active: checkPathActive('/blog/saved'),
      onClick: () => navigateTo('/blog/saved'),
    },
    {
      label: t('appearance'),
      icon: DarkModeOutlined,
      activeIcon: DarkModeRounded,
      active: openDialog,
      onClick: () => setOpenDialog(true),
    },
  ];

  const generateSidebarMenu = (menu: SidebarItem[], dividers: number[]) => {
    return menu.map((item, idx) => {
      const { label, icon, activeIcon, active, onClick } = item;
      const Icon = active ? activeIcon : icon;

      return (
        <Fragment key={label}>
          <ListItem disablePadding sx={{ my: 2 }}>
            <Box width="100%" color={active ? 'text.primary' : 'text.secondary'} onClick={onClick}>
              <ListItemButton sx={{ borderRadius: 10, color: 'inherit' }}>
                <ListItemIcon sx={{ color: 'inherit' }}>
                  <Icon sx={{ fontSize: 24 }} />
                </ListItemIcon>

                <Typography fontWeight={500}>{label}</Typography>
              </ListItemButton>
            </Box>
          </ListItem>

          {dividers.includes(idx) && <Divider />}
        </Fragment>
      );
    });
  };

  const mdDown = useCustomMediaQuery('down', 'md');

  return (
    <SidebarWrapper open={open} onClose={onClose} isOnMobile={mdDown}>
      <List>
        {!mdDown && (
          <ListItem disablePadding>
            <Box
              component={Link}
              to={`/profile/${currentUser?.username}`}
              width="100%"
              color="text.primary"
            >
              <ListItemButton sx={{ borderRadius: 10 }}>
                <ListItemIcon>
                  <Avatar
                    src={currentUser?.avatar}
                    alt={currentUser?.name}
                    sx={{ width: 28, height: 28 }}
                  />
                </ListItemIcon>

                <Typography fontWeight={600}>{currentUser?.name}</Typography>
              </ListItemButton>
            </Box>
          </ListItem>
        )}

        {generateSidebarMenu(menu, [2, 4])}
      </List>

      <AppearanceDialog open={openDialog} onClose={() => setOpenDialog(false)} />
    </SidebarWrapper>
  );
}

interface SidebarWrapperProps {
  children: ReactNode;
  open?: boolean;
  onClose?: () => void;
  isOnMobile?: boolean;
}

function SidebarWrapper({ children, open, onClose, isOnMobile }: SidebarWrapperProps) {
  const style: SxProps = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  };

  if (isOnMobile) {
    return (
      <Drawer anchor="left" open={open} onClose={onClose}>
        <Box
          sx={{
            ...style,
            width: '75vw',
            maxWidth: 300,
            height: '100vh',
          }}
        >
          {children}
        </Box>
      </Drawer>
    );
  }

  return (
    <Box
      sx={{
        ...style,
        position: 'sticky',
        top: themeVariables.headerHeight + 16,
        display: { xs: 'none', md: 'flex' },
        height: `calc(100vh - ${themeVariables.headerHeight + 16}px)`,
      }}
    >
      {children}
    </Box>
  );
}
