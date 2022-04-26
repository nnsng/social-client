import { Theme, ThemeProvider } from '@mui/material';
import { useAppSelector } from 'app/hooks';
import favicons, { blackFavicon } from 'assets/favicons';
import { selectThemeColor, selectThemeMode } from 'features/common/configSlice';
import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { generateTheme, themeVariables } from 'utils/theme';

export interface IApplyThemeProps {
  children: any;
}

export function ApplyTheme({ children }: IApplyThemeProps) {
  const themeMode = useAppSelector(selectThemeMode);
  const themeColor = useAppSelector(selectThemeColor);

  const [theme, setTheme] = useState<Theme>(generateTheme(themeMode, themeColor));
  console.log('~ theme', theme);

  useEffect(() => {
    setTheme(generateTheme(themeMode, themeColor));
  }, [themeMode, themeColor]);

  useEffect(() => {
    document.documentElement.style.setProperty('--color-primary', themeColor);
    document.documentElement.style.setProperty('--color-primary', themeColor);

    const faviconElement = document.getElementById('favicon') as any;
    faviconElement.href = favicons[themeColor] ?? blackFavicon;
  }, [themeColor]);

  return (
    <ThemeProvider theme={theme}>
      {children}
      <ToastContainer
        theme={themeMode}
        autoClose={2000}
        style={{ top: themeVariables.headerHeight }}
      />
    </ThemeProvider>
  );
}
