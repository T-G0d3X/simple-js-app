'use strict';

// added IIFE- immediately invoked function expression
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function getAll() {
    return pokemonList;
  }

  function add(poke) {
    if (typeof poke === 'object') {
      pokemonList.push(poke);
    } else {
      console.log('Invalid input');
    }
  }

  function addListItem(pokemon) {
    let pokeList = $('.pokemon-list');
    let listItem = $('<li></li>');
    let button = $('<button>' + pokemon.name + '</button>');

    button.addClass('btn-primary');
    button.attr('data-toggle', 'modal');
    button.attr('data-target', '#poke-container');
    listItem.append(button);
    pokeList.append(listItem);

    button.on('click', function (event) {
      showDetails(pokemon);
    });
  }

  function loadList() {
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
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function loadDetails(item) {
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
            abilityName = `Mighty ability is >>${name}<<`;
            return abilityName;
          }
        }
        item.nameAbility = abilityName();
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }

  //////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////
  function showModal(pokemon) {
    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-title');

    modalTitle.empty();
    modalBody.empty();

    let nameElement = $('<h1>' + pokemon.name + '</h1>');
    let heightElement = $('<p>' + 'Has Height of: ' + pokemon.height + '</p>');
    let abilityElement = $('<p>' + pokemon.nameAbility + '</p>');

    let imageElement = $('<img class="modal-img" style="width:50%">');
    imageElement.attr('src', pokemon.imageUrl);

    modalTitle.append(nameElement);
    modalBody.append(heightElement);
    modalBody.append(abilityElement);
    modalBody.append(imageElement);
  }

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
  };
})();

pokemonRepository.loadList().then(function () {
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
