import { ThemeProvider } from '@mui/material';
import { useAppSelector } from 'app/hooks';
import favicons from 'assets/favicons';
import { selectThemeColor, selectThemeMode } from 'features/common/configSlice';
import React, { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { getTheme } from 'utils/theme';

export interface ApplyThemeProps {
  children: any;
}

export function ApplyTheme({ children }: ApplyThemeProps) {
  const themeMode = useAppSelector(selectThemeMode);
  const themeColor = useAppSelector(selectThemeColor);

  useEffect(() => {
    document.documentElement.style.setProperty('--color-primary', themeColor);
    document.documentElement.style.setProperty('--color-primary', themeColor);

    const favicon = document.getElementById('favicon') as any;
    favicon.href = favicons[themeColor];
  }, [themeColor]);

  return (
    <ThemeProvider theme={getTheme(themeMode, themeColor)}>
      {children}
      <ToastContainer theme={themeMode} autoClose={3000} />
    </ThemeProvider>
  );
}
