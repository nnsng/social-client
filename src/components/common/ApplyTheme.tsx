import { ThemeProvider } from '@mui/material';
import { useAppSelector } from 'app/hooks';
import { selectThemeMode } from 'features/common/themeSlice';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { getTheme } from 'utils/theme';

export interface ApplyThemeProps {
  children: any;
}

export function ApplyTheme({ children }: ApplyThemeProps) {
  const themeMode = useAppSelector(selectThemeMode);

  return (
    <ThemeProvider theme={getTheme(themeMode)}>
      {children}
      <ToastContainer theme={themeMode} autoClose={3000} />
    </ThemeProvider>
  );
}
