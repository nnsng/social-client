import { Box, Container, Stack, Typography } from '@mui/material';
import { Header, Title } from 'components/common';
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import SettingTabs from './components/SettingTabs';
import { ChangePasswordPage, EditProfilePage } from './pages';

export default function Setting() {
  return (
    <>
      <Title title="Cài đặt" />
      <Header />

      <Box component="main" pt={3}>
        <Container maxWidth="md">
          <Box>
            <Typography variant="h4" fontWeight="500" sx={{ userSelect: 'none' }}>
              Cài đặt
            </Typography>

            <Stack sx={{ flexDirection: { xs: 'column', sm: 'row' }, mt: 2 }}>
              <Box flexShrink={0} mr={{ sm: 6 }} mb={{ xs: 2, sm: 0 }}>
                <SettingTabs />
              </Box>

              <Box flexGrow={1} px={{ xs: 2, sm: 0 }}>
                <Routes>
                  <Route path="/" element={<Navigate to="edit-profile" />} />
                  <Route path="edit-profile" element={<EditProfilePage />} />
                  <Route path="change-password" element={<ChangePasswordPage />} />
                </Routes>
              </Box>
            </Stack>
          </Box>
        </Container>
      </Box>
    </>
  );
}
