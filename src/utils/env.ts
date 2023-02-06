export const env = (variable: string) => {
  const value = import.meta.env[variable];
  if (!value) throw new Error(`Missing: import.meta.env['${variable}'].`);
  return value as string;
};

export const variables = {
  serverUrl: 'VITE_SERVER_URL',
  apiUrl: 'VITE_API_URL',
  cdnUrl: 'VITE_CDN_URL',
  googleClientId: 'VITE_GOOGLE_CLIENT_ID',
  environment: 'VITE_ENVIRONMENT',
};
