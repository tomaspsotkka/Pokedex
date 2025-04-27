import { Routes, Route, Link } from 'react-router-dom';
import Pokedex from './pages/Pokedex';
import About from './pages/About';
import pokeball from './assets/pokeball.png';
import './App.css';

function App() {
  return (
    <div>
      <nav className='navbar'>
        <div className='nav-left'>
          <img src={pokeball} alt="Pokeball" className="pokeball-logo" />
          <Link to="/" className='nav-link'>Pokédex</Link>
          <Link to="/about" className='nav-link'>About</Link>
        </div>
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