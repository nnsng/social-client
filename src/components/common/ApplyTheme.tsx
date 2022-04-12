import { Button, Stack, ThemeProvider } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { configActions, selectThemeColor, selectThemeMode } from 'features/common/configSlice';
import { SupportedThemeColor } from 'models';
import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { getTheme } from 'utils/theme';
import favicons from 'assets/favicons';

export interface ApplyThemeProps {
  children: any;
}

const colors: SupportedThemeColor[] = ['#7575FF', '#FF652F', '#00CC6A', '#FFB900', '#C239B3'];

export function ApplyTheme({ children }: ApplyThemeProps) {
  const dispatch = useAppDispatch();
  const themeMode = useAppSelector(selectThemeMode);
  const themeColor = useAppSelector(selectThemeColor);

  useEffect(() => {
    document.documentElement.style.setProperty('--color-primary', themeColor);

    const favicon = document.getElementById('favicon') as any;
    favicon.href = favicons[themeColor];
  }, [themeColor]);

  const changeColor = (color: SupportedThemeColor) => {
    dispatch(configActions.changeThemeColor(color));
  };

  return (
    <ThemeProvider theme={getTheme(themeMode, themeColor)}>
      <Stack direction="row">
        {colors.map((color) => (
          <Button sx={{ bgcolor: color, color: '#fff' }} onClick={() => changeColor(color)}>
            {color}
          </Button>
        ))}
      </Stack>
      {children}
      <ToastContainer theme={themeMode} autoClose={3000} />
    </ThemeProvider>
  );
}
