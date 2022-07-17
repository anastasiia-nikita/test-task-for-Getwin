import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './PokemonList.scss';
// eslint-disable-next-line import/extensions, import/no-unresolved
import { Type } from '../../react-app-env';
import { getPockemonsType } from '../../api';
import { getFetchPokemonByURL, getNextfetchPokemonByURL } from '../../store/actions';
import { getVisiblePokemons, getSelectedPokemonSelector } from '../../store/selectors';
import { TypedDispatch } from '../../store/index';
// eslint-disable-next-line import/named
import { PokemonCard } from '../PokemonCard';
import { PokemonInfo } from '../PokemonInfo';

export const PokemonList: React.FC = () => {
  // getPockemonsInfo('https://pokeapi.co/api/v2/type/')
  // // eslint-disable-next-line no-console
  //   .then(pokemonsFromServer => console.log(pokemonsFromServer.results));

  const dispatch: TypedDispatch = useDispatch();
  const [offset, setOffset] = useState(20);
  const [query, setQuery] = useState('');
  const [types, setTypes] = useState<Type[]>([]);
  const [selectedType, setSelectedType] = useState('');
  const pokemons = useSelector(getVisiblePokemons(query, selectedType));
  const selectedPokemon = useSelector(getSelectedPokemonSelector);

  useEffect(() => {
    dispatch(getFetchPokemonByURL());

    getPockemonsType()
      .then(typesFromServer => setTypes(typesFromServer.results));
  }, []);

  // eslint-disable-next-line no-console
  console.log(pokemons);

  // eslint-disable-next-line no-console
  console.log(selectedPokemon);

  // const API = 'https://pokeapi.co/api/v2/pokemon';
  // const pokemons = useSelector(getPokemonsSelector);

  // getPockemons('https://pokeapi.co/api/v2/pokemon/132')
  //   // eslint-disable-next-line no-console
  //   .then(pokemonsFromServer => console.log(pokemonsFromServer));

  // const infoAbout = await axios.get(pokemon.url);

  const getNewPokemons = (offsets: number) => {
    if (offsets < 1155) {
      dispatch(getNextfetchPokemonByURL(offsets));

      setOffset(offsets + 20);
    }
  };

  const getPrevPokemons = async (offsets: number) => {
    if (offsets - 20 > 0) {
      const newOffset = offsets - 40;

      dispatch(getNextfetchPokemonByURL(newOffset));
      setOffset(newOffset + 20);
    }
  };

  return (
    <div className="pokemons">
      <div className="pokemons__block">
        <div className="pokemons__content container">
          <button
            type="button"
            onClick={() => {
              getPrevPokemons(offset);
            }}
          >
            Previous page
          </button>

          <button
            type="button"
            onClick={() => {
              getNewPokemons(offset);
            }}
          >
            Next page
          </button>

          <div>
            <input
              type="text"
              className="form-control"
              placeholder="Search Pokemon"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>

          <select
            className="form-select"
            value={selectedType}
            onChange={(event) => setSelectedType(event.target.value)}
          >
            <option disabled value="">Choose Pokemon type</option>
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
            <PokemonInfo pokemonInfo={selectedPokemon.info} />
          </div>
        )}
      </div>
    </div>
  );
};
