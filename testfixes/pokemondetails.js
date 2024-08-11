// let currentPkmID = null;

// document.addEventListener('DOMContentLoaded', () => {
//     const maxPkm = 333;
//     const pokemonID = new URLSearchParams(window.location.search).get('id');
//     const id = parseInt(pokemonID, 10);

//     if (id < 1 || id > maxPkm) {
//         window.location.href = './index.html';
//         return;
//     }

//     currentPkmID = id;
//     loadPokemon(id);
// });

// async function loadPokemon(id) {
//     try {
//         const [pokemon, species] = await Promise.all([
//             fetch('https://pokeapi.co/api/v2/pokemon/${id}').then((res) => res.json()),
//             fetch('https://pokeapi.co/api/v2/pokemon-species/${id}').then((res) => res.json()),
//         ]);

//         if (currentPkmID !== id) return;

//         displayPkmDetail(pokemon);
//         const flavorText = getEnglishFlavorText(species);
//         document.querySelector('.pokemon-description').textContent = flavorText;

//         setupNavigation(id);

//         window.history.pushState({}, "", './details.html?id=${id}');
//     } catch (error) {
//         console.error("Failed to fetch Pokémon data:", error);
//         // Consider showing a user-friendly message here
//     }
// }

// function setupNavigation(id) {
//     const maxPkm = 333;
//     const [leftArrow, rightArrow] = ["#leftArrow", "#rightArrow"].map((sel) => document.querySelector(sel));

//     leftArrow.removeEventListener('click', navigatePokemon);
//     rightArrow.removeEventListener('click', navigatePokemon);

//     if (id > 1) {
//         leftArrow.addEventListener('click', () => navigatePokemon(id - 1));
//     }
//     if (id < maxPkm) {
//         rightArrow.addEventListener('click', () => navigatePokemon(id + 1));
//     }
// }

// async function navigatePokemon(id) {
//     currentPkmID = id;
//     await loadPokemon(id);
// }
// // gpt fix

// const typeColors = {
//     normal: "#A8A878",
//     fire: "#F08030",
//     water: "#6890F0",
//     electric: "#F8D030",
//     grass: "#78C850",
//     ice: "#98D8D8",
//     fighting: "#C03028",
//     poison: "#A040A0",
//     ground: "#E0C068",
//     flying: "#A890F0",
//     psychic: "#F85888",
//     bug: "#A8B820",
//     rock: "#B8A038",
//     ghost: "#705898",
//     dragon: "#7038F8",
//     dark: "#705848",
//     steel: "#B8B8D0",
//     fairy: "#EE99AC",
// };

// function rgbaFromHex(hexColor) {
//     return [
//         parseInt(hexColor.slice(1, 3), 16),
//         parseInt(hexColor.slice(3, 5), 16),
//         parseInt(hexColor.slice(5, 7), 16),
//     ].join(",");
// }

// function setTypeBG(pokemon) {
//     const mainType = pokemon.types[0].type.name;
//     const color = typeColors[mainType];

//     if (!color) {
//         console.warn('Color type not defined for ${mainType}');
//         return;
//     }

//     const gradient = 'linear-gradient(180deg, rgba(${rgbaFromHex(color)},0.8) 0%, rgba(${rgbaFromHex(color)},0.5) 100%)';
//     document.querySelector('.feat-img').style.background = gradient;

//     // Set the background color for elements with class 'type'
//     const typeElements = document.querySelectorAll('.type');
//     typeElements.forEach(element => {
//         element.style.backgroundColor = color;
//     });
// }


// // My code
// // const typeColors = {
// //     normal: "#A8A878",
// //     fire: "#F08030",
// //     water: "#6890F0",
// //     electric: "#F8D030",
// //     grass: "#78C850",
// //     ice: "#98D8D8",
// //     fighting: "#C03028",
// //     poison: "#A040A0",
// //     ground: "#E0C068",
// //     flying: "#A890F0",
// //     psychic: "#F85888",
// //     bug: "#A8B820",
// //     rock: "#B8A038",
// //     ghost: "#705898",
// //     dragon: "#7038F8",
// //     dark: "#705848",
// //     steel: "#B8B8D0",
// //     fairy: "#EE99AC",
// // };

// // function setElementStyles(elements, cssProperty, value) {
// //     elements.forEach((element) => {
// //         element.style[cssProperty] = value;
// //     });
// // }

// // function rgbaFromHex(hexColor) {
// //     return [
// //         parseInt(hexColor.slice(1, 3), 16),
// //         parseInt(hexColor.slice(3, 5), 16),
// //         parseInt(hexColor.slice(5, 7), 16),
// //     ].join(",");
// // }

// // function setTypeBG(pokemon) {
// //     const mainType = pokemon.types[0].type.name;
// //     const color = typeColors[mainType];

// //     if (!color) {
// //         console.warn('Color type not defined for ${mainType}');
// //         return;
// //     }

// //     const gradient = 'linear-gradient(180deg, rgba(${rgbaFromHex(color)},0.8) 0%, rgba(${rgbaFromHex(color)},0.5) 100%)';
// //     document.querySelector('.feat-img').style.background = gradient;

// //     setElementStyles(document.querySelectorAll('.type'), 'backgroundColor', color);
// // }

// function getEnglishFlavorText(species) {
//     const entry = species.flavor_text_entries.find((entry) => entry.language.name === "en");
//     return entry ? entry.flavor_text.replace(/[\n\f]/g, " ") : "No description available.";
// }

// function displayPkmDetail(pokemon) {
//     document.querySelector('.h1.name').textContent = pokemon.name;
//     document.querySelector('.pokemon-id-wrap .fonts-body2').textContent = '#${pokemon.id}';
//     document.querySelector('.detail-img-wrapper img').src = pokemon.sprites.other['official-artwork'].front_default;

//     document.querySelector('.weight').textContent = '${pokemon.weight / 10} kg';
//     document.querySelector('.height').textContent = '${pokemon.height / 10} m';

//     const moveList = pokemon.moves.map((move) => move.move.name);
//     document.querySelector('.pokemon-detail-move').textContent = moveList.join(", ");

//     setTypeBG(pokemon);

//     // Populate base stats
//     const stats = pokemon.stats;
//     stats.forEach(stat => {
//         const statName = stat.stat.name.toUpperCase();
//         const statWrapper = document.querySelector('.wrap-stats[data-stat="${statName}"]');
//         statWrapper.querySelector('p.fonts-body3:last-child').textContent = stat.base_stat;
//         statWrapper.querySelector('progress').value = stat.base_stat;
//     });
// }


let currentPkmID = null;

document.addEventListener('DOMContentLoaded', () => {
  const maxPkm = 333;
  const pokemonID = new URLSearchParams(window.location.search).get('id');
  const id = parseInt(pokemonID, 10);

  if (id < 1 || id > maxPkm) {
    return (window.location.href = './index.html');
  }

  currentPkmID = id;
  loadPokemon(id);
});

async function loadPokemon(id) {
  try {
    const [pokemon, species] = await Promise.all([
      fetch('https://pokeapi.co/api/v2/pokemon/${id}').then((res) => res.json()),
      fetch('https://pokeapi.co/api/v2/pokemon-species/${id}').then((res) => res.json()),
    ]);

    const abilitiesWrapper = document.querySelector('.wrap-pokemon-detail .pokemon-detail.move');
    abilitiesWrapper.innerHTML = '';

    if (currentPkmID === id) {
      displayPkmDetail(pokemon);
      const flavorText = getEnglishFlavorText(species);
      document.querySelector('.fonts-body3 .pokemon-description').textContent = flavorText.replace(/'/g, "\\'");

      const [leftArrow, rightArrow] = ['#leftArrow', '#rightArrow'].map((sel) => document.querySelector(sel));
      leftArrow.removeEventListener('click', navigatePokemon);
      rightArrow.removeEventListener('click', navigatePokemon);

      if (id !== 1) {
        leftArrow.addEventListener('click', () => {
          navigatePokemon(id - 1);
        });
      }
      if (id !== maxPkm) {
        rightArrow.addEventListener('click', () => {
          navigatePokemon(id + 1);
        });
      }

      window.history.pushState({}, '', './details.html?id=${id}');
    }

    return true;
  } catch (error) {
    console.error('Failed to fetch Pokemon data', error);
    return false;
  }
}

async function navigatePokemon(id) {
  currentPkmID = id;
  await loadPokemon(id);
}

const typeColors = {
  normal: '#A8A878',
  fire: '#F08030',
  water: '#6890F0',
  electric: '#F8D030',
  grass: '#78C850',
  ice: '#98D8D8',
  fighting: '#C03028',
  poison: '#A040A0',
  ground: '#E0C068',
  flying: '#A890F0',
  psychic: '#F85888',
  bug: '#A8B820',
  rock: '#B8A038',
  ghost: '#705898',
  dragon: '#7038F8',
  dark: '#705848',
  steel: '#B8B8D0',
  fairy: '#EE99AC',
};

function setElementStyles(elements, cssProperty, value) {
  elements.forEach((element) => {
    element.style[cssProperty] = value;
  });
}

function rgbaFromHex(hexColor) {
  return [
    parseInt(hexColor.slice(1, 3), 16),
    parseInt(hexColor.slice(3, 5), 16),
    parseInt(hexColor.slice(5, 7), 16),
  ].join(',');
}

function setTypeBG(pokemon) {
  const mainType = pokemon.types[0].type.name;
  const color = typeColors[mainType];

  if (!color) {
    console.warn('Color type not defined for ${mainType}');
    return;
  }

  const detailMainElement = document.querySelector('.detail-main');
  setElementStyles([detailMainElement], 'backgroundColor', color);
  setElementStyles([detailMainElement], 'borderColor', color);

  setElementStyles(document.querySelectorAll('.power-wrapper > p'), 'backgroundColor', color);
  setElementStyles(document.querySelectorAll('.stats-wrapper > p.stats'), 'color', color);
  setElementStyles(document.querySelectorAll('.stats-wrapper .progress-bar'), 'backgroundColor', color);

  const rgbaColor = rgbaFromHex(color);
  const styleTag = document.createElement('style');
  styleTag.innerHTML = `
    .stats-wrapper .progress-bar::-webkit-progress-bar {
      background-color: rgba(${rgbaColor}, 0.5);
    }
    .stats-wrapper .progress-bar::-webkit-progress-value {
      background-color: ${color};
    }
  `;
  document.head.appendChild(styleTag);
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function createAndAppendElement(parent, tag, options = {}) {
  const element = document.createElement(tag);
  Object.keys(options).forEach((key) => {
    element[key] = options[key];
  });
  parent.appendChild(element);
  return element;
}

function displayPkmDetail(pokemon) {
  const { name, id, height, weight, abilities, stats, types } = pokemon;
  const capitalizePokemonName = capitalizeFirstLetter(name);

  document.querySelector('.title').textContent = capitalizePokemonName;

  const detailMainElement = document.querySelector('.detail-main');
  detailMainElement.classList.add(name.toLowerCase());

  document.querySelector('.name-wrap .name').textContent = capitalizePokemonName;
  document.querySelector('.pokemon-id-wrap .fonts-body2').textContent = `#${String(id).padStart(3, \'0\')}`;

  const imageElement = document.querySelector('.detail-img-wrapper img');
  imageElement.src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg";
  imageElement.alt = name;

  const typeWrapper = document.querySelector('.power-wrapper');
  typeWrapper.innerHTML = '';
  types.forEach(({ type }) => {
    createAndAppendElement(typeWrapper, 'p', {
      className: 'fonts-body3 ${type.name}',
      textContent: type.name,
    });
  });

  document.querySelector('.wrap-pokemon-detail .pokemon-detail p .weight').textContent = '${weight / 10} kg';
  document.querySelector('.wrap-pokemon-detail .pokemon-detail p .height').textContent = '${height / 10} m';

  const abilitiesWrapper = document.querySelector('.wrap-pokemon-detail .pokemon-detail .move');
  abilitiesWrapper.innerHTML = '';
  abilities.forEach(({ ability }) => {
    createAndAppendElement(abilitiesWrapper, 'p', {
      className: 'fonts-body3',
      textContent: ability.name,
    });
  });

  const statsWrapper = document.querySelector('.stats-wrapper');
  statsWrapper.innerHTML = '';
  const statNameMapping = {
    hp: 'HP',
    attack: 'ATK',
    defense: 'DEF',
    speed: 'SPD',
    'special-attack': 'Sp. ATK',
    'special-defense': 'Sp. DEF',
  };

  stats.forEach(({ stat, base_stat }) => {
    const statDiv = document.createElement('div');
    statDiv.className = 'stats-wrapper';
    statsWrapper.appendChild(statDiv);

    createAndAppendElement(statDiv, 'p', {
      className: 'fonts-body3 stats',
      textContent: statNameMapping[stat.name],
    });

    createAndAppendElement(statDiv, 'p', {
      className: 'fonts-body3',
      textContent: String(base_stat).padStart(3, '0'),
    });

    createAndAppendElement(statDiv, 'progress', {
      className: 'progress-bar',
      value: base_stat,
      max: 100,
    });
  });

  setTypeBG(pokemon);
}

function getEnglishFlavorText(pokemonSpecies) {
  for (let entry of pokemonSpecies.flavor_text_entries) {
    if (entry.language.name === 'en') {
      let flavor = entry.flavor_text.replace(/\f/g, '');
      return flavor;
    }
  }
  return '';
}
