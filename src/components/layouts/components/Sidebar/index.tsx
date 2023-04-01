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
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Paper,
  Typography,
} from '@mui/material';
import { Fragment, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppearanceDialog, Notifications } from '~/components/common';
import { SidebarItem } from '~/models';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { configActions, selectOpenSidebar } from '~/store/slices/configSlice';
import { themeMixins } from '~/utils/theme';
import { showComingSoonToast } from '~/utils/toast';
import { SidebarWrapper } from './SidebarWrapper';

interface SidebarProps {
  type: 'normal' | 'drawer';
}

export function Sidebar({ type }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const { t } = useTranslation('sidebar');

  const dispatch = useAppDispatch();
  const openSidebar = useAppSelector(selectOpenSidebar);

  const [openAppearance, setOpenAppearance] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);

  const checkPathActive = (path: string) => {
    return !openAppearance && location.pathname === path;
  };

  const handleClose = () => {
    setOpenNotification(false);
    dispatch(configActions.toggleSidebar(false));
  };

  const handleClick = (callback?: () => void, isCloseSidebar: boolean = true) => {
    return () => {
      isCloseSidebar && handleClose();
      callback?.();
    };
  };

  const menu: SidebarItem[] = [
    {
      label: t('main.home'),
      icon: HomeOutlined,
      activeIcon: HomeRounded,
      active: checkPathActive('/'),
      onClick: () => navigate('/'),
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
      onClick: () => setOpenNotification(true),
    },
    {
      label: t('main.create'),
      icon: AddCircleOutlineOutlined,
      activeIcon: AddCircleRounded,
      active: checkPathActive('/create'),
      onClick: () => navigate('/create'),
    },
    {
      label: t('main.saved'),
      icon: BookmarkBorderOutlined,
      activeIcon: BookmarkRounded,
      active: checkPathActive('/saved'),
      onClick: () => navigate('/saved'),
    },
    {
      label: t('main.appearance'),
      icon: DarkModeOutlined,
      activeIcon: DarkModeRounded,
      active: openAppearance,
      onClick: () => setOpenAppearance(true),
    },
  ];

  return (
    <>
      <SidebarWrapper type={type} open={openSidebar} onClose={handleClose}>
        <List sx={{ width: { xs: '100%', md: 'fit-content', lg: '100%' } }}>
          {menu.map((item, idx) => {
            const { label, icon, activeIcon, active, onClick } = item;
            const Icon = active ? activeIcon : icon;

            return (
              <Fragment key={label}>
                <ListItem
                  disablePadding
                  sx={{
                    width: { xs: '100%', md: 'fit-content', lg: '100%' },
                    my: 1,
                  }}
                >
                  <ListItemButton
                    sx={{
                      ...(active ? themeMixins.paperBorder() : {}),
                      borderRadius: 2,
                      py: 1.5,
                      color: active ? 'text.primary' : 'text.secondary',
                      ':hover': {
                        bgcolor: active ? 'inherit' : 'none',
                      },
                    }}
                    onClick={handleClick(onClick, label !== t('main.notifications'))}
                  >
                    <ListItemIcon
                      sx={{
                        color: 'inherit',
                        minWidth: { md: '0', lg: '56px' },
                      }}
                    >
                      <Icon sx={{ fontSize: 24 }} />
                    </ListItemIcon>

                    <Typography
                      variant="body1"
                      component="div"
                      sx={{
                        ...themeMixins.truncate(1),
                        display: { xs: 'block', md: 'none', lg: '-webkit-box' },
                        fontWeight: active ? 500 : 400,
                      }}
                    >
                      {label}
                    </Typography>
                  </ListItemButton>
                </ListItem>

                {[2, 4].includes(idx) && <Divider sx={{ my: 1 }} />}
              </Fragment>
            );
          })}
        </List>

        <Paper
          sx={{
            ...themeMixins.paperBorder(),
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            width: openNotification ? '100%' : 0,
            transition: '0.3s ease-in-out',
            overflow: 'hidden',
          }}
        >
          <Notifications
            open={openNotification}
            onClose={() => setOpenNotification(!openNotification)}
          />
        </Paper>
      </SidebarWrapper>

      <AppearanceDialog open={openAppearance} onClose={() => setOpenAppearance(false)} />
    </>
  );
}
