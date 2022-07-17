import React from 'react';
// import classnames from 'classnames';
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
    <div className="car-card col-sm-6 col-md-4 col-xl-3">
      <div className="card border-white shadow">
        <img src={pokemon.photo} className="card-img-top" alt="photo112" />
        <div className="car-card__body card-body">
          <h5 className="car-card__title card-title">{pokemon.name}</h5>

          {pokemon.types.map((type => (
            <button type="button" key={type.url}>{type.name}</button>
          )))}

          <div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => selectPokemon(pokemon)}
            >
              Show more
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
