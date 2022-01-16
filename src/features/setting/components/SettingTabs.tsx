import { AccountCircleRounded, LockRounded } from '@mui/icons-material';
import { Box, Hidden, Tab, Tabs } from '@mui/material';
import { SxProps } from '@mui/system';
import React, { SyntheticEvent, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { themeConstants } from 'utils/theme';

export interface SettingTabsProps {
  direction?: 'vertical' | 'horizontal';
  tabsSx?: SxProps;
}

export default function SettingTabs({ direction, tabsSx }: SettingTabsProps) {
  const location = useLocation();

  const [tab, setTab] = useState<number>(() => {
    switch (location.pathname) {
      case '/settings/edit-profile':
        return 0;

      case '/settings/change-password':
        return 1;

      default:
        return 0;
    }
  });

  const handleChangeTab = (event: SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const tabItemList = [
    {
      label: 'Thông tin cá nhân',
      mobileLabel: 'Thông tin',
      linkTo: 'edit-profile',
    },
    {
      label: 'Đổi mật khẩu',
      mobileLabel: 'Mật khẩu',
      linkTo: 'change-password',
    },
  ];

  return (
    <>
      <Hidden smDown>
        <Tabs
          orientation="vertical"
          value={tab}
          sx={{
            minHeight: `calc(100vh - (82px + ${themeConstants.headerHeight}))`,
            borderRight: 1,
            borderColor: 'divider',
          }}
          onChange={handleChangeTab}
        >
          {tabItemList.map(({ label, linkTo }, idx) => (
            <Tab
              key={idx}
              label={label}
              component={Link}
              to={linkTo}
              sx={{
                alignItems: 'flex-start',
                pr: 4,
                fontSize: 18,
                fontWeight: 500,
                textTransform: 'none',
              }}
            />
          ))}
        </Tabs>
      </Hidden>

      <Hidden smUp>
        <Tabs
          orientation="horizontal"
          value={tab}
          variant="fullWidth"
          sx={{
            position: 'relative',
            '::after': {
              content: '""',
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              height: '1px',
              bgcolor: 'divider',
            },
          }}
          onChange={handleChangeTab}
        >
          {tabItemList.map(({ mobileLabel, linkTo }, idx) => (
            <Tab
              key={idx}
              label={mobileLabel}
              component={Link}
              to={linkTo}
              sx={{
                fontSize: 18,
                fontWeight: 500,
                textTransform: 'none',
              }}
            />
          ))}
        </Tabs>
      </Hidden>
    </>
  );
}
