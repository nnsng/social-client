import { CustomThemeProvider } from '@/components/common';
import { store } from '@/store';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <CustomThemeProvider>
        <BrowserRouter>{children}</BrowserRouter>
      </CustomThemeProvider>
    </Provider>
  );
}
