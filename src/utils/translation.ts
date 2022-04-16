import i18next from 'i18next';

export const supportedLanguages = [
  { code: 'vi', name: 'Tiếng Việt' },
  { code: 'en', name: 'English' },
];

export const useTranslateFiles = (...files: string[]) => {
  const translations: any = {};
  for (const file of files) {
    translations[file] = i18next.getResourceBundle(i18next.language, file);
  }
  return translations;
};
