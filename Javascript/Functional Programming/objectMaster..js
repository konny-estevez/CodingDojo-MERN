const pokemon = Object.freeze([
        { "id": 1,   "name": "Bulbasaur",  "types": ["poison", "grass"] },
        { "id": 5,   "name": "Charmeleon", "types": ["fire"] },
        { "id": 9,   "name": "Blastoise",  "types": ["water"] },
        { "id": 12,  "name": "Butterfree", "types": ["bug", "flying"] },
        { "id": 16,  "name": "Pidgey",     "types": ["normal", "flying"] },
        { "id": 23,  "name": "Ekans",      "types": ["poison"] },
        { "id": 24,  "name": "Arbok",      "types": ["poison"] },
        { "id": 25,  "name": "Pikachu",    "types": ["electric"] },
        { "id": 37,  "name": "Vulpix",     "types": ["fire"] },
        { "id": 52,  "name": "Meowth",     "types": ["normal"] },
        { "id": 63,  "name": "Abra",       "types": ["psychic"] },
        { "id": 67,  "name": "Machamp",    "types": ["fighting"] },
        { "id": 72,  "name": "Tentacool",  "types": ["water", "poison"] },
        { "id": 74,  "name": "Geodude",    "types": ["rock", "ground"] },
        { "id": 87,  "name": "Dewgong",    "types": ["water", "ice"] },
        { "id": 98,  "name": "Krabby",     "types": ["water"] },
        { "id": 115, "name": "Kangaskhan", "types": ["normal"] },
        { "id": 122, "name": "Mr. Mime",   "types": ["psychic"] },
        { "id": 133, "name": "Eevee",      "types": ["normal"] },
        { "id": 144, "name": "Articuno",   "types": ["ice", "flying"] },
        { "id": 145, "name": "Zapdos",     "types": ["electric", "flying"] },
        { "id": 146, "name": "Moltres",    "types": ["fire", "flying"] },
        { "id": 148, "name": "Dragonair",  "types": ["dragon"] }
    ]);

    const bListPkmn = pokemon.filter( p => p.name[0] === "B" );

    const pkmnIds = pokemon.map( p => p.id );

// Una serie de objetos Pokémon donde la identificación es divisible por 3
const id_3_list = pokemon.filter( p => p.id % 3 === 0);
console.log("Pokemon con id divisible para 3");
console.log(id_3_list);

// una serie de objetos Pokémon que son del tipo "fuego"
const fire_type_list = pokemon.filter( p => p.types.includes("fire"));
console.log('');
console.log('Pokemon tipo fuego');
console.log(fire_type_list);

//Una variedad de objetos Pokémon que tienen más de un tipo
const more_one_type_list = pokemon.filter(p => p.types.length > 1);
console.log('');
console.log('Pokemon mas de 1 tipo');
console.log(more_one_type_list);

// una matriz con solo los nombres de los Pokémon
const names_list = pokemon.map( p => p.name);
console.log('');
console.log('Lista nombres pokemon');
console.log(names_list);

//Una matriz con solo los nombres de Pokémon con una identificación mayor que 99
const more_99_names_list = pokemon.filter(p => p.id > 99).map( p => p.name);
console.log('');
console.log('Lista nombres pokemon mayor 99');
console.log(more_99_names_list);
 
//una matriz con solo los nombres del pokémon cuyo único tipo es veneno
const poison_type_names_list = pokemon.filter(p => p.types[0] === 'poison' && p.types.length === 1).map( p => p.name);
console.log('');
console.log('Lista nombres pokemon tipo veneno');
console.log(poison_type_names_list);

//una matriz que contiene solo el primer tipo de todos los Pokémon cuyo segundo tipo es "volador"
const flying_type_first_type_list = pokemon.filter(p => p.types[1] === 'flying').map( p => p.types[0]);
console.log('');
console.log('Lista primer tipo pokemon tipo volador');
console.log(flying_type_first_type_list);

// un recuento de la cantidad de pokémon que son de tipo "normal"
const normal_type_count = pokemon.filter(p => p.types.includes('normal')).length;
console.log('');
console.log('Cantidad pokemon tipo normal');
console.log(normal_type_count);
    