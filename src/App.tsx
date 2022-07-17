import React from 'react';
import './App.scss';
import { PokemonList } from './components/PokemonList';

export const App: React.FC = () => {
  return (
    <div className="App">
      <main className="App__main">
        <div className="App__sidebar">
          <PokemonList />
        </div>

        {/* <div className="App__content">
          123
        </div> */}
      </main>
    </div>
  );
};
