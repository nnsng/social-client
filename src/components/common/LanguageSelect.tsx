import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import i18next from 'i18next';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export interface LanguageSelectProps {}

export function LanguageSelect(props: LanguageSelectProps) {
  const { t } = useTranslation('header');

  const [language, setLanguage] = useState<string>(localStorage.getItem('language') || 'en');

  const handleChangeLanguage = (e: any) => {
    const language = e.target.value;
    setLanguage(language);
    i18next.changeLanguage(language);
    localStorage.setItem('language', language);
  };

  return (
    <FormControl fullWidth sx={{ mr: 2 }}>
      <InputLabel id="select-language">{t('language')}</InputLabel>
      <Select
        labelId="select-language"
        size="small"
        value={language}
        label={t('language')}
        onChange={handleChangeLanguage}
      >
        <MenuItem value="vi">Tiếng Việt</MenuItem>
        <MenuItem value="en">English</MenuItem>
      </Select>
    </FormControl>
  );
}
