import { Tooltip, TooltipProps } from '@mui/material';
import { formatTime } from 'utils/common';

export interface ITimeTooltipProps {
  timestamp: any;
  format?: string;
  placement?: TooltipProps['placement'];
  arrow?: boolean;
  children: React.ReactElement;
}

export function TimeTooltip(props: ITimeTooltipProps) {
  const { timestamp, format = 'DD/MM/YYYY, HH:mm', placement, arrow, children } = props;

  return (
    <Tooltip
      title={formatTime(timestamp, format)}
      placement={placement ?? 'right'}
      arrow={arrow ?? true}
    >
      {children}
    </Tooltip>
  );
}
