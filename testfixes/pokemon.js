const maxPkm = 333;
const listWrapper = document.querySelector('.list-wrapper');
const searchInput = document.getElementById('search-input');
const numberFilter = document.getElementById('number');
const nameFilter = document.getElementById('name');
const notFound = document.querySelector('.not-found');

let allPkm = [];

async function fetchPokemons() {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${maxPkm}`);
        const data = await response.json();
        allPkm = data.results;
        displayPkm(allPkm);
    } catch (error) {
        console.error("Failed to fetch Pokémon list:", error);
    }
}

fetchPokemons();

async function fetchPkmB4Redir(id) {
    try {
        await Promise.all([
            fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(res => res.json()),
            fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`).then(res => res.json()),
        ]);
        return true;
    } catch (error) {
        console.error("Failed to fetch Pokémon data:", error);
        return false;
    }
}

function displayPkm(pokemonList) {
    listWrapper.innerHTML = "";

    pokemonList.forEach(pokemon => {
        const pokemonID = pokemon.url.split('/')[6];
        const listItem = document.createElement('div');
        listItem.className = 'list-item';
        listItem.innerHTML = `
            <div class="number-wrap">
                <p class="fonts-caption">#${pokemonID}</p>
            </div>
            <div class="img-wrap">
                <img src="https://raw.githubusercontent.com/pokeapi/sprites/master/sprites/pokemon/other/dream-world/${pokemonID}.svg" alt="${pokemon.name}" />
            </div>
            <div class="name-wrap">
                <p class="fonts-body3">${pokemon.name}</p>
            </div>
        `;

        listItem.addEventListener("click", async () => {
            const success = await fetchPkmB4Redir(pokemonID);
            if (success) {
                window.location.href = `./details.html?id=${pokemonID}`;
            }
        });

        listWrapper.appendChild(listItem);
    });
}

searchInput.addEventListener('keyup', handleSearch);

function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase();
    let filteredPkm = allPkm;

    if (numberFilter.checked) {
        filteredPkm = allPkm.filter(pokemon => {
            const pokemonID = pokemon.url.split('/')[6];
            return pokemonID.startsWith(searchTerm);
        });
    } else if (nameFilter.checked) {
        filteredPkm = allPkm.filter(pokemon => pokemon.name.toLowerCase().startsWith(searchTerm));
    }

    displayPkm(filteredPkm);
    notFound.style.display = filteredPkm.length === 0 ? 'block' : 'none';
}

document.getElementById('close-search-icon').addEventListener('click', clearSearch);

function clearSearch() {
    searchInput.value = '';
    displayPkm(allPkm);
    notFound.style.display = 'none';
}
