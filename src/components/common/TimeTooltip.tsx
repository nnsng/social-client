import { Tooltip, TooltipProps } from '@mui/material';
import { ReactElement } from 'react';
import { formatTime } from 'utils/common';

export interface TimeTooltipProps {
  timestamp: any;
  format?: string;
  placement?: TooltipProps['placement'];
  arrow?: boolean;
  children: ReactElement;
}

export function TimeTooltip(props: TimeTooltipProps) {
  const {
    timestamp,
    format = 'DD/MM/YYYY, HH:mm',
    placement = 'right',
    arrow = true,
    children,
  } = props;

  return (
    <Tooltip title={formatTime(timestamp, format)} placement={placement} arrow={arrow}>
      {children}
    </Tooltip>
  );
}
