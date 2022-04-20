import { Tab, Tabs, Theme, useMediaQuery } from '@mui/material';
import React, { SyntheticEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { themeVariables } from 'utils/theme';

export default function SettingTabs() {
  const location = useLocation();

  const { t } = useTranslation('settingTabs');

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
      label: t('profile.label'),
      mobileLabel: t('profile.mobileLabel'),
      linkTo: 'edit-profile',
    },
    {
      label: t('password.label'),
      mobileLabel: t('password.mobileLabel'),
      linkTo: 'change-password',
    },
  ];

  const hideOnMobile = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));

  return hideOnMobile ? (
    <Tabs
      orientation="vertical"
      value={tab}
      sx={{
        position: 'relative',
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          right: 0,
          height: '100%',
          borderRight: 1,
          borderColor: 'divider',
        },
        '& .MuiTabs-flexContainer': {
          height: `calc(100vh - (82px + ${themeVariables.headerHeight}))`,
        },
      }}
      onChange={handleChangeTab}
    >
      {tabItemList.map(({ label, linkTo }, idx) => (
        <Tab
          key={idx}
          label={label}
          component={Link}
          to={linkTo}
          replace={true}
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
  ) : (
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
          replace={true}
          sx={{
            fontSize: 18,
            fontWeight: 500,
            textTransform: 'none',
          }}
        />
      ))}
    </Tabs>
  );
}
