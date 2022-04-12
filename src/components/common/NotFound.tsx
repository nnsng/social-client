import { Stack, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { PageTitle } from './PageTitle';

export function NotFound() {
  const { t } = useTranslation('notFound');

  return (
    <>
      <PageTitle title={t('pageTitle')} />

      <Stack
        sx={{
          position: 'fixed',
          inset: 0,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'background.default',
        }}
      >
        <Typography
          sx={{
            fontSize: 120,
            fontWeight: 600,
            color: 'primary.main',
            letterSpacing: 20,
          }}
        >
          4&#9785;4
        </Typography>

        <Typography
          sx={{
            fontSize: 20,
            fontWeight: 600,
            color: 'primary.main',
            letterSpacing: 2,
          }}
        >
          {t('content')}
        </Typography>
      </Stack>
    </>
  );
}
