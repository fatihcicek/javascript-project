//wrapping pokemonList array in an IIFE
let pokemonRepository = (function() {
    let pokemonList = [];
  	let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    	// Returns a pokemonList
    	function getAll(){
    		return pokemonList;
    	}

    	// Adds new objects to the list from the outside
function add(pokemon) {
      if (
          typeof pokemon === 'object' &&
          'name' in pokemon &&
			    'detailsUrl' in pokemon
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
    let pokemonList = document.querySelector('.list-group'); // variable assigned to <ul> in index.html
    let listpokemon = document.createElement('li');
    listpokemon.classList.add('list-group-item'); // adds a class to each list item
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    // adds bootstrap class
   	  button.classList.add('btn');
   	  button.classList.add('btn-primary');
   	  button.classList.add('btn-lg');
   	  button.setAttribute('data-target', '#exampleModal');
   	  button.setAttribute('data-toggle', 'modal');
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
    button.addEventListener('click', function (event) {
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
  				detailsUrl: item.url,
  			};
  			add(pokemon);
  		});
  	}).catch(function (e) {
  		console.error(e);
  	});
  }


  function loadDetails(item) {
  	let url = item.detailsUrl;
  	return fetch(url).then(function (response){
  		return response.json();
  	}).then(function (details) {
  		// below code adds the details to the item
  		item.imageUrl = details.sprites.front_default;
  		item.height = details.height;
      // calls the types array
			item.types = [];
			for ( let i = 0; i < details.types.length; i++) {
				item.types.push(details.types[i].type.name);
			}
  	}).catch(function (e) {
  		console.error(e);
  	});
  }
  // Searchbar:

	function search() {
		let searchInput = document.querySelector('#search-bar');

    		searchInput.addEventListener('input', function() {

    			let displayedList = document.querySelector('.list-group');
    			displayedList.innerHTML = '';
    			let searchText = searchInput.value.trim();

    			pokemonList.forEach(function(pokemon) {
    				if (pokemon.name.includes(searchText.toLowerCase())) {
    					addListItem(pokemon)
    				}
    			});
  		});
  }
  // displays modal
  	function showModal(pokemon) {

          let modalBody = $('.modal-body');
      		let modalTitle = $('.modal-title');
      		let modalHeader = $('.modal-header');

  		// Clears existing modal content
      modalTitle.empty();
		modalBody.empty();

		// // creates title <h1> element
		let nameElement = $('<h1>' + pokemon.name + '</h1>');

    let imageElement = $('<img class="modal-img" style="width:50%">');
    imageElement.attr('src', pokemon.imageUrl);

		let typeElement = $('<p>' + pokemon.types + '</p>');
		let heightElement = $('<p>' + pokemon.height + '</p>');

		modalTitle.append(nameElement);
    modalBody.append(imageElement);
		modalBody.append(typeElement);
		modalBody.append(heightElement);


    // // Add the new modal Content
		// let closeButtonElement = document.createElement('button');
		// closeButtonElement.classList.add('modal-close');
		// closeButtonElement.innerText = 'Close';
		// closeButtonElement.addEventListener('click', hideModal);

    // // creates img element
    // let imageElement = document.createElement('img');
    // // imageElement.innerHTML = pokemon.imageUrl;
    // imageElement.src = pokemon.imageUrl;

    // // creates <p> element for type
    // let typeElement = document.createElement('p');
    // typeElement.innerText = pokemon.types;

    // // creates <p> element for height
		// let heightElement = document.createElement('p');
		// heightElement.innerText = pokemon.height;

    // modal.appendChild(closeButtonElement);
		// modal.appendChild(nameElement);
		// modal.appendChild(imageElement);
		// modal.appendChild(typeElement);
		// modal.appendChild(heightElement);
		// modalContainer.appendChild(modal);

  	// modalContainer.classList.add('is-visible');
  	}



  function showDetails(pokemon){
    pokemonRepository.loadDetails(pokemon).then(function () {
    			showModal(pokemon);
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
    search: search
  };
})();


pokemonRepository.loadList().then(function() {
  	//^^ now the data is loaded
  	pokemonRepository.getAll().forEach(function(pokemon){
  		pokemonRepository.addListItem(pokemon);
  	});
  });

pokemonRepository.search();
