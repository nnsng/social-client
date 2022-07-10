import { Backdrop, CircularProgress } from '@mui/material';

export interface IBackdropLoadingProps {
  open: boolean;
  onClose?: () => void;
}

export function BackdropLoading(props: IBackdropLoadingProps) {
  const { open, onClose } = props;

  return (
    <Backdrop
      open={open}
      onClick={onClose}
      sx={{ color: 'primary.main', bgcolor: 'background.default' }}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
