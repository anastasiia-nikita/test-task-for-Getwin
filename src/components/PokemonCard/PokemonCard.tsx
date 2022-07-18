import React from 'react';
import classnames from 'classnames';
import './PokemonCard.scss';
import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line import/extensions, import/no-unresolved
import { Pokemon } from '../../react-app-env';
import { SetSelectedPokemonAction } from '../../store/actions';
import { getSelectedPokemonSelector } from '../../store/selectors';
import { TypedDispatch } from '../../store/index';

interface Props {
  pokemon: Pokemon,
}

export const PokemonCard: React.FC<Props> = ({ pokemon }) => {
  const dispatch: TypedDispatch = useDispatch();
  const selectedPokemon = useSelector(getSelectedPokemonSelector);

  const selectPokemon = (currentPokemon: Pokemon) => {
    if (selectedPokemon?.name !== currentPokemon.name) {
      dispatch(SetSelectedPokemonAction(currentPokemon));
    } else {
      dispatch(SetSelectedPokemonAction(null));
    }
  };

  return (
    <div className="col-sm-6 col-md-4 col-xl-3">
      <div className="card border-black shadow">
        <img src={pokemon.photo} className="card__image" alt={pokemon.name} />
        <div className="card-body">
          <h5 className="card__title card-title">{pokemon.name}</h5>

          <div className="text-center mb-3">
            <span className="me-2">Types:</span>
            {pokemon.types.map((type => (
              <button
                type="button"
                className="btn btn-outline-secondary me-3"
                key={type.url}
              >
                {type.name}
              </button>
            )))}
          </div>

          <div className="text-center">
            <button
              type="button"
              className={classnames('btn', 'btn-primary', {
                'btn-danger': selectedPokemon?.name === pokemon.name,
              })}
              onClick={() => selectPokemon(pokemon)}
            >
              {selectedPokemon?.name !== pokemon.name ? 'Open details' : 'Close details'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
