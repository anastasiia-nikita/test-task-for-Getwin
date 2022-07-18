import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './PokemonList.scss';
// eslint-disable-next-line import/extensions, import/no-unresolved
import { Type } from '../../react-app-env';
import { getPockemonsType, getPockemonsCount } from '../../api';
import { getFetchPokemonByURL } from '../../store/actions';
import { getVisiblePokemons, getSelectedPokemon } from '../../store/selectors';
import { TypedDispatch } from '../../store/index';
import { PokemonCard } from '../PokemonCard';
import { PokemonInfo } from '../PokemonInfo';

export const PokemonList: React.FC = () => {
  const dispatch: TypedDispatch = useDispatch();
  const [offset, setOffset] = useState(0);
  const [query, setQuery] = useState('');
  const [types, setTypes] = useState<Type[]>([]);
  const [selectedType, setSelectedType] = useState('');
  const [countAllPokemons, setCountAllPokemons] = useState(0);
  const pokemons = useSelector(getVisiblePokemons(query, selectedType));
  const selectedPokemon = useSelector(getSelectedPokemon);

  useEffect(() => {
    dispatch(getFetchPokemonByURL(offset));

    getPockemonsType()
      .then(typesFromServer => setTypes(typesFromServer.results))
      .catch(error => {
        throw new Error(`${error}`);
      });

    getPockemonsCount()
      .then(countFromServer => setCountAllPokemons(countFromServer.count))
      .catch(error => {
        throw new Error(`${error}`);
      });
  }, [offset]);

  const getNextPokemons = useCallback((offsets: number) => {
    if (offsets <= countAllPokemons) {
      setOffset(offsets + 20);
    }
  }, [offset]);

  const getPrevPokemons = useCallback((offsets: number) => {
    if (offsets - 20 >= 0) {
      setOffset(offsets - 20);
    }
  }, [offset]);

  return (
    <div className="pokemons">
      <div className="pokemons__block">
        <div className="pokemons__content container">
          <div className="text-center m-3">
            <img src="./images/pokeapi_256.png" alt="logo" />
          </div>
          <div className="text-center m-5">
            <button
              type="button"
              disabled={offset === 0}
              className="btn btn-warning me-4"
              onClick={() => {
                getPrevPokemons(offset);
              }}
            >
              Previous page
            </button>

            <button
              type="button"
              disabled={offset === countAllPokemons}
              className="btn btn-primary"
              onClick={() => {
                getNextPokemons(offset);
              }}
            >
              Next page
            </button>
          </div>

          <div>
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Search Pokemon"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>

          <select
            className="form-select mb-4"
            value={selectedType}
            onChange={(event) => setSelectedType(event.target.value)}
          >
            <option value="">Choose Pokemon type</option>
            {types.map(type => (
              <option key={type.name} value={type.name}>{type.name}</option>
            ))}
          </select>

          <div className="row g-3">
            {pokemons.map(pokemon => (
              <PokemonCard key={pokemon.url} pokemon={pokemon} />
            ))}
          </div>
        </div>

        {selectedPokemon !== null && (
          <div className="pokemons__sidebar">
            <PokemonInfo />
          </div>
        )}
      </div>
    </div>
  );
};
