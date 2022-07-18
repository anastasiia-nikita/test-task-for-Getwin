import axios from 'axios';
// eslint-disable-next-line import/no-cycle
import { AppDispatch } from './index';
// eslint-disable-next-line import/extensions, import/no-unresolved
import { Pokemon, Type } from '../react-app-env';

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

// export const getFetchPokemonByURL = () => {
//   return async (dispatch: AppDispatch) => {
//     const allPokemonsFromServer = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0');
//     const response = allPokemonsFromServer.data.results;
//     const pokemonWithInfo: Pokemon[] = await Promise
//       .all(response.map(async (pokemon: { url: string; name: string; }) => {
//         const dataAboutCurrentPokemon = await axios.get(pokemon.url);
//         const infoAboutCurrentPokemon = dataAboutCurrentPokemon.data;

//         const undatePokemon: Pokemon = {
//           name: pokemon.name,
//           url: pokemon.url,
//           photo: infoAboutCurrentPokemon.sprites.front_default,
//           types: infoAboutCurrentPokemon.types.map((type: { type: Type; }) => ({
//             name: type.type.name,
//             url: type.type.url,
//           })),
//           info: {
//             stats: infoAboutCurrentPokemon.stats,
//             moves: infoAboutCurrentPokemon.moves,
//           },
//         };

//         return undatePokemon;
//       }));

//     return dispatch(SetPokemonsAction(pokemonWithInfo));
//   };
// };

export const getFetchPokemonByURL = (offset: number) => {
  return async (dispatch: AppDispatch) => {
    const responseCountAllResults = await axios.get('https://pokeapi.co/api/v2/pokemon');
    const CountAllResults = responseCountAllResults.data.count;

    if (offset >= 0 && offset <= CountAllResults) {
      const allPokemonsFromServer = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`);
      const response = allPokemonsFromServer.data.results;
      const pokemonWithInfo: Pokemon[] = await Promise
        .all(response.map(async (pokemon: { url: string; name: string; }) => {
          const dataAboutCurrentPokemon = await axios.get(pokemon.url);
          const infoAboutCurrentPokemon = dataAboutCurrentPokemon.data;

          const undatePokemon: Pokemon = {
            name: pokemon.name,
            url: pokemon.url,
            photo: infoAboutCurrentPokemon.sprites.front_default,
            types: infoAboutCurrentPokemon.types.map((type: { type: Type; }) => ({
              name: type.type.name,
              url: type.type.url,
            })),
            info: {
              stats: infoAboutCurrentPokemon.stats,
              moves: infoAboutCurrentPokemon.moves,
            },
          };

          return undatePokemon;
        }));

      dispatch(SetPokemonsAction(pokemonWithInfo));
    }
  };
};

// export const getNextfetchPokemonByURL = (offset: number) => {
//   return (dispatch: AppDispatch) => {
//     return axios.get(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`)
//       .then(response => dispatch(SetPokemonsAction(response.data.results)));
//   };
// };
