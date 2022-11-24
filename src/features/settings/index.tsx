import { Box, Container, Paper, Stack, Typography } from '@mui/material';
import { Header, PageTitle } from 'components/common';
import { useTranslation } from 'react-i18next';
import { Navigate, Route, Routes } from 'react-router-dom';
import { themeMixins } from 'utils/theme';
import SettingLayout from './components/SettingLayout';
import SettingTabs from './components/SettingTabs';

export default function SettingFeature() {
  const { t } = useTranslation('settings');

  return (
    <>
      <PageTitle title={t('pageTitle')} />
      <Header />

      <Box component="main">
        <Container maxWidth="md">
          <Box>
            <Typography fontSize={{ xs: 20, sm: 24 }} fontWeight={600} textTransform="uppercase">
              {t('pageTitle')}
            </Typography>

            <Paper
              sx={{
                ...themeMixins.paperBorder(),
                my: 2,
                p: 2,
                pt: { xs: 0, sm: 2 },
              }}
            >
              <Stack direction={{ xs: 'column', sm: 'row' }}>
                <Box
                  sx={{
                    flexShrink: 0,
                    mr: { sm: 6 },
                    mb: { xs: 2, sm: 0 },
                    borderRight: { sm: 1 },
                    borderColor: { sm: 'divider' },
                  }}
                >
                  <SettingTabs />
                </Box>

                <Box flexGrow={1} pr={{ sm: 4 }}>
                  <Routes>
                    <Route path="/" element={<Navigate to="edit-profile" replace={true} />} />

                    <Route path="edit-profile" element={<SettingLayout mode="edit-profile" />} />
                    <Route
                      path="change-password"
                      element={<SettingLayout mode="change-password" />}
                    />
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
