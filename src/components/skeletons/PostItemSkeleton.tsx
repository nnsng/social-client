import { Box, Card, CardHeader, ListItem, Stack } from '@mui/material';
import React from 'react';
import { themeMixins } from '~/utils/theme';
import { StyledSkeleton } from './StyledSkeleton';

export function PostItemSkeleton() {
  return (
    <ListItem
      disablePadding
      sx={{
        ...themeMixins.paperBorder(),
        my: 2,
        p: 1,
      }}
    >
      <Stack width="100%" alignItems="center">
        <StyledSkeleton
          variant="rectangular"
          sx={{
            flexShrink: 0,
            height: { xs: 80, sm: 100 },
            aspectRatio: { xs: '1', sm: '2' },
            borderRadius: 2,
            mr: 2,
          }}
        />

        <Box flexGrow={1} pt={{ xs: 2, sm: 0 }}>
          <StyledSkeleton variant="text" width="50%" height={20} sx={{ mb: 0.5 }} />
          <StyledSkeleton variant="text" width="80%" height={14} sx={{ mb: 0.5 }} />
          <StyledSkeleton variant="text" width="20%" height={10} sx={{ mb: 0.5 }} />
        </Box>
      </Stack>
    </ListItem>
  );
}
