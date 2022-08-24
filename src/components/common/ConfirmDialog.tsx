import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { translateFiles } from 'utils/translation';

export interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  content: string;
  onConfirm: () => void;
  loading?: boolean;
}

export function ConfirmDialog(props: ConfirmDialogProps) {
  const { open, onClose, title, content, onConfirm, loading } = props;

  const { dialog: dialogTranslation } = translateFiles('dialog');

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle
        sx={{
          py: 1.5,
          color: 'text.primary',
          fontSize: 18,
          fontWeight: 600,
        }}
      >
        {title}
      </DialogTitle>

      <DialogContent dividers>
        <DialogContentText sx={{ color: 'text.primary' }}>{content}</DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button color="inherit" disabled={!!loading} onClick={onClose}>
          {dialogTranslation.button.cancel}
        </Button>

        <Button
          variant="contained"
          color="error"
          disabled={!!loading}
          autoFocus
          startIcon={!!loading && <CircularProgress size={20} color="error" />}
          onClick={onConfirm}
        >
          {dialogTranslation.button.confirm}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
