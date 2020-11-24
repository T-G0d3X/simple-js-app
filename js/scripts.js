let pokemonList = [
  { name: 'Venusaur', height: 3, type: ['grass', 'poison'] },
  { name: 'Charmeleon', height: 5, type: ['fire'] },
  { name: 'Pikachu', height: 4, type: ['electric'] },
  { name: 'Blastoise', height: 9, type: ['water'] },
];

//  loop over pokemonList array, writing name and height
for (let i = 0; i < pokemonList.length; i++) {
  document.write(
    `${pokemonList[i].name} has a height of ${pokemonList[i].height} <br> `
  );

  if (pokemonList[i].height > 5) {
    document.write(` - Wow, that's big!`);
  }
}
