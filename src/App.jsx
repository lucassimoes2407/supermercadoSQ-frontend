import './App.css';
import { Link, useNavigate } from 'react-router-dom'
import RouterConfig from './routes/Router';
import { Button, IconButton, Snackbar } from '@mui/material';
import { Close } from '@mui/icons-material';
import { useSnack } from './hooks/useSnack';
import React from 'react';
import { ArrowBack, Dashboard, Settings } from '@mui/icons-material';
import ResponsiveAppBar from './components/Header';


function App() {
  const { snack, handleSnackOpen } = useSnack();

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
    <div className="App">
      <ResponsiveAppBar/>
      
      <hr />
      <RouterConfig />
      <Snackbar
        {...snack}
        onClose={handleSnackOpen}
        key={'app__snack'}
      >
      {/* {(!!snack.children && snack.children) || ""} */}
      </Snackbar>
    </div>
  )
} 


export default App;
