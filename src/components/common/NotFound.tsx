import { Stack, Typography } from '@mui/material';
import React from 'react';

export function NotFound() {
  return (
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
        404
      </Typography>
      <Typography
        sx={{
          fontSize: 20,
          fontWeight: 600,
          color: 'primary.main',
          letterSpacing: 2,
        }}
      >
        Oops...! Page not found
      </Typography>
    </Stack>
  );
}
