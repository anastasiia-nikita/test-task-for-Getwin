// import axios from 'axios';
import { createStore, applyMiddleware, AnyAction } from 'redux';
import thunkMiddleware, { ThunkDispatch } from 'redux-thunk';
// eslint-disable-next-line import/extensions, import/no-unresolved
import { State } from '../react-app-env';
// eslint-disable-next-line import/no-cycle
import { Action, ActionType } from './actions';

const initialState: State = {
  pokemons: [],
  selectedPokemon: null,
};

const reducer = (state = initialState, action: Action): State => {
  switch (action.type) {
    case ActionType.SET_POKEMONS:
      return {
        ...state,
        pokemons: [...action.payload],
      };

    case ActionType.SET_SELECTED_POKEMON:
      return {
        ...state,
        selectedPokemon: action.payload,
      };

    default:
      return state;
  }
};

export const store = createStore(reducer, applyMiddleware(thunkMiddleware));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type TypedDispatch = ThunkDispatch<RootState, any, AnyAction>;
