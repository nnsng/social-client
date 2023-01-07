import { Box, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { usePageTitle } from '~/hooks';
import { themeVariables } from '~/utils/theme';

export function NotFoundPage() {
  const { t } = useTranslation('notFoundPage');

  usePageTitle(t('pageTitle'));

  return (
    <Stack height={`calc(100vh - ${themeVariables.headerHeight}px)`} textAlign="center">
      <Box m="auto" sx={{ transform: 'translateY(-50%)' }}>
        <Typography color="primary.main" fontSize={120} fontWeight={600} letterSpacing={20}>
          4&#9785;4
        </Typography>

        <Typography color="primary.main" fontSize={20} fontWeight={600} letterSpacing={2}>
          {t('content')}
        </Typography>
      </Box>
    </Stack>
  );
}
