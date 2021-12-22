import { Box, Container, Grid, Hidden, Typography } from '@mui/material';
import { Header } from 'components/common';
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import SettingTabs from './components/SettingTabs';
import { ChangePasswordPage, EditProfilePage } from './pages';

export default function Setting() {
  return (
    <Box>
      <Header />

      <Box component="main" pt={3}>
        <Container maxWidth="md">
          <Typography variant="h4" fontWeight="500" sx={{ userSelect: 'none' }}>
            Cài đặt
          </Typography>

          <Box mt={2}>
            <Grid container spacing={6}>
              <Grid item xs="auto">
                <Hidden smDown>
                  <SettingTabs
                    direction="vertical"
                    tabsSx={{
                      height: '100%',
                      minHeight: 'calc(100vh - (82px + 72px))',
                      borderRight: 1,
                      borderColor: 'divider',
                    }}
                  />
                </Hidden>

                <Hidden smUp>
                  <Box
                    sx={{
                      height: 48,
                      mb: -4,
                      borderBottom: 1,
                      borderColor: 'divider',
                    }}
                  >
                    <SettingTabs direction="horizontal" />
                  </Box>
                </Hidden>
              </Grid>

              <Grid item xs>
                <Box px={{ xs: 2, sm: 0 }}>
                  <Routes>
                    <Route path="/" element={<Navigate to="edit_profile" />} />
                    <Route path="edit_profile" element={<EditProfilePage />} />
                    <Route path="change_password" element={<ChangePasswordPage />} />
                  </Routes>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
