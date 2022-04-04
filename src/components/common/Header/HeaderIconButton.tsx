import { IconButton } from '@mui/material';
import React from 'react';

export interface HeaderIconButtonProps {
  icon: React.ReactElement;
  active?: boolean;
  onClick?: () => void;
}

function HeaderIconButton(props: HeaderIconButtonProps, ref?: any) {
  const { icon, active, onClick } = props;

  return (
    <IconButton
      ref={ref ?? null}
      onClick={onClick}
      sx={{
        mr: 2,
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
  );
}

export default React.forwardRef(HeaderIconButton);
