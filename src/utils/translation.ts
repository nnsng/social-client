import i18next from 'i18next';

interface Language {
  name: string;
  code: string;
}

export const supportedLanguages: Language[] = [
  { name: 'Tiếng Việt', code: 'vi' },
  { name: 'English', code: 'en' },
];

export const translateFiles = (...files: string[]) => {
  const translations: any = {};
  for (const file of files) {
    translations[file] = i18next.getResourceBundle(i18next.language, file);
  }
  return translations;
};
