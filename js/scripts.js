// added IIFE- immediately invoked function expression
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
    if (typeof poke === 'object' && hasProperties(poke)) {
      pokemonList.push(poke);
    } else {
      console.log('Invalid input');
    }
  }

  function hasProperties(pokemon) {
    return (
      pokemon.hasOwnProperty('name') &&
      pokemon.hasOwnProperty('height') &&
      pokemon.hasOwnProperty('type')
    );
  }

  function getPokemon(name) {
    return pokemonList.filter((pokemon) => pokemon.name === name);
  }

  function addListItem(pokemon) {
    // variables for slecection of elements
    let pokeList = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    // text inside button
    button.innerText = pokemon.name;
    // adding elements
    button.classList.add('btn');
    listItem.appendChild(button);
    pokeList.appendChild(listItem);
    // event on a click that shows pokemon name in console
    button.addEventListener('click', function () {
      // logs details in console
      showDetails(pokemon);
    });
  }
  // function that logs pokemon info
  function showDetails(pokemon) {
    console.log(pokemon.name);
  }

  return {
    getAll: getAll,
    add: add,
    hasProperties: hasProperties,
    getPokemon: getPokemon,
    addListItem: addListItem,
    showDetails: showDetails,
  };
})();

// Here is value saved to variable pokemons --> pokemonList array
let pokemons = pokemonRepository.getAll();

// loop using .forEach that uses addListItem() function
pokemons.forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});

// adding one more pokemon to the list
pokemonRepository.add({ name: 'Marowak', height: 4.5, type: ['ground'] });

// calling pokemon with his name
console.log(pokemonRepository.getPokemon('Venusaur'));
console.log(pokemons);
