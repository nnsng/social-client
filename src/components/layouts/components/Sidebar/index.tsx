import {
  AddCircleOutlineOutlined,
  AddCircleRounded,
  BookmarkBorderOutlined,
  BookmarkRounded,
  DarkModeOutlined,
  DarkModeRounded,
  ForumOutlined,
  ForumRounded,
  HomeOutlined,
  HomeRounded,
  NotificationsOutlined,
  NotificationsRounded,
} from '@mui/icons-material';
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Typography,
} from '@mui/material';
import { Fragment, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppearanceDialog } from '~/components/common';
import { SidebarItem } from '~/models';
import { themeMixins } from '~/utils/theme';
import { showComingSoonToast } from '~/utils/toast';
import { SidebarWrapper } from './SidebarWrapper';

export function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const { t } = useTranslation('sidebar');

  const [openDialog, setOpenDialog] = useState(false);

  const navigateTo = (path: string) => {
    navigate(path);
  };

  const checkPathActive = (path: string) => {
    return location.pathname === path;
  };

  const menu: SidebarItem[] = [
    {
      label: t('main.home'),
      icon: HomeOutlined,
      activeIcon: HomeRounded,
      active: checkPathActive('/'),
      onClick: () => navigateTo('/'),
    },
    {
      label: t('main.messages'),
      icon: ForumOutlined,
      activeIcon: ForumRounded,
      active: checkPathActive('/messages'),
      onClick: showComingSoonToast,
    },
    {
      label: t('main.notifications'),
      icon: NotificationsOutlined,
      activeIcon: NotificationsRounded,
      active: checkPathActive('/notifications'),
      onClick: showComingSoonToast,
    },
    {
      label: t('main.create'),
      icon: AddCircleOutlineOutlined,
      activeIcon: AddCircleRounded,
      active: checkPathActive('/create'),
      onClick: () => navigateTo('/create'),
    },
    {
      label: t('main.saved'),
      icon: BookmarkBorderOutlined,
      activeIcon: BookmarkRounded,
      active: checkPathActive('/saved'),
      onClick: () => navigateTo('/saved'),
    },
    {
      label: t('main.appearance'),
      icon: DarkModeOutlined,
      activeIcon: DarkModeRounded,
      active: openDialog,
      onClick: () => setOpenDialog(true),
    },
  ];

  return (
    <SidebarWrapper>
      <List>
        {menu.map((item, idx) => {
          const { label, icon, activeIcon, active, onClick } = item;
          const Icon = active ? activeIcon : icon;

          return (
            <Fragment key={label}>
              <ListItem disablePadding>
                <Box
                  width="100%"
                  color={active ? 'text.primary' : 'text.secondary'}
                  onClick={onClick}
                >
                  <ListItemButton sx={{ borderRadius: 2, py: 1.5 }}>
                    <ListItemIcon sx={{ color: 'inherit' }}>
                      <Icon sx={{ fontSize: 24 }} />
                    </ListItemIcon>

                    <Typography variant="body1" component="div" sx={{ ...themeMixins.truncate(1) }}>
                      {label}
                    </Typography>
                  </ListItemButton>
                </Box>
              </ListItem>

              {[2, 4].includes(idx) && <Divider sx={{ my: 1 }} />}
            </Fragment>
          );
        })}
      </List>

      <AppearanceDialog open={openDialog} onClose={() => setOpenDialog(false)} />
    </SidebarWrapper>
  );
}
