import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { changeGlobalLanguage, getLanguage } from 'utils/translation';

export function LanguageSelect() {
  const { t } = useTranslation('header');

  const handleChangeLanguage = (e: any) => {
    const language = e.target.value;
    changeGlobalLanguage(language);
  };

  return (
    <FormControl fullWidth sx={{ mr: 2 }}>
      <InputLabel id="select-language">{t('language')}</InputLabel>

      <Select
        labelId="select-language"
        size="small"
        value={getLanguage()}
        label={t('language')}
        onChange={handleChangeLanguage}
      >
        <MenuItem value="vi">Tiếng Việt</MenuItem>
        <MenuItem value="en">English</MenuItem>
      </Select>
    </FormControl>
  );
}
