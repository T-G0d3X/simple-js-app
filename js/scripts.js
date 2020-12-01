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
        // function to loop over object and get ability name
        function abilityName() {
          const abilityVar = Object.entries(details.abilities[0]);
          for (const [key, { name }] of abilityVar) {
            abilityName = `mighty ability is >>${name}<<`;
            return abilityName;
          }
        }
        item.nameAbility = abilityName();
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
      showModal(
        item.name,
        `has height of: ${item.height} and ${item.nameAbility}`,
        item.imageUrl
      );
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

  //////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////
  function showModal(title, text, img) {
    let modalContainer = document.querySelector('#modal-container');

    // Clears all existing modal content
    modalContainer.innerHTML = '';

    let modal = document.createElement('div');
    modal.classList.add('modal');

    //Add the new modal content
    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'x';
    // to close modal with button
    closeButtonElement.addEventListener('click', hideModal);

    let titleElement = document.createElement('h1');
    titleElement.innerText = title;

    let contentElement = document.createElement('p');
    contentElement.innerText = text;

    // setting image in modal
    let container = document.querySelector('#image-container');
    let myImage = document.createElement('img');
    myImage.src = img;

    modal.appendChild(myImage);
    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modalContainer.appendChild(modal);

    modalContainer.classList.add('is-visible');
  }
  document.querySelector('#show-modal').addEventListener('click', () => {
    showModal(
      'Pokeballs! Round n shiny',
      'When the ball hits a Pokémon, they are converted into a form of energy, and are sent flying inside of it. Throw it and catch some pokemons!'
    );
  });

  document.querySelector('#show-dialog').addEventListener('click', () => {
    showDialog('Confirm action', 'Are you sure you want to do this?').then(
      function () {
        alert('confirmed!');
      },
      () => {
        alert('not confirmed');
      }
    );
  });

  let dialogPromiseReject;
  // function that we use to close modal on close button
  function hideModal() {
    let modalContainer = document.querySelector('#modal-container');
    modalContainer.classList.remove('is-visible');

    if (dialogPromiseReject) {
      dialogPromiseReject();
      dialogPromiseReject = null;
    }
  }

  window.addEventListener('keydown', (e) => {
    let modalContainer = document.querySelector('#modal-container');
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
    modalContainer.addEventListener('click', (e) => {
      let target = e.target;
      if (target === modalContainer) {
        hideModal();
      }
    });
  });
  /////////////////////////////////////////
  /////////////////////////////////////////
  function showDialog(title, text) {
    showModal(title, text);

    // defined modalContainer
    let modalContainer = document.querySelector('#modal-container');

    // adding confirm and cancel button to the modal
    let modal = modalContainer.querySelector('.modal');

    let confirmButton = document.createElement('button');
    confirmButton.classList.add('modal-confirm');
    confirmButton.innerText = 'Confirm';

    let cancelButton = document.createElement('button');
    cancelButton.classList.add('modal-cancel');
    cancelButton.innerText = 'Cancel';

    modal.appendChild(confirmButton);
    modal.appendChild(cancelButton);

    // focus confirmButton so user can press enter
    confirmButton.focus();

    return new Promise((resolve, reject) => {
      cancelButton.addEventListener('click', hideModal);
      confirmButton.addEventListener('click', () => {
        dialogPromiseReject = null;
        hideModal();
        resolve();
      });

      dialogPromiseReject = reject;
    });
  }

  ////////////////////////////////////
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

(function () {
  // form validation function
  let form = document.querySelector('#register-form');
  let emailInput = document.querySelector('#email');
  let passwordInput = document.querySelector('#password');

  function validateEmail() {
    let value = emailInput.value;

    if (!value) {
      showErrorMessage(emailInput, 'Email is required field');
      return false;
    }

    if (value.indexOf('@') === -1) {
      showErrorMessage(emailInput, 'You must enter a valid e-mail address');
      return false;
    }

    showErrorMessage(emailInput, null);
    return true;
  }

  function validatePassword() {
    let value = passwordInput.value;

    if (!value) {
      showErrorMessage(passwordInput, 'Password is a required field!');
      return false;
    }
    if (value.length < 8) {
      showErrorMessage(
        passwordInput,
        'The password needs to be at least 8 characters long'
      );
      return false;
    }
    showErrorMessage(passwordInput, null);
    return true;
  }

  function validateForm() {
    let isValidEmail = validateEmail();
    let isValidPassword = validatePassword();
    return isValidEmail && isValidPassword;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert('Success!');
    }
  });

  emailInput.addEventListener('input', validateEmail);
  passwordInput.addEventListener('input', validatePassword);

  function showErrorMessage(input, message) {
    let container = input.parentElement;
    let error = container.querySelector('.error-message');
    if (error) {
      container.removeChild(error);
    }

    if (message) {
      let error = document.createElement('div');
      error.classList.add('error-message');
      error.innerText = message;
      container.appendChild(error);
    }
  }
})();

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
