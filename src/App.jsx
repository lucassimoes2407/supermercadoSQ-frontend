
import './App.css';
import {Link} from 'react-router-dom'
import RouterConfig from './routes/Router';

function App() {
  return (
    <div className="App">
      <h1>Supermercado SQ</h1>
      <div className='link__div'>
        <Link to='/'>Home</Link>
        <Link to='/about'>About</Link>
        <Link to='/login'>Entrar</Link>
        <Link to='/signup'>Cadastro</Link>
      </div>
      <hr />
      <RouterConfig/>
    </div>
  );
}

export default App;
