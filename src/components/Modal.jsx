import './Modal.css';

const Modal = ({ isOpen, onClose, pokemon }) => {
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
                    <p><strong>Height:</strong> {pokemon.height}</p>
                    <p><strong>Weight:</strong> {pokemon.weight}</p>
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
