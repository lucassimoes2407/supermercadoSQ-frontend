import './App.css';
import { Link, useNavigate } from 'react-router-dom'
import RouterConfig from './routes/Router';
import { Button, IconButton, Snackbar } from '@mui/material';
import { Close, Copyright } from '@mui/icons-material';
import { useSnack } from './hooks/useSnack';
import React from 'react';
import { ArrowBack, Dashboard, Settings } from '@mui/icons-material';
import CopyrightDevHub from './components/CopyrightDevHub';


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
      <header className="product__header">
        <IconButton aria-label="back" onClick={() => { navigate(-1) }}>
          <ArrowBack />
        </IconButton>
        <IconButton aria-label="home" onClick={() => { navigate("/") }}>
          <Dashboard />
        </IconButton>
        <IconButton aria-label="settings">
          <Settings />
        </IconButton>
      </header>

      <h1>Supermercado SQ</h1>
      <div className='link__div'>
        <Link to='/'>Home</Link>
        <Link to='/about'>About</Link>
        <Link to='/login'>Entrar</Link>
        <Link to='/signup'>Cadastro</Link>
      </div>
      <hr />
      <RouterConfig />
      <Snackbar
        {...snack}
        onClose={handleSnackOpen}
        key={'app__snack'}
      >
        {/* {(!!snack.children && snack.children) || ""} */}
      </Snackbar>
      <CopyrightDevHub sx={{mt: 10}}/>
    </div>
  )
}


export default App;
