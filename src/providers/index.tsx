import { CustomThemeProvider } from '@/components/common';
import { store } from '@/store';
import { env } from '@/utils/env';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <GoogleOAuthProvider clientId={env.VITE_GOOGLE_CLIENT_ID}>
        <CustomThemeProvider>
          <BrowserRouter>{children}</BrowserRouter>
        </CustomThemeProvider>
      </GoogleOAuthProvider>
    </Provider>
  );
}
