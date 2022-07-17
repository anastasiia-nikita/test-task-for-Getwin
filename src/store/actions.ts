import axios from 'axios';
// eslint-disable-next-line import/no-cycle
import { AppDispatch } from './index';
// eslint-disable-next-line import/no-cycle
// import { RootState, AppDispatch } from './index';
// eslint-disable-next-line import/extensions, import/no-unresolved
import { Pokemon, Type } from '../react-app-env';
// import { AppDispatch } from './index';

// eslint-disable-next-line no-shadow
export enum ActionType {
  SET_POKEMONS = 'SET_POKEMONS',
  SET_SELECTED_POKEMON = 'SET_SELECTED_POKEMON',
}

interface SetPokemons {
  type: ActionType.SET_POKEMONS,
  payload: Pokemon[],
}

interface SetSelectedPokemon {
  type: ActionType.SET_SELECTED_POKEMON,
  payload: Pokemon | null,
}

export type Action = SetPokemons | SetSelectedPokemon;

export const SetPokemonsAction = (payload: Pokemon[]): Action => ({
  type: ActionType.SET_POKEMONS,
  payload,
});

export const SetSelectedPokemonAction = (payload: Pokemon | null): Action => ({
  type: ActionType.SET_SELECTED_POKEMON,
  payload,
});

// export const getFetchPokemonByURL = () => {
//   return (dispatch: AppDispatch) => {
//     return axios.get('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0')
//       .then(response => dispatch(SetPokemonsAction(response.data.results)));
//   };
// };

export const getFetchPokemonByURL = () => {
  return async (dispatch: AppDispatch) => {
    const allPokemonsFromServer = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0');
    const response = allPokemonsFromServer.data.results;

    // eslint-disable-next-line no-console
    // console.log(response);
    // eslint-disable-next-line max-len
    const pokemonWithInfo: Pokemon[] = await Promise.all(response.map(async (pokemon: { url: string; name: string; }) => {
      const infoAbout = await axios.get(pokemon.url);
      const response2 = await infoAbout.data;

      const preparedPokemons: Pokemon = {
        name: pokemon.name,
        url: pokemon.url,
        photo: response2.sprites.front_default,
        types: response2.types.map((type: { type: Type; }) => ({
          name: type.type.name,
          url: type.type.url,
        })),
        info: {
          stats: response2.stats,
          moves: response2.moves,
        },
      };

      return preparedPokemons;
    }));

    return dispatch(SetPokemonsAction(pokemonWithInfo));
  };
};

export const getNextfetchPokemonByURL = (offset: number) => {
  return (dispatch: AppDispatch) => {
    return axios.get(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`)
      .then(response => dispatch(SetPokemonsAction(response.data.results)));
  };
};
