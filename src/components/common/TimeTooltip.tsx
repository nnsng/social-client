import { Tooltip, TooltipProps } from '@mui/material';
import { formatTime } from 'utils/common';

export interface TimeTooltipProps extends TooltipProps {
  timestamp: any;
  format?: string;
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
