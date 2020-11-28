'use strict';

// added IIFE- immediately invoked function expression
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  //////////////////////////////////////
  function getAll() {
    return pokemonList;
  }
  /////////////////////////////////////
  function add(poke) {
    // here we say typeof argument we pass into add function needs to be object for new pokemon
    if (typeof poke === 'object') {
      pokemonList.push(poke);
    } else {
      console.log('Invalid input');
    }
  }
  ////////////////////////////////////
  function hasProperties(pokemon) {
    return (
      pokemon.hasOwnProperty('name') &&
      pokemon.hasOwnProperty('height') &&
      pokemon.hasOwnProperty('type')
    );
  }
  ////////////////////////////////////
  function getPokemon(name) {
    return pokemonList.filter((pokemon) => pokemon.name === name);
  }
  ////////////////////////////////////
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
      showDetails(pokemon);
    });
  }
  ////////////////////////////////////
  function loadList() {
    showLoadingMessage();
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
        hideLoadingMessage();
      })
      .catch(function (e) {
        console.error(e);
        hideLoadingMessage();
      });
  }
  ////////////////////////////////////
  function loadDetails(item) {
    showLoadingMessage();
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        // add the details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
        hideLoadingMessage();
      })
      .catch(function (e) {
        console.error(e);
        hideLoadingMessage();
      });
  }
  ////////////////////////////////////
  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function () {
      console.log(item);
    });
  }
  ////////////////////////////////////
  function showLoadingMessage() {
    console.log('Loading');
  }
  ////////////////////////////////////
  function hideLoadingMessage() {
    console.log('⬇ Your pokemon is here ⬇');
  }

  return {
    getAll: getAll,
    add: add,
    hasProperties: hasProperties,
    getPokemon: getPokemon,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
  };
})();

pokemonRepository.loadList().then(function () {
  //  data is loaded!
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

// // Here is value saved to variable pokemons --> pokemonList array
// let pokemons = pokemonRepository.getAll();

// // loop using .forEach that uses addListItem() function
// pokemons.forEach(function (pokemon) {
//   pokemonRepository.addListItem(pokemon);
// });

// // adding one more pokemon to the list
// pokemonRepository.add({ name: 'Marowak', height: 4.5, type: ['ground'] });

// // calling pokemon with his name
// console.log(pokemonRepository.getPokemon('Venusaur'));
// console.log(pokemons);

//  Practice

// // function that shows pokemon info under names

// function showDetails(pokemon) {
//   if (pokemon.name === 'Venusaur') {
//     fillInfo.innerText = `${pokemon.name} > plants blooms when it is absorbing solar energy. It stays on the move to seek sunlight.
//     Has a height of ${pokemon.height}, and its type is ${pokemon.type} has Overgrow ability`;
//     fillInfo.style.color = 'white';
//   } else if (pokemon.name === 'Charmeleon') {
//     fillInfo.innerText = `${pokemon.name} > It has a barbaric nature. In battle, it whips its fiery tail around and slashes away with sharp claws.
//     Has a height of ${pokemon.height}, and its type is ${pokemon.type} has Burn ability`;
//     fillInfo.style.color = 'white';
//   } else if (pokemon.name === 'Pikachu') {
//     fillInfo.innerText = `${pokemon.name} > can generate powerful electricity, have cheek sacs that are extra soft and super stretchy.
//     Has a height of ${pokemon.height}, and its type is ${pokemon.type} has Static ability`;
//     fillInfo.style.color = 'white';
//   } else if (pokemon.name === 'Blastoise') {
//     fillInfo.innerText = `${pokemon.name} > It crushes its foe under its heavy body to cause fainting.
//     Has a height of ${pokemon.height}, and its type is ${pokemon.type} has Torrent ability`;
//     fillInfo.style.color = 'white';
//   } else {
//   }
// }

// shows pokemon information when clicked on name buttons
// function showPokeInfo() {
//   const pokeInfo = document.querySelector('.pokemon-info-clicked');
//   pokeInfo.style.display = 'block';
// }

// // closes pokemon information when escape is pressed
// document.addEventListener('keydown', function (e) {
//   if (e.key === 'Escape') {
//     fillInfo.style.display = 'none';
//   }
// });
