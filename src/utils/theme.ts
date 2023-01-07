import { PaletteMode, Theme } from '@mui/material';
import { createTheme, PaletteOptions, responsiveFontSizes } from '@mui/material/styles';
import { SxProps } from '@mui/system';

const getPalette = (mode: PaletteMode = 'light', mainColor = '#7575FF') => {
  const lightPalette: PaletteOptions = {
    primary: {
      main: mainColor,
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
      default: '#F9F9F9',
      paper: '#FFFFFF',
    },
    divider: 'rgba(0, 0, 0, 0.12)',
  };

  const darkPalette: PaletteOptions = {
    primary: {
      main: mainColor,
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
  };

  const palette = mode === 'light' ? lightPalette : darkPalette;
  palette.mode = mode;

  return palette;
};

export const configTheme = (mode?: PaletteMode, mainColor?: string) => {
  const theme = createTheme({
    palette: getPalette(mode, mainColor),
    typography: {
      fontFamily: 'Montserrat, Arial, Helvetica, sans-serif',
    },
    components: {
      MuiContainer: {
        defaultProps: {
          maxWidth: 'xl',
        },
      },
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
        variants: [
          {
            props: {
              direction: 'row',
            },
            style: {
              alignItems: 'center',
            },
          },
        ],
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
      MuiTooltip: {
        defaultProps: {
          arrow: true,
          placement: 'right',
        },
      },
    },
  });

  return responsiveFontSizes(theme);
};

export const themeVariables = {
  headerHeight: 72,
  scrollbarWidth: 6,
  boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
};

type BorderType = '' | 'top' | 'bottom' | 'left' | 'right';

export const themeMixins = {
  truncate: (maxLine: number): SxProps => ({
    display: '-webkit-box',
    WebkitLineClamp: maxLine,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }),

  paperBorder: (type: BorderType = ''): SxProps<Theme> => {
    const borderType = type ? `border${type[0].toUpperCase()}${type.slice(1)}` : 'border';
    return {
      bgcolor: 'background.paper',
      boxShadow: (theme) => (theme.palette.mode === 'light' ? themeVariables.boxShadow : undefined),
      [borderType]: (theme) => (theme.palette.mode === 'dark' ? 1 : 0),
      borderColor: 'divider',
      borderRadius: 2,
      overflow: 'hidden',
    };
  },
};
