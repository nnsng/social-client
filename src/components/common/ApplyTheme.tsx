import { ThemeProvider } from '@mui/material';
import { useAppSelector } from 'app/hooks';
import { selectThemeMode } from 'features/common/configSlice';
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
    <ThemeProvider theme={getTheme(themeMode || 'light')}>
      {children}
      <ToastContainer theme={themeMode} autoClose={3000} />
    </ThemeProvider>
  );
}
