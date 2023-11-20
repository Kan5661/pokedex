import './App.css';
import { useEffect, useState } from 'react'

// import all pokemon elements from icons folder
import bug from './icons/bug.svg'
import dark from './icons/dark.svg'
import dragon from './icons/dragon.svg'
import electric from './icons/electric.svg'
import fairy from './icons/fairy.svg'
import fighting from './icons/fighting.svg'
import fire from './icons/fire.svg'
import flying from './icons/flying.svg'
import ghost from './icons/ghost.svg'
import grass from './icons/grass.svg'
import ground from './icons/ground.svg'
import ice from './icons/ice.svg'
import normal from './icons/normal.svg'
import poison from './icons/poison.svg'
import psychic from './icons/psychic.svg'
import rock from './icons/rock.svg'
import steel from './icons/steel.svg'
import water from './icons/water.svg'



function App() {
  const [pokemonIndex, setPokemonIndex] = useState(1)
  const [pokemon, setPokemon] = useState({
    pokemonName: '',
    pokemonImgUrl: '',
    pokemonTypes: [],
    pokemonHeight: 0,
    pokemonWeight: 0,
    pokemonAbilties: [],
    pokemonStat: {},
    types: []
  })
  const [pokemonCount, setPokemonCount] = useState(0)
  const [key, setKey] = useState(1)
  // create useeffect to fetch total pokemon count
  useEffect(async() => {
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon-species/');
      const data = await response.json();
      setPokemonCount(data.count);
      console.log('Pokémon count:', data.count);
  } catch (error) {
      console.error('Error fetching Pokémon count:', error);
  }
  }, [])

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonIndex}`)
    .then(res => res.json())
    .then(data => {
      const result = {}
        result.pokemonName = data.name
        result.pokemonHeight = data.height
        result.pokemonWeight = data.weight
        result.pokemonImgUrl = data.sprites.front_default
        result.pokemonTypes = data.types.map((item) => item.type.name)
        result.pokemonAbilties = data.abilities.map((item) => item.ability.name)
        result.pokemonStat = {
          hp: data.stats[0].base_stat,
          attack: data.stats[1].base_stat,
          defense: data.stats[2].base_stat,
          special_attack: data.stats[3].base_stat,
          special_defense: data.stats[4].base_stat,
          speed: data.stats[5].base_stat,
        }
        result.types = data.types.map((item) => item.type.name)

      setPokemon(result)
    })
      setKey(key + 1)
      console.log([pokemon, pokemonIndex])
  }
  , [pokemonIndex])

  return (
    <div className="app">
      
      <div className="box">

        <button onClick={() => {
          pokemonIndex > 1? setPokemonIndex(Number(pokemonIndex) - 1) : setPokemonIndex(pokemonCount)
          }} className="button">&larr;</button>

        <div className="pokemonInfo" id="image">
          <div className='search'>
            <svg width="25" height="30">
              <circle cx="12" cy="11" r="7" fillOpacity="0" stroke="black" />
              <circle cx="12" cy="11" r="0.5" />
              <circle cx="12" cy="11" r="1.5" fillOpacity="0" stroke='black' />
              <line x1="13" y1="11" x2="19" y2="11" stroke='black'  />
              <line x1="5" y1="11" x2="10" y2="11" stroke='black'  />
            </svg>
            <form>
              <input max={pokemonCount} min="1" type="number" value={pokemonIndex} onChange={(e) => {
                e.preventDefault()
                setPokemonIndex(e.target.value)
                }}
                ></input>
            </form>
          </div>
          <div className="image">
            <img key={key} className='pokemonAnimation' src={pokemon.pokemonImgUrl}></img>
            <div className='pokemonTypes'>
              {pokemon.types.map((type) => {
                if (type === 'bug') return <img className="element" id={type} src={bug} title={"type: " + type}/>
                if (type === 'dark') return <img className="element" id={type} src={dark} title={"type: " + type}/>
                if (type === 'dragon') return <img className="element" id={type} src={dragon} title={"type: " + type}/>
                if (type === 'electric') return <img className="element" id={type} src={electric} title={"type: " + type}/>
                if (type === 'fairy') return <img className="element" id={type} src={fairy} title={"type: " + type}/>
                if (type === 'fighting') return <img className="element" id={type} src={fighting} title={"type: " + type}/>
                if (type === 'fire') return <img className="element" id={type} src={fire} title={"type: " + type}/>
                if (type === 'flying') return <img className="element" id={type} src={flying} title={"type: " + type}/>
                if (type === 'ghost') return <img className="element" id={type} src={ghost} title={"type: " + type}/>
                if (type === 'grass') return <img className="element" id={type} src={grass} title={"type: " + type}/>
                if (type === 'ground') return <img className="element" id={type} src={ground} title={"type: " + type}/>
                if (type === 'ice') return <img className="element" id={type} src={ice} title={"type: " + type}/>
                if (type === 'normal') return <img className="element" id={type} src={normal} title={"type: " + type}/>
                if (type === 'poison') return <img className="element" id={type} src={poison} title={"type: " + type}/>
                if (type === 'psychic') return <img className="element" id={type} src={psychic} title={"type: " + type}/>
                if (type === 'rock') return <img className="element" id={type} src={rock} title={"type: " + type}/>
                if (type === 'steel') return <img className="element" id={type} src={steel} title={"type: " + type}/>
                if (type === 'water') return <img className="element" id={type} src={water} title={"type: " + type}/>
              })}
            </div>
          </div> 
          <div className="pokemonDescription">
            <div className="info">
              <p> <span id="attr">Name:</span> {pokemon.pokemonName}</p>
              <p> <span id="attr">Types:</span> {pokemon.pokemonTypes.join(", ")}</p>
              <p> <span id="attr">Abilities:</span> {pokemon.pokemonAbilties.join(', ')}</p>
            </div>
            <div className="info">
              <p> <span id="attr">Height:</span> {pokemon.pokemonHeight} </p>
              <p> <span id="attr">Weight:</span> {pokemon.pokemonWeight}</p>
              <p> <span id="attr">id:</span> {pokemonIndex}</p>
            </div>
            <div className="info">
              <p> <span id="attr">hp: </span> {pokemon.pokemonStat.hp}</p>
              <p> <span id="attr">attack: </span> {pokemon.pokemonStat.attack}</p>
              <p> <span id="attr">defense: </span> {pokemon.pokemonStat.defense}</p>
            </div>
            <div className="info">
              <p> <span id="attr">speed: </span> {pokemon.pokemonStat.speed} </p>
              <p> <span id="attr">special-attack: </span> {pokemon.pokemonStat.special_attack}</p>
              <p> <span id="attr">special-defense: </span> {pokemon.pokemonStat.special_defense}</p>
            </div>
          </div>
        </div>

        <button
         onClick={() => {
          pokemonIndex < pokemonCount? setPokemonIndex(Number(pokemonIndex) + 1): setPokemonIndex(1)
          }} className="button">	&rarr;</button>
      </div>
    </div>
  );
}

export default App;
