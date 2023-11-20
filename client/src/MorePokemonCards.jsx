import { useState, useEffect } from 'react';
import { FallingLines } from 'react-loader-spinner';

function SearchPokemon() {
    const [allPokemon, setAllPokemon] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [totalPokemon, setTotalPokemon] = useState(0);

    function handleChange(e) {
        setSearchValue(e.target.value);
    }

    async function fetchPokemonCount() {
        try {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon-species/');
            const data = await response.json();
            setTotalPokemon(data.count);
        } catch (error) {
            console.error('Error fetching Pokémon count:', error);
        }
    }

    async function fetchAllPokemon() {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${totalPokemon}`);
            const data = await response.json();

            const promises = data.results.map(async (pokemon) => {
                const pokeResponse = await fetch(pokemon.url);
                const pokeData = await pokeResponse.json();

                return {
                    name: pokeData.name,
                    sprite: pokeData.sprites.front_default,
                    id: pokeData.id
                };
            });

            const pokemonList = await Promise.all(promises);
            setAllPokemon(pokemonList);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching Pokémon:', error);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchPokemonCount();
    }, []);

    useEffect(() => {
        if (totalPokemon > 0) {
            fetchAllPokemon();
        }
    }, [totalPokemon]);

    const filteredPokemon = allPokemon.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    return (
        <div className='allCardsPage'>
            <div className='searchInputDiv'>
                <input
                    className='searchInput'
                    onChange={handleChange}
                    value={searchValue}
                    placeholder='Enter Pokémon Name'
                ></input>
            </div>

            {isLoading ? (
                <div className='loadingSpinner'>
                    <FallingLines
                        color='#0000FF'
                        width={100}
                        visible={true}
                        ariaLabel='falling-lines-loading'
                    />
                </div>
            ) : (
                <div className='pokemonCards'>
                    {filteredPokemon.map((pokemon, index) => (
                        <div key={index} className='PokemonCardBG'>
                            <img src={pokemon.sprite} alt={pokemon.name}></img>
                            <div className='pokemonstat'>{pokemon.name}</div>
                            <div className='pokemonstat'>#{pokemon.id}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default SearchPokemon;
