import { useState, useEffect } from "react";
import axios from "axios";
import "./About.css"

const About = () => {
  const [topHeight, setTopHeight] = useState([]);
  const [topWeight, setTopWeight] = useState([]);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        // since all other pokemons with id higher than approx 1000 are just a special forms of the basic pokemons,
        // i decided to fetch only the first 1000 of them. :)
        const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=1000');
        const all = res.data.results;

        const detailed = await Promise.all(all.slice(0, 100).map(pokemon => axios.get(pokemon.url)));
        const data = detailed.map(d => d.data);

        setTopHeight([...data].sort((a, b) => b.height - a.height).slice(0, 5));
        setTopWeight([...data].sort((a, b) => b.weight - a.weight).slice(0, 5));
      } catch (error) {
        console.error(error);
      }
    };

    fetchPokemons();
  }, []);

  return (
    <div className="about-page">
      <h1>About This Pokédex</h1>
      <p className="about-description">
        This Pokédex was built using React and PokéAPI. It allows users to search, browse, and view detailed information about Pokémon with a clean interface.
      </p>

      <div className="about-section">
        <h2>🛠 Technologies Used</h2>
        <ul>
          <li>React</li>
          <li>Vite</li>
          <li>Axios</li>
          <li>React Router</li>
          <li>PokéAPI</li>
          <li>Custom CSS</li>
        </ul>
      </div>

      <div className="fun-facts-card">
        <h2>✨ Fun Facts ✨</h2>
        <p className="fun-facts-subtitle">Did you know?</p>

        <h3>Top 5 Tallest Pokémon</h3>
        <ul>
          {topHeight.map(p => (
            <li key={p.id}>
              {p.name.charAt(0).toUpperCase() + p.name.slice(1)} — Height: {p.height}
            </li>
          ))}
        </ul>

        <h3>Top 5 Heaviest Pokémon</h3>
        <ul>
          {topWeight.map(p => (
            <li key={p.id}>
              {p.name.charAt(0).toUpperCase() + p.name.slice(1)} — Weight: {p.weight}
            </li>
          ))}
        </ul>
      </div>

      <div className="about-section">
        <h2>🎓 Credits</h2>
        <p>
          This project uses data from <a href="https://pokeapi.co/" target="_blank" rel="noreferrer">PokéAPI</a>.
        </p>
      </div>

      <p className="created-by">Created by Tomas Psotka</p>
    </div>
  );
};

export default About;
