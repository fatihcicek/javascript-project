//wrapping pokemonList array in an IIFE
let pokemonRepository = (function() {
    let pokemonList = [];
  	let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    let modalContainer = document.querySelector('#modal-container');

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

  // displays modal
  	function showModal(pokemon) {

  		// Clears existing modal content
  		modalContainer.innerHTML = '';

  		let modal = document.createElement('div');
  		modal.classList.add('modal');

  		// Add the new modal Content
  		let closeButtonElement = document.createElement('button');
  		closeButtonElement.classList.add('modal-close');
  		closeButtonElement.innerText = 'Close';
  		closeButtonElement.addEventListener('click', hideModal);

  		// creates title <h1> element
  		let titleElement = document.createElement('h1');
  		titleElement.innerText = 'loadDetails';

  		// creates <p> element
  		let contentElement = document.createElement('p');
  		contentElement.innerText = 'text';


  		modal.appendChild(closeButtonElement);
  		modal.appendChild(titleElement);
  		modal.appendChild(contentElement);
  		modalContainer.appendChild(modal);

  		modalContainer.classList.add('is-visible');
  	}

  	// Hides Modal
  	function hideModal() {
  		modalContainer.classList.remove('is-visible');
  	}


  function showDetails(pokemon){
    pokemonRepository.loadDetails(pokemon).then(function () {
    			showModal(pokemon);
          console.log(pokemon);
	});
  }

  // close modal by clicking outside of window

  modalContainer.addEventListener('click', (e) => {
  			let target = e.target;
  			if (target === modalContainer) {
  			hideModal();
  			}
  		});

  		// escape-key exit
  		window.addEventListener('keydown', (e) => {
  			if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
  				hideModal();
  			}
  			});

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    showModal: showModal,
		hideModal: hideModal
  };
})();


pokemonRepository.loadList().then(function() {
  	//^^ now the data is loaded
  	pokemonRepository.getAll().forEach(function(pokemon){
  		pokemonRepository.addListItem(pokemon);
  	});
  })
