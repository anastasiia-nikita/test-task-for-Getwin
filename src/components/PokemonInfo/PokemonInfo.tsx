import React from 'react';
import './PokemonInfo.scss';
import { useSelector } from 'react-redux';
import { getSelectedPokemon } from '../../store/selectors';

export const PokemonInfo: React.FC = () => {
  const selectedPokemon = useSelector(getSelectedPokemon);

  return (
    <div className="container info">
      <h2 className="text-primary text-center">{`Pokemon details: ${selectedPokemon?.name}`}</h2>
      <div className="text-center">
        <img src={selectedPokemon?.photo} alt={selectedPokemon?.name} />
      </div>

      <div className="accordion">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingOne">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
              <strong>Types:</strong>
            </button>
          </h2>
          <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
            <div className="accordion-body">
              {selectedPokemon?.types.map(type => (
                <p key={type.url}>{type.name}</p>
              ))}
            </div>
          </div>
        </div>

        <div className="accordion-item">
          <h2 className="accordion-header" id="headingTwo">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
              <strong>Stats:</strong>
            </button>
          </h2>
          <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
            <div className="accordion-body">
              {selectedPokemon?.info.stats.map(stat => (
                <p key={stat.stat.url}>{`${stat.stat.name} - ${stat.base_stat}`}</p>
              ))}
            </div>
          </div>
        </div>

        <div className="accordion-item">
          <h2 className="accordion-header" id="headingThree">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="true" aria-controls="collapseThree">
              <strong>Moves:</strong>
            </button>
          </h2>
          <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
            <div className="accordion-body">
              {selectedPokemon?.info.moves.map(move => (
                <p key={move.move.url}>{move.move.name}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
