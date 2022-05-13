import { PaletteMode, Theme } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { SxProps } from '@mui/system';

const configThemePalette = (mode: PaletteMode = 'light', color: string = '#7575FF') => {
  return {
    mode,
    ...(mode === 'light'
      ? {
          primary: {
            main: color,
            contrastText: '#FFFFFF',
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
            default: '#FFFFFF',
            paper: '#FFFFFF',
          },
          divider: 'rgba(0, 0, 0, 0.12)',
        }
      : {
          primary: {
            main: color,
            contrastText: 'rgba(0, 0, 0, 0.87)',
          },
          text: {
            primary: '#FFFFFF',
            secondary: 'rgba(255, 255, 255, 0.7)',
            disabled: 'rgba(255, 255, 255, 0.5)',
          },
          action: {
            active: '#FFFFFF',
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

export const generateTheme = (mode?: PaletteMode, color?: string) =>
  createTheme({
    palette: configThemePalette(mode, color),
    typography: {
      fontFamily: 'Montserrat, Arial, Helvetica, sans-serif',
    },
    components: {
      MuiChip: {
        styleOverrides: {
          root: {
            fontSize: 14,
          },
        },
      },
      MuiStack: {
        defaultProps: {
          direction: 'row',
        },
      },
      MuiButton: {
        defaultProps: {
          disableRipple: true,
          disableElevation: true,
        },
        styleOverrides: {
          root: {
            textTransform: 'none',
          },
          contained: {
            color: '#FFFFFF',
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
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            marginTop: '6px !important',
            marginBottom: '6px !important',
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

export const supportedThemeColors: string[] = [
  '#7575FF',
  '#FF652F',
  '#00CC6A',
  '#FFB900',
  '#C239B3',
];

export const themeVariables = {
  headerHeight: 72,
  scrollbarWidth: 6,
  boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
};

interface IMixins {
  [key: string]: (props?: any) => SxProps<Theme>;
}
type BorderType = '' | 'top' | 'bottom' | 'left' | 'right';

export const themeMixins: IMixins = {
  truncate: (maxLine: number): SxProps => ({
    display: '-webkit-box',
    WebkitLineClamp: maxLine,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }),
  paperBorder: (type: BorderType = '') => {
    const borderType = type ? `border${type[0].toUpperCase()}${type.slice(1)}` : 'border';

    return {
      bgcolor: 'background.paper',
      boxShadow: (theme) => (theme.palette.mode === 'light' ? themeVariables.boxShadow : undefined),
      [borderType]: (theme) => (theme.palette.mode === 'dark' ? 1 : 0),
      borderColor: 'divider',
    };
  },
};
