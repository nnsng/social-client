import { Box, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

export interface INoPostProps {
  children?: string;
  createText?: string;
}

export function NoPost({ children, createText }: INoPostProps) {
  return (
    <Box
      sx={{
        textAlign: 'center',
        color: 'text.secondary',
        p: 2,
      }}
    >
      {children}{' '}
      {!!createText && (
        <Link to="/blog/create">
          <Typography component="span" sx={{ color: 'primary.main', textDecoration: 'underline' }}>
            {createText}
          </Typography>
        </Link>
      )}
    </Box>
  );
}
