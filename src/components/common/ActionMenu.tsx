import { Drawer, MenuList, Theme, useMediaQuery } from '@mui/material';
import { PopperPopupProps, PopperPopup } from '.';

export interface ActionMenuProps extends PopperPopupProps {}

export function ActionMenu(props: ActionMenuProps) {
  const { open, anchorEl, onClose, children, sx } = props;

  const hideOnMobile = useMediaQuery<Theme>((theme) => theme.breakpoints.up('sm'));

  return hideOnMobile ? (
    <PopperPopup open={open} anchorEl={anchorEl} sx={sx} onClose={onClose}>
      <MenuList disablePadding>{children}</MenuList>
    </PopperPopup>
  ) : (
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
