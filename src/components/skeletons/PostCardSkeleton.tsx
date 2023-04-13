import { Box, CardHeader, Stack } from '@mui/material';
import { StyledCard } from '../common';
import { StyledSkeleton } from './StyledSkeleton';

export function PostCardSkeleton() {
  return (
    <StyledCard>
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
        direction={{ xs: 'column', sm: 'row' }}
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        justifyContent="space-between"
        width="100%"
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
            maxWidth: { xs: '100%', sm: 200 },
            width: '100%',
            height: 'unset',
            aspectRatio: '2',
            borderRadius: 2,
            mt: { xs: 2, sm: 0 },
            ml: { xs: 0, sm: 2 },
          }}
        />
      </Stack>
    </StyledCard>
  );
}
