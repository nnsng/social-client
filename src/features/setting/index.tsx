import { Box, Container, Grid, Hidden, Stack, Typography } from '@mui/material';
import { Header } from 'components/common';
import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import theme from 'styles/theme';
import SettingTabs from './components/SettingTabs';
import { ChangePasswordPage, EditProfilePage } from './pages';

export default function Setting() {
  useEffect(() => {
    document.title = 'Cài đặt';
  }, []);

  return (
    <Box>
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
    </Box>
  );
}
