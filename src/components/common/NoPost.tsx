import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

export function NoPost() {
  const { t } = useTranslation('noPost');

  return (
    <Typography color="text.secondary" textAlign="center" p={2}>
      {t('text')}
    </Typography>
  );
}
