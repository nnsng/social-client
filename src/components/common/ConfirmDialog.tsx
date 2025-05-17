import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

interface ConfirmDialogProps {
  type: string;
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
}

export function ConfirmDialog(props: ConfirmDialogProps) {
  const { type, open, onClose, onConfirm, loading } = props;

  const { t } = useTranslation('confirmDialog');

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
        {t(`${type}.title`)}
      </DialogTitle>

      <DialogContent dividers>
        <DialogContentText sx={{ color: 'text.primary' }}>{t(`${type}.content`)}</DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button color="inherit" disabled={!!loading} onClick={onClose}>
          {t('button.cancel')}
        </Button>

        <Button
          variant="contained"
          color="error"
          disabled={!!loading}
          autoFocus
          startIcon={!!loading && <CircularProgress size={20} color="error" />}
          onClick={onConfirm}
        >
          {t('button.confirm')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
