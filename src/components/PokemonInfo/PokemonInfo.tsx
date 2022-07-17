import React from 'react';
import './PokemonInfo.scss';
// eslint-disable-next-line import/extensions, import/no-unresolved
import { Info } from '../../react-app-env';

interface Props {
  pokemonInfo: Info,
}

export const PokemonInfo: React.FC<Props> = ({ pokemonInfo }) => {
  return (
    <div className="container">
      <h2 className="text-centered">Pokemon details:</h2>

      <div className="accordion">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingOne">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
              <strong>Stats:</strong>
            </button>
          </h2>
          <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
            <div className="accordion-body">
              {pokemonInfo.stats.map(stat => (
                <p key={stat.stat.url}>{`${stat.stat.name} - ${stat.base_stat}`}</p>
              ))}
            </div>
          </div>
        </div>

        <div className="accordion-item">
          <h2 className="accordion-header" id="headingTwo">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
              <strong>Moves:</strong>
            </button>
          </h2>
          <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
            <div className="accordion-body">
              {pokemonInfo.moves.map(move => (
                <p key={move.move.url}>{move.move.name}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
