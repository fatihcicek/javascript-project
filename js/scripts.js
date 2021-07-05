//wrapping pokemonList array in an IIFE
let pokemonRepository = (function() {
  //creating the Pokemon database
  let pokemonList = [
    {name: "Bulbasaur", height: 7, types: ["grass"]},
    {name: "Ivysaur", height: 10, types: ["monster"]},
    {name: "Pikachu", height: 4, types: ["fairy"]}
  ];

  function add(pokemon) {
  if (
    typeof pokemon === "object" &&
    "name" in pokemon &&
    "height" in pokemon &&
    "types" in pokemon
  ) {
    pokemonList.push(pokemon);
  } else {
    console.log("pokemon is not correct");
  }
}

  function getAll() {
    return pokemonList;
  }
  function addListItem(pokemon) {
    let fullList = document.querySelector(".pokemon-list");
    let listpokemon = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button-class");
    listpokemon.appendChild(button);
    fullList.appendChild(listpokemon);
    button.addEventListener("click", function (event) {
        showDetails(pokemon);
    });
  }

  function showDetails(pokemon){
    console.log(pokemon.name);
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
  };
})();

  pokemonRepository.add({
    name: "Balbasaur",
    height: 5.7,
    type: ["grass", "poison"]
  });
  console.log(pokemonRepository.getAll());


pokemonRepository.getAll().forEach(function(item) {
  pokemonRepository.addListItem(item);

  });
