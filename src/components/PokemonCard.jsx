import { useState, useEffect } from 'react';
import axios from 'axios';
import typeColors from '../constants/typeColors';
import './PokemonCard.css';


const PokemonCard = ({ url }) => {
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    axios.get(url)
      .then(res => setPokemon(res.data))
      .catch(err => console.error(err));
  }, [url]);

  if (!pokemon) return null;

  const primaryType = pokemon.types[0]?.type.name;
  const backgroundColor = typeColors[primaryType] || '#f9f9f9';

  return (
    <div className="pokemon-card" style={{ backgroundColor }}>
      <h3>#{pokemon.id} {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h3>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <p><strong>Type:</strong> {pokemon.types.map(t => t.type.name).join(', ')}</p>
      <p><strong>Height:</strong> {pokemon.height}</p>
      <p><strong>Weight:</strong> {pokemon.weight}</p>
    </div>
  );
};

export default PokemonCard;
