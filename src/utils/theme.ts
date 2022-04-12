import { PaletteMode } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { SxProps } from '@mui/system';
import { SupportedThemeColor } from 'models';

const configPalette = (mode: PaletteMode = 'light', color: string = '#7575FF') => {
  return {
    mode,
    ...(mode === 'light'
      ? {
          primary: {
            // main: '#ff652f',
            main: color,
            contrastText: '#fff',
          },
          text: {
            primary: 'rgba(0, 0, 0, 0.87)',
            secondary: 'rgba(0, 0, 0, 0.6)',
            disabled: 'rgba(0, 0, 0, 0.38)',
          },
          action: {
            active: 'rgba(0, 0, 0, 0.54)',
            hover: 'rgba(0, 0, 0, 0.04)',
            selected: 'rgba(0, 0, 0, 0.08)',
            disabled: 'rgba(0, 0, 0, 0.26)',
            disabledBackground: 'rgba(0, 0, 0, 0.12)',
          },
          background: {
            default: '#fff',
            paper: '#fff',
          },
          divider: 'rgba(0, 0, 0, 0.12)',
        }
      : {
          primary: {
            // main: '#ff652f',
            main: color,
            contrastText: 'rgba(0, 0, 0, 0.87)',
          },
          text: {
            primary: '#fff',
            secondary: 'rgba(255, 255, 255, 0.7)',
            disabled: 'rgba(255, 255, 255, 0.5)',
          },
          action: {
            active: '#fff',
            hover: 'rgba(255, 255, 255, 0.08)',
            selected: 'rgba(255, 255, 255, 0.16)',
            disabled: 'rgba(255, 255, 255, 0.3)',
            disabledBackground: 'rgba(255, 255, 255, 0.12)',
          },
          background: {
            default: '#18191A',
            paper: '#242526',
          },
          divider: 'rgba(255, 255, 255, 0.12)',
        }),
  };
};

export const getTheme = (mode?: PaletteMode, color?: SupportedThemeColor) =>
  createTheme({
    palette: configPalette(mode, color),
    typography: {
      fontFamily: `'Montserrat', Arial, Helvetica, sans-serif`,
    },
    components: {
      MuiButton: {
        defaultProps: {
          disableRipple: true,
          disableElevation: true,
        },
        styleOverrides: {
          root: {
            textTransform: 'none',
          },
        },
      },
      MuiIconButton: {
        defaultProps: {
          disableRipple: true,
        },
      },
      MuiMenuItem: {
        defaultProps: {
          disableRipple: true,
        },
      },
      MuiPaper: {
        defaultProps: {
          elevation: 0,
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            marginTop: 6,
            marginBottom: 6,
          },
        },
      },
      MuiButtonBase: {
        defaultProps: {
          disableRipple: true,
        },
      },
      MuiSvgIcon: {
        defaultProps: {
          fontSize: 'small',
        },
      },
    },
  });

export const themeConstants = {
  headerHeight: '72px',
  boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
};

export const mixins = {
  truncate: (maxLine: number): SxProps => ({
    display: '-webkit-box',
    WebkitLineClamp: maxLine,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }),
};
