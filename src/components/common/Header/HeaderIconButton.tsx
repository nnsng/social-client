import { Badge, IconButton } from '@mui/material';
import { forwardRef, ReactElement } from 'react';

export interface HeaderIconButtonProps {
  icon: ReactElement;
  onClick?: () => void;
  showBadge?: boolean;
}

function HeaderIconButton(props: HeaderIconButtonProps, ref?: any) {
  const { icon, onClick, showBadge } = props;

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
          color: 'text.secondary',
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

export default forwardRef(HeaderIconButton);
