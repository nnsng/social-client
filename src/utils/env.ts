import { z } from 'zod';

const envSchema = z.object({
  VITE_SERVER_URL: z.string().url(),
  VITE_CDN_URL: z.string().url(),
  VITE_GOOGLE_CLIENT_ID: z.string(),
  VITE_ENVIRONMENT: z.string(),
});

export const env = envSchema.parse(import.meta.env);
