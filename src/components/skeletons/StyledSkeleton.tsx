import { Skeleton, SkeletonProps } from '@mui/material';

export function StyledSkeleton(props: SkeletonProps) {
  return <Skeleton animation="wave" {...props} />;
}
