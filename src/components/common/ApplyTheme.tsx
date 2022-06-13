import { Theme, ThemeProvider } from '@mui/material';
import { useAppSelector } from 'app/hooks';
import favicons from 'assets/favicons';
import { selectLanguage, selectThemeColor, selectThemeMode } from 'features/common/configSlice';
import i18next from 'i18next';
import { SnackbarProvider } from 'notistack';
import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { generateTheme, themeVariables } from 'utils/theme';

export interface IApplyThemeProps {
  children?: React.ReactNode;
}

export function ApplyTheme({ children }: IApplyThemeProps) {
  const themeMode = useAppSelector(selectThemeMode);
  const themeColor = useAppSelector(selectThemeColor);
  const language = useAppSelector(selectLanguage);

  const [theme, setTheme] = useState<Theme>(generateTheme(themeMode, themeColor));

  useEffect(() => {
    setTheme(generateTheme(themeMode, themeColor));
  }, [themeMode, themeColor]);

  useEffect(() => {
    const faviconElement = document.getElementById('favicon') as any;
    faviconElement.href = favicons[themeColor] ?? favicons['#000000'];
    document.documentElement.style.setProperty('--color-primary', themeColor);
  }, [themeColor]);

  useEffect(() => {
    i18next.changeLanguage(language);
  }, [language]);

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        maxSnack={3}
        autoHideDuration={3000}
        preventDuplicate
        style={{
          color: theme.palette.common.white,
          backgroundColor: theme.palette.primary.main,
          cursor: 'pointer',
        }}
      >
        {children}
      </SnackbarProvider>

      <ToastContainer
        theme={themeMode}
        autoClose={2000}
        style={{ top: themeVariables.headerHeight }}
      />
    </ThemeProvider>
  );
}
