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
          top: 6,
          right: 6,
          minWidth: 10,
          height: 10,
          borderRadius: 40,
        },
      }}
    >
      <IconButton
        ref={ref ?? null}
        onClick={onClick}
        sx={{
          width: 36,
          height: 36,
          ml: 2,
          bgcolor: 'action.hover',
          color: active ? 'text.primary' : 'text.secondary',
          '.MuiSvgIcon-root': {
            fontSize: 20,
          },
          '&:hover': {
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
