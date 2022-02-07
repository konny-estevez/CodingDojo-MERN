import axios from 'axios';

const defaultPageSize = 20;
const baseUrl = 'https://pokeapi.co/api/v2/pokemon';

const getPokemons = async (pageNumber, pageSize) => {
    let pokemons = [];

    console.log("Llamando API Pokemon - " + new Date());
    if (!pageSize) {
        pageSize = defaultPageSize;
    }
    if (!pageNumber || pageNumber === 1) {
        await axios.get(`${baseUrl}?limit=${pageSize}`)
            .then(response => pokemons = response.data)
            .catch(error => error);
    }
    else {
        pageNumber--;
        await axios.get(`${baseUrl}?offset=${pageNumber*pageSize}&limit=${pageSize}`)
            .then(response => pokemons = response.data)
            .catch(error => error);
    }
    return pokemons;
}

const getPokemonDetails = async (pokemonId) => {
    let pokemon = {};

    await axios.get(baseUrl + "/" + pokemonId)
        .then(response => pokemon = response.data)
        .catch(error => error);
    return pokemon;
}

export default{ getPokemons, getPokemonDetails};