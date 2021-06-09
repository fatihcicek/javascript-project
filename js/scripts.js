let pokemonList=[
  {name: "Bulbasaur", height: 7, type: "grass"},
  {name: "Ivysaur", height: 10, type: "monster"},
  {name: "Pikachu", height: 4, type: "fairy"}
]

for (let i=0; i < pokemonList.length; i++) {
  //Writes Pokemon name to the DOM
  document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + ")");
  //Checks if pokemon height is greater than 8
  if (pokemonList[i].height > 8) {
    //if pokemon height is greater than 1.6 m, writes "Wow that's big!"
    document.write(" - Wow, that's big!" );
    }
    //Adds line breaks after each pokemon name
    document.write("<br><br>");
}
