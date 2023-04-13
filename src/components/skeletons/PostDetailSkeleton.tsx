import { Box, CardHeader } from '@mui/material';
import { StyledCard } from '../common';
import { StyledSkeleton } from './StyledSkeleton';

export function PostDetailSkeleton() {
  return (
    <StyledCard>
      <StyledSkeleton variant="text" width="80%" height={24} />

      <CardHeader
        avatar={<StyledSkeleton variant="circular" width={40} height={40} />}
        title={<StyledSkeleton variant="text" width="20%" height={10} />}
        subheader={<StyledSkeleton variant="text" width="12%" height={10} sx={{ mt: 0.5 }} />}
        sx={{
          display: 'flex',
          alignItems: 'center',
          p: 0,
          mt: 2,
          '& .MuiCardHeader-subheader': {
            mt: -0.5,
          },
        }}
      />

      <Box width="100%" mt={2}>
        {[...new Array(5)].map((_, idx) => (
          <StyledSkeleton
            key={idx}
            variant="text"
            width={`${parseInt((Math.random() * 10 + 1).toString()) * 10}%`}
            height={16}
            sx={{ mt: 0.5 }}
          />
        ))}
      </Box>
    </StyledCard>
  );
}
