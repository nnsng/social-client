import { Skeleton, SkeletonProps } from '@mui/material';
import React from 'react';

export interface IStyledSkeletonProps extends SkeletonProps {}

export function StyledSkeleton(props: IStyledSkeletonProps) {
  return <Skeleton animation="wave" {...props} />;
}
