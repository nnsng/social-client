import i18next from 'i18next';
import { setLocalConfig } from './common';
import { LANGUAGE } from './constants';

export const useTranslateFiles = (...files: string[]) => {
  const translations: { [key: string]: any } = {};
  for (const file of files) {
    translations[file] = i18next.getResourceBundle(i18next.language, file);
  }
  return translations;
};

export const changeGlobalLanguage = (language: string) => {
  i18next.changeLanguage(language);
  setLocalConfig(LANGUAGE, language);
};
