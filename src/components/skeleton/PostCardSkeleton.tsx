import { Card, CardContent, CardHeader, Grid, Skeleton } from '@mui/material';
import React from 'react';

export function PostCardSkeleton() {
  return (
    <Card
      sx={{
        width: '100%',
        py: 3,
        px: 0,
        boxShadow: 'none',
        borderRadius: 0,
        borderTop: 1,
        borderColor: 'divider',
      }}
    >
      <CardHeader
        avatar={<Skeleton animation="wave" variant="circular" width={40} height={40} />}
        action={null}
        title={<Skeleton animation="wave" height={10} width="30%" sx={{ mb: 1 }} />}
        subheader={<Skeleton animation="wave" height={10} width="20%" />}
        sx={{ p: 0 }}
      />

      <CardContent sx={{ p: 0 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs>
            <Skeleton animation="wave" height={16} width="100%" sx={{ mb: 1 }} />
            <Skeleton animation="wave" height={16} width="80%" sx={{ mb: 1 }} />
          </Grid>

          <Grid item xs="auto">
            <Skeleton
              animation="wave"
              width={200}
              height={100}
              variant="rectangular"
              sx={{ borderRadius: 2, ml: 'auto', mr: 1 }}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
