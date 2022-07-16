import { createTheme } from "@mui/material";

export const theme = createTheme({
    palette: {
      type: 'light',
      primary: {
        main: '#12788c',
        light: '#3C828E',
      },
      secondary: {
        main: '#e60050',
      },
      error: {
        main: '##ff3d00',
      },
      warning: {
        main: '#ea9814',
      },
      divider: '#12788c',
    },
});
