import { Stack, Typography } from '@mui/material';
import React from 'react';
import { PageTitle } from './PageTitle';

export function NotFound() {
  return (
    <>
      <PageTitle title="Trang không tồn tại" />

      <Stack
        sx={{
          position: 'fixed',
          inset: 0,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'background.default',
          userSelect: 'none',
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
          Oops...! Trang này không tồn tại
        </Typography>
      </Stack>
    </>
  );
}
