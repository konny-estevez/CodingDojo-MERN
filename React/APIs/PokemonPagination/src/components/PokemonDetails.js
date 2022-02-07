import React, { useEffect, useState } from 'react';
import {Link} from '@reach/router';
import pokemonApi from './pokemonApi';

export const PokemonDetails = ({id}) => {
    const [pokemon, setPokemon] = useState({});
    const [imagePath, setImage] = useState('');

    useEffect(() => {
      getDetails(id);
    }, []);

    const getDetails = async (id) => {
        const poke = await pokemonApi.getPokemonDetails(id);
        setPokemon(poke);
        setImage(poke.sprites.other.dream_world.front_default);
    }

  return <div>
      <h1>Pokemon {pokemon.name}</h1>
      <Link to="/" >Home</Link>
      <br></br>
      <img src={imagePath} alt={pokemon.name} height="300px" />
      <p>{JSON.stringify(pokemon)}</p>
  </div>;
};
