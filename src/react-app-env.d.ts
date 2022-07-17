/// <reference types="react-scripts" />

export interface Pokemon {
  url: string,
  name: string,
  photo: string,
  types: Type[],
  info: Info,
}

export interface State {
  pokemons: Pokemon[],
  selectedPokemon: Pokemon | null,
}

export interface Info {
  stats: Stats[],
  moves: Moves[],
}

export interface Type {
  name: string,
  url: string,
}

export interface Stats {
  base_stat: number,
  stat: Stat,
}

export interface Stat {
  url: string,
  name: string,
}

export interface Move {
  url: string,
  name: string,
}

export interface Moves {
  move: Move,
}
