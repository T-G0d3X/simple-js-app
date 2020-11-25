// added
let pokemonRepository = (function () {
  let pokemonList = [
    { name: 'Venusaur', height: 3, type: ['grass', 'poison'] },
    { name: 'Charmeleon', height: 5, type: ['fire'] },
    { name: 'Pikachu', height: 4, type: ['electric'] },
    { name: 'Blastoise', height: 9, type: ['water'] },
  ];

  function getAll() {
    return pokemonList;
  }

  function add(poke) {
    // here we say typeof argument we pass into add function needs to be object for new pokemon
    if (typeof poke === 'object') {
      pokemonList.push(poke);
    } else {
      console.log('Invalid input');
    }
  }

  return {
    getAll: getAll,
    add: add,
  };
})();

// Here is value saved to variable pokemons --> pokemonList array
let pokemons = pokemonRepository.getAll();
// console.log(pokemons);

// loop using .forEach that writes strings to the page
pokemons.forEach(function (pokemon) {
  if (pokemon.height > 5) {
    document.write(
      `${pokemon.name} has a height of ${pokemon.height} - Wow, that's big!<br>`
    );
  } else {
    document.write(`${pokemon.name} has a height of ${pokemon.height} <br> `);
  }
});

// adding one more pokemon to the list
pokemonRepository.add({ name: 'Marowak', height: 4.5, type: ['ground'] });
console.log(pokemons);

//  loop over pokemonList array, writing name and height
// for (let i = 0; i < pokemonList.length; i++) {
//   if (pokemonList[i].height > 5) {
//     document.write(
//       `${pokemonList[i].name} has a height of ${pokemonList[i].height} - Wow, that's big!<br>`
//     );
//   } else {
//     document.write(
//       `${pokemonList[i].name} has a height of ${pokemonList[i].height} <br> `
//     );
//   }
// }
