import i18next from 'i18next';

export const translateFiles = (...files: string[]) => {
  const translations: any = {};
  for (const file of files) {
    translations[file] = i18next.getResourceBundle(i18next.language, file);
  }
  return translations;
};
