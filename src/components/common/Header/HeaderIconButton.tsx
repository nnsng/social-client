import { IconButton } from '@mui/material';
import React from 'react';

export interface IHeaderIconButtonProps {
  icon: React.ReactElement;
  active?: boolean;
  onClick?: () => void;
}

function HeaderIconButton(props: IHeaderIconButtonProps, ref?: any) {
  const { icon, active, onClick } = props;

  return (
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
  );
}

export default React.forwardRef(HeaderIconButton);
