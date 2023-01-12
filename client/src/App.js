import './App.css';
import { useEffect, useState } from 'react'

function App() {
  const [pokemonIndex, setPokemonIndex] = useState(1)
  const [pokemon, setPokemon] = useState({
    pokemonName: '',
    pokemonImgUrl: '',
    pokemonTypes: [],
    pokemonHeight: 0,
    pokemonWeight: 0,
    pokemonAbilties: [],
    pokemonStat: {}
  })

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

      setPokemon(result)
    })
      console.log([pokemon, pokemonIndex])
  }
  , [pokemonIndex])

  return (
    <div className="app">
      <nav className="nav">Pokédex</nav>
      <div className="box">

        <button onClick={() => pokemonIndex > 1? setPokemonIndex(Number(pokemonIndex) - 1) : setPokemonIndex(905)} className="button">&larr;</button>

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
              <input max="905" min="1" type="number" value={pokemonIndex} onChange={(e) => {
                e.preventDefault()
                setPokemonIndex(e.target.value)
                }}
                ></input>
            </form>
          </div>
          <div className="image">
            <img src={pokemon.pokemonImgUrl}></img>
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
              <p> <span id="attr">attack: </span> {pokemon.pokemonStat.atktac}</p>
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
         onClick={() => pokemonIndex < 905? setPokemonIndex(Number(pokemonIndex) + 1): setPokemonIndex(1)} className="button">	&rarr;</button>
      </div>
    </div>
  );
}

export default App;
