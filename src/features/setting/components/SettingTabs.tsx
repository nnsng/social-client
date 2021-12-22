import { Tab, Tabs } from '@mui/material';
import { SxProps } from '@mui/system';
import React, { SyntheticEvent, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export interface SettingTabsProps {
  direction?: 'vertical' | 'horizontal';
  tabsSx?: SxProps;
}

export default function SettingTabs({ direction, tabsSx }: SettingTabsProps) {
  const location = useLocation();

  const [tab, setTab] = useState<number>(() => {
    switch (location.pathname) {
      case '/settings/edit_profile':
        return 0;

      case '/settings/change_password':
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
      linkTo: 'edit_profile',
    },
    {
      label: 'Đổi mật khẩu',
      linkTo: 'change_password',
    },
  ];

  return (
    <Tabs orientation={direction} value={tab} sx={tabsSx} onChange={handleChangeTab}>
      {tabItemList.map(({ label, linkTo }, idx) => (
        <Tab
          key={idx}
          label={label}
          component={Link}
          to={linkTo}
          sx={{
            alignItems: 'flex-start',
            pr: { xs: 'auto', sm: 4 },
            fontSize: 18,
            fontWeight: 500,
            textTransform: 'none',
          }}
        />
      ))}
    </Tabs>
  );
}
