import './App.css';
import { useNavigate } from 'react-router-dom'
import RouterConfig from './routes/Router';
import { Button, createTheme, IconButton, Snackbar } from '@mui/material';
import { Close } from '@mui/icons-material';
import { useSnack } from './hooks/useSnack';
import React from 'react';
import CopyrightDevHub from './components/CopyrightDevHub';
import ResponsiveAppBar from './components/ResponsiveAppBar'
import { ThemeProvider } from "styled-components";

function App() {
  const { snack, handleSnackOpen, isAuth } = useSnack();
  const theme = createTheme();
  const navigate = useNavigate();

  const action = (
    <React.Fragment>
      <Button
        color="success"
        size="small"
        onClick={() => { navigate("/login") }}
      >
        Login
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleSnackOpen}
      >
        <Close fontSize="small" />
      </IconButton>
    </React.Fragment>
  );


  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <ResponsiveAppBar
          isAuth={isAuth}
        />

        <hr />
        <RouterConfig />
        <Snackbar
          {...snack}
          onClose={handleSnackOpen}
          key={'app__snack'}
        >
          {/* {(!!snack.children && snack.children) || ""} */}
        </Snackbar>
        <CopyrightDevHub sx={{ mt: 10 }} />
      </div>
    </ThemeProvider>
  )
}


export default App;
