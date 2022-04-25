import { Badge, IconButton } from '@mui/material';
import React from 'react';

export interface IHeaderIconButtonProps {
  icon: React.ReactElement;
  active?: boolean;
  onClick?: () => void;
  showBadge?: boolean;
}

function HeaderIconButton(props: IHeaderIconButtonProps, ref?: any) {
  const { icon, active, onClick, showBadge } = props;

  return (
    <Badge
      variant="dot"
      color="primary"
      invisible={!showBadge}
      sx={{
        '& .MuiBadge-badge': {
          top: 10,
          right: 10,
        },
      }}
    >
      <IconButton
        ref={ref ?? null}
        onClick={onClick}
        sx={{
          color: active ? 'text.primary' : 'text.secondary',
          '.MuiSvgIcon-root': {
            fontSize: 24,
          },
          ':hover': {
            color: 'text.primary',
          },
        }}
      >
        {icon}
      </IconButton>
    </Badge>
  );
}

export default React.forwardRef(HeaderIconButton);
