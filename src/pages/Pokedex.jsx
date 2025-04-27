import { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonCard from '../components/PokemonCard';
import '../components/PokemonCard.css';
import './Pokedex.css';

const Pokedex = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const limit = 12;

  useEffect(() => {
    const offset = (page - 1) * limit;
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;

    setLoading(true);
    setError(false);

    axios.get(url)
      .then(res => {
        setPokemonList(res.data.results);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError(true);
        setLoading(false);
      });
  }, [page]);

  return (
    <div className="pokedex-page">
      <h1>Pokédex</h1>

      {loading && <div className="pokedex-message">Loading Pokémon...</div>}
      {error && <div className="pokedex-error-message">Failed to load Pokémon. Try again!</div>}

      {!loading && !error && (
        <div className="pokemon-list-container">
          {pokemonList.map(pokemon => (
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
