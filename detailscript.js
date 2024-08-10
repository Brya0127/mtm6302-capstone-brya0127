let currentPkmID = null

document.addEventListener('DOMContentLoaded',  () => {
  const maxPkm = 333
  const pokemonID = new URLSearchParams(window.location.search).get('id')
  const id = parseInt(pokemonID, 10);

  if (id < 1 || id > maxPkm) {
    return(window.location.href = './index.html')
  // Remove the closing curly brace

  currentPkmID = id
  loadPokemon(id)
}

async function loadPokemon(id) {
   try {
    const [pokemon, species] = await Promise.all([fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) => 
      res.json()
    ),
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`).then((res) => 
      res.json()
    ),
  ]);

  const abilitiesWrapper = document.querySelector('.wrap-pokemon-detail .pokemon-detail-move')
  abilitiesWrapper.innerHTML = "";
// namme () here ?
  if (currentPkmID === id) {
    displayPkmDetail(pokemon) 
      const flavorText = getEnglishFlavorText(pokemonSpecies)
      document.querySelector('fonts-body3 pokemon-description').textContent = flavorText;

      const [leftArrow, rightArrow] = ["#leftArrow, #rightArrow"].map((sel) => document.querySelector(sel)
    );
    leftArrow.removeEventListener('click', navigatePokemon)
    rightArrow.removeEventListener('click', navigatePokemon)

    if (id !== 1) {
      leftArrow.addEventListener('click', () => {navigatePokemon(id - 1)

      });
    } 
    if (id !== 1) {
      righttArrow.addEventListener('click', () => {navigatePokemon(id + 1)

      }); 
    }
    // stops page reload.
    window.history.pushState({}, "", `./details.html?id=${id}`)
  }

   return true
  } catch (error) {
     console.error("Failed to fetch Pokemon data", error)
     return false
   }
}

async function navigatePokemon(id) {
  currentPkmID = id
  await loadPokemon(id)
}

const typeColors = {
  normal: "#A8A878",
  fire: "#F08030",
  water: "#6890F0",
  electric: "#F8D030",
  grass: "#78C850",
  ice: "#98D8D8",
  fighting: "#C03028",
  poison: "#A040A0",
  ground: "#E0C068",
  flying: "#A890F0",
  psychic: "#F85888",
  bug: "#A8B820",
  rock: "#B8A038",
  ghost: "#705898",
  dragon: "#7038F8",
  dark: "#705848",
  steel: "#B8B8D0",
  fairy: "#EE99AC",
}

function setElementStyles(elements, cssProperty, value) {
  elements.forEach((element) => {
    element.stlyle[cssProperty] = value
  });
}

function rgbaFromHex(hexColor) {
  return [
    parseInt(hexColor.slice(1, 3), 16), 
    parseInt(hexColor.slice(3, 5), 16), 
    parseInt(hexColor.slice(5, 7), 16),
  ].join(",");
}

function setTypeBG(pokemon) {
  const mainType = pokemon.types[0].type.name
  const color = typeColors[mainType]

  if (!color) {
    console.warn(`Color type not defined for ${mainType}`)
    return;
  }

  const detailMainElement = document.querySelector('.detail-main')
  setElementStyles([detailMainElement], 'backgroundColor', color)
  setElementStyles([detailMainElement], 'borderColor', color)
  // `rgba(${rgbaFromHex(color)}, 0.2)`) 

  setElementStyles(document.querySelectorAll('.power-wrapper > p '), 'backgroundColor', color)

  setElementStyles(document.querySelectorAll('.stats-wrap > p.stats '), 'color', color)

  setElementStyles(document.querySelectorAll('.stats-wrap .progress-bar '), 'color', color)
  
  const rgbaColor = rgbaFromHex(color)
  const styleTag = document.createElement('style')
  styleTag.innerHTML = `
  .stats-wrap .progress-bar :: -webkit-progress-bar {
    background-color: rgba(${rgbaColor}, 0.5);
  }
  .stats-wrap .progress-bar :: -webkit-progress-value {
    background-color: (${color});
  }
  `;
  document.head.appendChild(styleTag)
  
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function createAndAppendElement(parent, tag, options = {}) {
  const element = document.createElement(tag)
  Object.keys(options).forEach((key) => {
    element[key] = options[key]
  }) 
  parent.appendChild(element)
  return element
}

function displayPkmDetail(pokemon) {
  const { name, id, height, weight, abilities, stats, types } = pokemon
  const capitalizePokemonName = capitalizeFirstLetter(name)

  document.querySelector("title").textContent = capitalizePokemonName;
}

const detailMainElement = document.querySelector('.detail-main')
detailMainElement.classList.add(name.toLowerCase())

document.querySelector('.name-wrap .name').textContent = capitalizePokemonName

document.querySelector('.pokemon-id-wrap .fonts-body2').textContent = `#${String(id).padStart(3, '0')}`

const imgElement = document.querySelector('detail-img-weapper img')
imageElement.src = `https://raw.githubusercontent.com/pokeapi/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`
imageElement.alt = name

const typeWrapper = document.querySelector('.power-wrapper')
typeWrapper.innerHTML = "";
types.forEach(({type}) => {
  createAndAppendElement(typeWrapper, 'p', {
    className: `fonts-body3 ${type.name}`,
    textContent: type.name,
  })

})

document.querySelector('.wrap-pokemon-detail .pokemon-detail p.fonts-body3 .weight').textContent = `${weight / 10} kg`
document.querySelector('.wrap-pokemon-detail .pokemon-detail p.fonts-body3 .height').textContent = `${height / 10} m`

const abilitiesWrapper = document.querySelector('.wrap-pokemon-detail .pokemon-detail.move')

abilities.forEach(({ability}) => {
  createAndAppendElement(abilitiesWrapper, 'p', {
    className: 'fonts-body3',
    textContent: ability.name,
  })
})

const statsWrapper = document.querySelector('.stats-wrap')
statsWrapper.innerHTML = "";
// or stats-wrapped?
const statNameMapping = {
  hp: "HP",
  attack: "ATK",
  defense: "DEF",
  speed: "SPD",
  "special-attack": "Sp. ATK",
  "special-defense": "Sp. DEF",
}

stats.forEach(({stat, base_stat}) => {
  const statDiv = document.createElement('div')
  statDiv.className = 'stats-wrap'
  statsWrapper.appendChild(statDiv)

  createAndAppendElement(statDiv, 'p', {
    className: 'fonts-body3 stats',
    textContent: statNameMapping[stat.name],
  })

  createAndAppendElement(statDiv, 'p', {
    className: 'fonts-body3 ',
    textContent: String(base_stat).padStart(3, '0'),
  })

  createAndAppendElement(statDiv, 'progress', {
    className: 'progress-bar',
    value: base_stat,
    max: 100,
  })
})

setTypeBG(pokemon);

}
function getEnglishFlavorText(pokemonSpecies) {
  for (let entry of pokemonSpecies.flavor_text_entries)
  {
    if (entry.language.name === 'en') {
     let flavor = entry.flavor.replace(/\f/g,"")
     return flavor
    }
  }
  return ""
}
