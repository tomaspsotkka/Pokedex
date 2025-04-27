import './Modal.css';
import ProgressBar from '../components/ProgressBar';
import { useEffect } from 'react';

const Modal = ({ isOpen, onClose, pokemon }) => {

    useEffect(() => {
        const htmlElement = document.documentElement;
        const bodyElement = document.body;

        if (isOpen) {
            htmlElement.classList.add('no-scroll');
            bodyElement.classList.add('no-scroll');
        } else {
            htmlElement.classList.remove('no-scroll');
            bodyElement.classList.remove('no-scroll');
        }

        return () => {
            htmlElement.classList.remove('no-scroll');
            bodyElement.classList.remove('no-scroll');
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>X</button>

                <h2>#{pokemon.id} {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>

                <div className="modal-images">
                    <div className="image-wrapper">
                        <img src={pokemon.sprites.front_default} alt={pokemon.name} className="pokemon-image" />
                        <p className="image-label">Normal</p>
                    </div>
                    {pokemon.sprites.front_shiny && (
                        <div className="image-wrapper">
                            <img src={pokemon.sprites.front_shiny} alt={pokemon.name + " shiny"} className="pokemon-image" />
                            <p className="image-label">Shiny</p>
                        </div>
                    )}
                </div>

                <div className="modal-info-section">
                    <h3>Basic Info</h3>
                    <p><strong>Type:</strong> {pokemon.types.map(t => t.type.name).join(', ')}</p>
                    <p><strong>Abilities:</strong> {pokemon.abilities.map(a => a.ability.name).join(', ')}</p>
                    <p><strong>Base Experience:</strong> {pokemon.base_experience}</p>
                </div>

                <div className="modal-info-section">
                    <h3>Size</h3>
                    <ProgressBar value={pokemon.height} maxValue={20} label="Height" />
                    <ProgressBar value={pokemon.weight} maxValue={1000} label="Weight" />
                </div>
                <div className='modal-info-section'>
                    <h3>Stats</h3>
                    <table className="stats-table">
                        <thead>
                            <tr>
                                <th>Stat</th>
                                <th>Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pokemon.stats.map((statObj) => (
                                <tr key={statObj.stat.name}>
                                    <td>{statObj.stat.name.replace('-', ' ').toUpperCase()}</td>
                                    <td>{statObj.base_stat}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Modal;
