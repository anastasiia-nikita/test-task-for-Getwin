import React from 'react';
import './App.scss';
import { PokemonList } from './components/PokemonList';

export const App: React.FC = () => {
  return (
    <div className="App">
      <main>
        <PokemonList />
      </main>
    </div>
  );
};
