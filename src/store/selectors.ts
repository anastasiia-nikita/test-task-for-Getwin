// eslint-disable-next-line import/extensions, import/no-unresolved
import { State } from '../react-app-env';

export const getSelectedPokemon = (state: State) => state.selectedPokemon;

export const getVisiblePokemons = (query: string, selectedType: string) => {
  return (state: State) => {
    const pokemonsByQuery = state.pokemons.filter(pokemon => (
      pokemon.name.toLowerCase().includes(query.toLowerCase())
    ));

    if (selectedType) {
      const pokemonsByType = pokemonsByQuery.filter(pokemon => (
        pokemon.types.some(item => item.name === selectedType)
      ));

      return pokemonsByType;
    }

    return pokemonsByQuery;
  };
};
