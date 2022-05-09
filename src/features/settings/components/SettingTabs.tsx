import { SxProps, Tab, Tabs, Theme, useMediaQuery } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { themeVariables } from 'utils/theme';

export default function SettingTabs() {
  const location = useLocation();

  const { t } = useTranslation('settingTabs');

  const [activeTab, setActiveTab] = useState<number>(0);

  useEffect(() => {
    const tab = checkTab(location.pathname);
    setActiveTab(tab);
  }, [location.pathname]);

  const checkTab = (pathname: string) => {
    switch (pathname) {
      case '/settings/edit-profile':
        return 0;
      case '/settings/change-password':
        return 1;
      default:
        return 0;
    }
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

  const tabsSx: SxProps = hideOnMobile
    ? {
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
          height: `calc(100vh - (82px + ${themeVariables.headerHeight}px))`,
        },
      }
    : {
        position: 'relative',
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '1px',
          bgcolor: 'divider',
        },
      };

  return (
    <Tabs
      value={activeTab}
      orientation={hideOnMobile ? 'vertical' : 'horizontal'}
      variant={hideOnMobile ? 'standard' : 'fullWidth'}
      sx={tabsSx}
    >
      {tabItemList.map(({ label, mobileLabel, linkTo }, idx) => (
        <Tab
          key={idx}
          label={hideOnMobile ? label : mobileLabel}
          component={Link}
          to={linkTo}
          replace={true}
          sx={{
            fontSize: 18,
            fontWeight: 500,
            textTransform: 'none',
            ...(hideOnMobile
              ? {
                  alignItems: 'flex-start',
                  pr: 4,
                }
              : {}),
          }}
        />
      ))}
    </Tabs>
  );
}
