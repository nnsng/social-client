import { Box, Stack, Typography } from '@mui/material';
import { EmptyLayout } from 'components/layouts';
import { usePageTitle } from 'hooks';
import { useTranslation } from 'react-i18next';
import { themeVariables } from 'utils/theme';

export function NotFound() {
  const { t } = useTranslation('notFoundPage');

  usePageTitle(t('pageTitle'));

  return (
    <EmptyLayout>
      <Stack height={`calc(100vh - ${themeVariables.headerHeight}px)`} textAlign="center">
        <Box m="auto" sx={{ transform: 'translateY(-50%)' }}>
          <Typography
            color="primary.main"
            fontSize={120}
            fontWeight={600}
            mb={-2}
            letterSpacing={20}
          >
            4&#9785;4
          </Typography>

          <Typography color="primary.main" fontSize={20} fontWeight={600} letterSpacing={2}>
            {t('content')}
          </Typography>
        </Box>
      </Stack>
    </EmptyLayout>
  );
}
