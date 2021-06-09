let pokemonList=[
  {name: "Bulbasaur", height: 7, type: "grass"},
  {name: "Ivysaur", height: 10, type: "monster"},
  {name: "Pikachu", height: 4, type: "fairy"}
]

for (let i=0; i < pokemonList.length; i++) {
  document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + ")");
  if (pokemonList[i].height > 8) {
    console.log(pokemonList[i].name + " (height: " + pokemonList[i].height + ") - Wow, that's big!" );
  }else {
    console.log(pokemonList[i].name + " (height: " + pokemonList[i].height + ")")
  }
}
