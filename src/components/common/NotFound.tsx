import { Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Header } from './Header';
import { PageTitle } from './PageTitle';

export interface NotFoundProps {
  showHeader?: boolean;
}

export function NotFound({ showHeader }: NotFoundProps) {
  const { t } = useTranslation('notFound');

  return (
    <>
      <PageTitle title={t('pageTitle')} />

      {!!showHeader && <Header />}

      <Stack
        direction="column"
        sx={{
          alignItems: 'center',
          justifyContent: 'center',
          position: 'fixed',
          inset: 0,
          bgcolor: 'background.default',
        }}
      >
        <Typography
          color="primary.main"
          fontSize={120}
          fontWeight={600}
          sx={{
            mb: -2,
            letterSpacing: 20,
          }}
        >
          4&#9785;4
        </Typography>

        <Typography
          color="primary.main"
          fontSize={20}
          fontWeight={600}
          sx={{
            letterSpacing: 2,
          }}
        >
          {t('content')}
        </Typography>
      </Stack>
    </>
  );
}
