import { usePageTitle } from '@/hooks';
import { themeVariables } from '@/utils/theme';
import { Box, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

export function NotFoundPage() {
  const { t } = useTranslation('notFoundPage');

  usePageTitle(t('pageTitle'));

  return (
    <Stack height={`calc(100vh - ${themeVariables.headerHeight}px)`} textAlign="center">
      <Box m="auto" color="primary.main" sx={{ transform: 'translateY(-50%)' }}>
        <Typography variant="h1" component="div" fontWeight={600} letterSpacing={20}>
          4&#9785;4
        </Typography>

        <Typography variant="h6" component="div" fontWeight={600} letterSpacing={2}>
          {t('content')}
        </Typography>
      </Box>
    </Stack>
  );
}
