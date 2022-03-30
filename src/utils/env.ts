export const env = (variable: string) => {
  const value = import.meta.env[variable];
  if (!value) throw new Error(`Missing: import.meta.env['${variable}'].`);
  return value as string;
};

export const variables = {
  baseUrl: 'VITE_BASE_URL',
  baseApiUrl: 'VITE_BASE_API_URL',
  cdnUrl: 'VITE_CDN_URL',
  googleClientId: 'VITE_GOOGLE_CLIENT_ID',
};
