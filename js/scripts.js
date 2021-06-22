//wrapping pokemonList array in an IIFE
let pokemonRepository = (function() {
  //creating the Pokemon database
  let pokemonList = [
    {name: "Bulbasaur", height: 7, types: ["grass"]},
    {name: "Ivysaur", height: 10, types: ["monster"]},
    {name: "Pikachu", height: 4, types: ["fairy"]}
  ];

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }
  return {
    add: add,
    getAll: getAll
  };
})();
  pokemonRepository.add({
    name: 'Balbasaur',
    height: 5.7,
    type: ['grass', 'poison']
  });
  console.log(pokemonRepository.getAll());


pokemonRepository.getAll().forEach(function(item) {
  if (item.height > 5) {
    document.write(item.name + " is " + item.height + " m high" + " - Wow, that's big!" + "<br>");
      } else {
        document.write(item.name + " is " + item.height + " m high!" + "<br>");
      }
  } )
