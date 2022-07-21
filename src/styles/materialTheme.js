import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#12788c',
      light: '#4193a3',
      dark: '#0c5462',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#d80061',
      light: '#df3380',
      dark: '#970043',
      contrastText: '#ffffff',
    },
    error: {
      main: '#ff3d00',
      light: '#ff6333',
      dark: '#b22a00',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#ea9814',
      light: '#eeac43',
      dark: '#a36a0e',
      contrastText: 'rgba(0,0,0,0.87)',
    },
    background: {
      default: '#fafafa',
      paper: '#ffffff',
    },
    text: {
      primary: 'rgba(0,0,0,0.87)',
      secondary: 'rgba(0,0,0,0.54)',
      disabled: 'rgba(0,0,0,0.38)',
      hint: 'rgba(0,0,0,0.38)',
    },
    info: {
      main: '#2196f3',
      light: '#4dabf5',
      dark: '#1769aa',
      contrastText: '#ffffff',
    },
    divider: 'rgba(0,0,0,0.12)',
    success: {
      main: '#4caf50',
      light: '#6fbf73',
      dark: '#357a38',
      contrastText: 'rgba(0,0,0,0.87)',
    },
  },
});
