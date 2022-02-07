import './App.css';
import {PaginationGrid} from './components/PaginationGrid';
import {Router} from '@reach/router';
import { PokemonDetails } from './components/PokemonDetails';
import { useState } from 'react';

function App() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="container">
      <Router>
        <PaginationGrid path="/" title={"The Pokemons"} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
        <PokemonDetails path="/:id" />
      </Router>
    </div>
  );
}

export default App;
