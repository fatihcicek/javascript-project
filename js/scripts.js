//wrapping pokemonList array in an IIFE
let pokemonRepository = (function() {
    let pokemonList = [];
  	let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

function add(pokemon) {
      if (
          typeof pokemon === "object" &&
          "name" in pokemon
          ){
          pokemonList.push(pokemon);
        } else{
          console.log('pokemon is not correct');
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

  function loadList() {
  	return fetch(apiUrl).then(function (response) {
  		return response.json();
  	}).then(function(json) {
  		json.results.forEach(function(item) {
  			let pokemon = {
  				name: item.name,
  				detailsUrl: item.url
  			};
  			add(pokemon);
  		});
  	}).catch(function (e) {
  		console.error(e);
  	})
  }


  function loadDetails(item) {
  	let url = item.detailsUrl;
  	return fetch(url).then(function (response){
  		return response.json();
  	}).then(function (details) {
  		// below code adds the details to the item
  		item.imageUrl = details.sprites.front_detault;
  		item.height = details.height;
  		item.types = details.types;
  	}).catch(function (e) {
  		console.error(e);
  	});
  }


  function showDetails(pokemon){
    loadDetails(pokemon).then(function () {
		console.log(pokemon);
	});
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
  };
})();


pokemonRepository.loadList().then(function() {
  	//^^ now the data is loaded
  	pokemonRepository.getAll().forEach(function(pokemon){
  		pokemonRepository.addListItem(pokemon);
  	});
  })
