import { Tab, Tabs, Theme, useMediaQuery } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

export default function SettingTabs() {
  const location = useLocation();
  const navigate = useNavigate();

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

  const goto = (linkTo: string) => {
    navigate(`/settings/${linkTo}`, { replace: true });
  };

  const tabItemList = [
    {
      label: t('profile.label'),
      mobileLabel: t('profile.mobileLabel'),
      path: 'edit-profile',
    },
    {
      label: t('password.label'),
      mobileLabel: t('password.mobileLabel'),
      path: 'change-password',
    },
  ];

  const smUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));

  return (
    <Tabs
      value={activeTab}
      orientation={smUp ? 'vertical' : 'horizontal'}
      variant={smUp ? 'standard' : 'fullWidth'}
      sx={{
        position: 'relative',
        '&::after': {
          content: '""',
          position: 'absolute',
          inset: { xs: 'auto auto 0 0', sm: '0 0 auto auto' },
          width: { xs: '100%', sm: 'auto' },
          height: { xs: '1px', sm: 'auto' },
          bgcolor: { xs: 'divider', sm: 'transparent' },
        },
      }}
    >
      {tabItemList.map(({ label, mobileLabel, path }, idx) => (
        <Tab
          key={idx}
          label={smUp ? label : mobileLabel}
          onClick={() => goto(path)}
          sx={{
            fontSize: { xs: 16, sm: 18 },
            fontWeight: 500,
            textTransform: 'none',
            alignItems: { sm: 'flex-start' },
            pr: { sm: 4 },
          }}
        />
      ))}
    </Tabs>
  );
}
