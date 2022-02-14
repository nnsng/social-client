import { SxProps } from '@mui/system';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ff652f',
      contrastText: '#fff',
    },
    text: {
      primary: '#333',
      secondary: '#888',
    },
  },
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

export default theme;

export const themeConstants = {
  headerHeight: '72px',
  boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
};

export const mixins = {
  size: (width: number, height: number = width): SxProps => ({
    width,
    height,
  }),
  truncate: (maxLine: number): SxProps => ({
    display: '-webkit-box',
    WebkitLineClamp: maxLine,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }),
};
