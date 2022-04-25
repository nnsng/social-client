import { Box, Stack, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Header } from './Header';
import { PageTitle } from './PageTitle';

export interface INotFoundProps {
  showHeader?: boolean;
}

export function NotFound({ showHeader = false }: INotFoundProps) {
  const { t } = useTranslation('notFound');

  return (
    <>
      <PageTitle title={t('pageTitle')} />

      {showHeader && <Header />}

      <Stack
        direction="column"
        sx={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'background.default',
        }}
      >
        <Box m="auto" textAlign="center">
          <Typography
            component="div"
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
            component="div"
            sx={{
              fontSize: 20,
              fontWeight: 600,
              color: 'primary.main',
              letterSpacing: 2,
            }}
          >
            {t('content')}
          </Typography>
        </Box>
      </Stack>
    </>
  );
}
