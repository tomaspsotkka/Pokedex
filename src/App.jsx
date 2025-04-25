import { Routes, Route, Link } from 'react-router-dom';
import Pokedex from './pages/Pokedex';
import About from './pages/About';
import './App.css';

function App() {
  return (
    <div>
      <nav className='navbar'>
        <Link to="/" className='nav-link'>Pokedex</Link>
        <Link to="/about" className='nav-link'>About</Link>
      </nav>

      <div className='content'>
        <Routes>
          <Route path="/" element={<Pokedex />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;