import { Box, Card, CardHeader, Stack } from '@mui/material';
import React from 'react';
import { themeMixins } from 'utils/theme';
import { StyledSkeleton } from './StyledSkeleton';

export function PostCardSkeleton() {
  return (
    <Card
      sx={{
        ...themeMixins.paperBorder(),
        width: '100%',
        p: 2,
        mb: 2,
      }}
    >
      <CardHeader
        avatar={<StyledSkeleton variant="circular" width={40} height={40} />}
        title={<StyledSkeleton variant="text" width="20%" height={10} />}
        subheader={<StyledSkeleton variant="text" width="12%" height={10} sx={{ mt: 0.5 }} />}
        sx={{
          display: 'flex',
          alignItems: 'center',
          p: 0,
          '& .MuiCardHeader-subheader': {
            mt: -0.5,
          },
        }}
      />

      <Stack
        sx={{
          width: '100%',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'flex-start', sm: 'center' },
          justifyContent: 'space-between',
        }}
      >
        <Box flexGrow={1} width="100%" pt={{ xs: 2, sm: 0 }}>
          <StyledSkeleton variant="text" width="70%" height={18} />
          <StyledSkeleton variant="text" width="100%" height={14} />
          <StyledSkeleton variant="text" width="30%" height={14} />
        </Box>

        <StyledSkeleton
          variant="rectangular"
          sx={{
            minWidth: 200,
            height: 'unset',
            aspectRatio: '2',
            borderRadius: 2,
            ml: 2,
          }}
        />
      </Stack>
    </Card>
  );
}
