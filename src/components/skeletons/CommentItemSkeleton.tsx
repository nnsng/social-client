import { Box, Card, CardHeader, Grid, ListItem, Stack } from '@mui/material';
import React from 'react';
import { themeMixins } from 'utils/theme';
import { StyledSkeleton } from './StyledSkeleton';

export function CommentItemSkeleton() {
  return (
    <ListItem disableGutters>
      <Grid container spacing={2} sx={{ flexWrap: 'nowrap' }}>
        <Grid item xs="auto">
          <StyledSkeleton
            variant="circular"
            sx={{
              width: 36,
              height: 36,
            }}
          />
        </Grid>

        <Grid item xs>
          <Box
            sx={{
              width: '50%',
              py: 2,
              px: 2,
              bgcolor: 'action.selected',
              borderRadius: 4,
            }}
          >
            <StyledSkeleton variant="text" width="30%" height={10} sx={{ mb: 0.5 }} />
            <StyledSkeleton variant="text" width="50%" height={12} />
          </Box>
        </Grid>
      </Grid>
    </ListItem>
  );
}
