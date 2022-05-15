import React from 'react';
import { Tooltip } from '@mui/material';
import { formatTime } from 'utils/common';

export interface ITimeTooltipProps {
  timestamp: any;
  children: React.ReactElement;
}

export function TimeTooltip({ timestamp, children }: ITimeTooltipProps) {
  return (
    <Tooltip title={formatTime(timestamp, 'DD/MM/YYYY, HH:mm')} placement="right">
      {children}
    </Tooltip>
  );
}
