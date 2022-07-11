import './App.css';
import { Link, useNavigate } from 'react-router-dom'
import RouterConfig from './routes/Router';
import { Button, IconButton, Snackbar } from '@mui/material';
import { Close } from '@mui/icons-material';
import { useSnack } from './hooks/useSnack';
import React from 'react';
import { ArrowBack, Dashboard, Settings } from '@mui/icons-material';


function App() {
  const { snack, handleSnackOpen, handleSnackState } = useSnack();

  const navigate = useNavigate();

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleSnackOpen}>
        UNDO
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
      <button onClick={() => handleSnackState({ ...snack, open: true, action })}>
        teste
      </button>
      <RouterConfig />
      <Snackbar
        {...snack}
        onClose={handleSnackOpen}
        key={'app__snack'}
      />
    </div>
  )
}


export default App;
