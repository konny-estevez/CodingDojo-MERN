import { useState } from 'react';
import './App.css';
import { Button } from './components/Button';
import { List } from './components/List';

function App() {
  const [pokemonList, setPokemonList] = useState([]);

  return (
    <div className="container">
      <Button setList={setPokemonList} />
      <List list={pokemonList} />
    </div>
  );
}

export default App;
