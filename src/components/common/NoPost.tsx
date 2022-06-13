import { Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

export interface INoPostProps {}

export function NoPost(props: INoPostProps) {
  const { t } = useTranslation('noPost');

  return (
    <Typography
      sx={{
        p: 2,
        color: 'text.secondary',
        textAlign: 'center',
      }}
    >
      {t('text')}
    </Typography>
  );
}
