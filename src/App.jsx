import './App.css';
import { useNavigate } from 'react-router-dom'
import RouterConfig from './routes/Router';
import { badgeClasses, IconButton } from '@mui/material';
import { ArrowBack, Dashboard, Settings } from '@mui/icons-material';

function App() {
  
  const navigate = useNavigate();
  
  return (
    <div className="App">
      <header className="product__header">
        <IconButton aria-label="back" onClick={()=>{navigate(-1)}}>
            <ArrowBack/>
        </IconButton>
        <IconButton aria-label="home" onClick={()=>{navigate("/")}}>
            <Dashboard/>
        </IconButton>
        <IconButton aria-label="settings">
            <Settings/>
        </IconButton>
      </header>

      <RouterConfig/>
    </div>
  );
}

export default App;
