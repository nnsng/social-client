import { Drawer, MenuItem, MenuList, SxProps, Theme } from '@mui/material';
import { useCustomMediaQuery } from 'hooks';
import { AnchorEl, MenuOption } from 'models';
import { ReactNode } from 'react';
import { PopperPopup } from '.';

export interface ActionMenuProps {
  menu: MenuOption[];
  open: boolean;
  anchorEl: AnchorEl;
  onClose?: () => void;
  sx?: SxProps<Theme>;
  onClickWrapper?: (onClick?: () => void) => () => void;
}

export function ActionMenu(props: ActionMenuProps) {
  const { menu, onClickWrapper, ...rest } = props;

  const handleClick = (callback?: () => void) => {
    if (onClickWrapper) return onClickWrapper(callback);
    return callback;
  };

  return (
    <ActionMenuWrapper {...rest}>
      {menu.map(({ label, icon: Icon, onClick, show = true }, idx) =>
        show ? (
          <MenuItem
            key={idx}
            onClick={handleClick(onClick)}
            sx={{
              py: 1.5,
              px: 2.5,
              fontSize: 15,
            }}
          >
            <Icon sx={{ mr: 2, fontSize: 18 }} />
            {label}
          </MenuItem>
        ) : null
      )}
    </ActionMenuWrapper>
  );
}

interface ActionMenuWrapperProps extends Partial<ActionMenuProps> {
  children: ReactNode;
}

function ActionMenuWrapper(props: ActionMenuWrapperProps) {
  const { open = false, anchorEl, onClose, sx, children } = props;

  const smUp = useCustomMediaQuery('up', 'sm');

  if (smUp) {
    return (
      <PopperPopup open={open} anchorEl={anchorEl} sx={sx} onClose={onClose}>
        <MenuList disablePadding>{children}</MenuList>
      </PopperPopup>
    );
  }

  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          borderTopRightRadius: 16,
          borderTopLeftRadius: 16,
        },
      }}
    >
      <MenuList
        sx={{
          '& .MuiMenuItem-root': {
            px: 3,
          },
        }}
      >
        {children}
      </MenuList>
    </Drawer>
  );
}
