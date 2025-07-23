import { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonCard from '../components/PokemonCard';
import '../components/PokemonCard.css';
import './Pokedex.css';

const Pokedex = () => {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(false);
  const [allPokemon, setAllPokemon] = useState([]);
  const limit = 15;

  useEffect(() => {
    const offset = (page - 1) * limit;
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`; // fetches limited amount of pokemons

    setLoading(true);
    setError(false);

    axios.get(url)
      .then(() => {
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError(true);
        setLoading(false);
      });
  }, [page]);

  useEffect(() => {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`; // fetches all pokemons

    axios.get(url)
      .then(res => setAllPokemon(res.data.results))
      .catch(err => console.error(err));
}, []);

  return (
    <div className="pokedex-page">
      <h1 className="pokedex-title">Pokédex</h1>

      {loading && <div className="pokedex-message">Loading Pokémon...</div>}
      {error && <div className="pokedex-error-message">Failed to load Pokémon. Try again!</div>}

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search Pokémon..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(1); 
          }}
        />
      </div>

      {!loading && !error && (
        <div className="pokemon-list-container">
          {allPokemon
          .filter(pokemon => pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()))
          .slice((page - 1) * limit, page * limit)
          .map(pokemon => (
            <PokemonCard key={pokemon.name} url={pokemon.url} />
          ))}
        </div>
      )}

      {!loading && !error && (
        <div className="pagination-container">
          <button onClick={() => setPage(p => Math.max(p - 1, 1))} disabled={page === 1}>
            Previous
          </button>
          <span>Page {page}</span>
          <button onClick={() => setPage(p => p + 1)}>Next</button>
        </div>
      )}
    </div>
  );
};

export default Pokedex;
