'use strict';
let pokemonRepository = (function () {
  let e = [],
    t = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  function n(t) {
    'object' == typeof t ? e.push(t) : console.log('Invalid input');
  }
  function o(e) {
    let t = e.detailsUrl;
    return fetch(t)
      .then(function (e) {
        return e.json();
      })
      .then(function (t) {
        function n() {
          const e = Object.entries(t.abilities[0]);
          for (const [t, { name: o }] of e)
            return (n = `Mighty ability is >>${o}<<`);
        }
        (e.imageUrl = t.sprites.front_default),
          (e.height = t.height),
          (e.nameAbility = n());
      })
      .catch(function (e) {
        console.error(e);
      });
  }
  function i(e) {
    o(e).then(function () {
      !(function (e) {
        let t = $('.modal-body'),
          n = $('.modal-title');
        n.empty(), t.empty();
        let o = $('<h1>' + e.name + '</h1>'),
          i = $('<p>Has Height of: ' + e.height + '</p>'),
          r = $('<p>' + e.nameAbility + '</p>'),
          a = $('<img class="modal-img" style="width:50%">');
        a.attr('src', e.imageUrl),
          n.append(o),
          t.append(i),
          t.append(r),
          t.append(a);
      })(e);
    });
  }
  return {
    getAll: function () {
      return e;
    },
    add: n,
    addListItem: function (e) {
      let t = $('.pokemon-list'),
        n = $('<li></li>'),
        o = $('<button>' + e.name + '</button>');
      o.addClass('btn-primary'),
        o.attr('data-toggle', 'modal'),
        o.attr('data-target', '#poke-container'),
        n.append(o),
        t.append(n),
        o.on('click', function (t) {
          i(e);
        });
    },
    loadList: function () {
      return fetch(t)
        .then(function (e) {
          return e.json();
        })
        .then(function (e) {
          e.results.forEach(function (e) {
            n({ name: e.name, detailsUrl: e.url });
          });
        })
        .catch(function (e) {
          console.error(e);
        });
    },
    loadDetails: o,
    showDetails: i,
  };
})();
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (e) {
    pokemonRepository.addListItem(e);
  });
}),
  (function () {
    let e = document.querySelector('#register-form'),
      t = document.querySelector('#email'),
      n = document.querySelector('#password');
    function o() {
      let e = t.value;
      return e
        ? -1 === e.indexOf('@')
          ? (r(t, 'You must enter a valid e-mail address'), !1)
          : (r(t, null), !0)
        : (r(t, 'Email is required field'), !1);
    }
    function i() {
      let e = n.value;
      return e
        ? e.length < 8
          ? (r(n, 'The password needs to be at least 8 characters long'), !1)
          : (r(n, null), !0)
        : (r(n, 'Password is a required field!'), !1);
    }
    function r(e, t) {
      let n = e.parentElement,
        o = n.querySelector('.error-message');
      if ((o && n.removeChild(o), t)) {
        let e = document.createElement('div');
        e.classList.add('error-message'), (e.innerText = t), n.appendChild(e);
      }
    }
    e.addEventListener('submit', (e) => {
      e.preventDefault(),
        (function () {
          let e = o(),
            t = i();
          return e && t;
        })() && alert('Success!');
    }),
      t.addEventListener('input', o),
      n.addEventListener('input', i);
  })();
