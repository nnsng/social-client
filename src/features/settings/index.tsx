import { Box, Container, Paper, Stack, Typography } from '@mui/material';
import { Header, PageTitle } from 'components/common';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Navigate, Route, Routes } from 'react-router-dom';
import { themeMixins } from 'utils/theme';
import SettingTabs from './components/SettingTabs';
import { ChangePasswordPage, EditProfilePage } from './pages';

export default function Settings() {
  const { t } = useTranslation('settings');

  return (
    <>
      <PageTitle title={t('pageTitle')} />
      <Header />

      <Box component="main">
        <Container maxWidth="md">
          <Box>
            <Typography fontSize="1.6rem" fontWeight={600} textTransform="uppercase">
              {t('pageTitle')}
            </Typography>

            <Paper
              sx={{
                ...themeMixins.paperBorder(),
                my: 2,
                p: 2,
              }}
            >
              <Stack sx={{ flexDirection: { xs: 'column', sm: 'row' } }}>
                <Box flexShrink={0} mr={{ sm: 6 }} mb={{ xs: 2, sm: 0 }}>
                  <SettingTabs />
                </Box>

                <Box flexGrow={1} px={{ xs: 2, sm: 0 }}>
                  <Routes>
                    <Route path="/" element={<Navigate to="edit-profile" replace={true} />} />
                    <Route path="edit-profile" element={<EditProfilePage />} />
                    <Route path="change-password" element={<ChangePasswordPage />} />
                    <Route path="*" element={<Navigate to="edit-profile" replace={true} />} />
                  </Routes>
                </Box>
              </Stack>
            </Paper>
          </Box>
        </Container>
      </Box>
    </>
  );
}
