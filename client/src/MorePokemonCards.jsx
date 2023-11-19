import { useState, useEffect } from 'react';

function SearchPokemon() {
    const [allPokemon, setAllPokemon] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [namesList, setNamesList] = useState([]);
    const [refreshPage, setRefreshPage] = useState(0);

    function handleChange(e) {
        setSearchValue(e.target.value);
    }

    function getScroll() {
        const scrollPosition = window.innerHeight + window.scrollY;
        const pageHeight = document.body.offsetHeight;
        if (scrollPosition === pageHeight) {
            setRefreshPage((prev) => prev + 1);
        }
    }

    async function fetchPokemonList() {
        const pokemonList = [];
        const fetchedNamesList = [];
        const limit = searchValue === '' ? 905 : namesList.length;

        for (let i = 1; i <= limit; i++) {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
            const data = await response.json();

            const newPokemon = {
                name: data.name,
                sprite: data.sprites.front_default,
                id: data.id
            };
            pokemonList.push(newPokemon);
            fetchedNamesList.push(newPokemon.name);
        }

        setAllPokemon(pokemonList);
        setNamesList(fetchedNamesList);
    }

    useEffect(() => {
        fetchPokemonList();
    }, [searchValue, refreshPage]);

    useEffect(() => {
        window.addEventListener('scroll', getScroll);
        return () => {
            window.removeEventListener('scroll', getScroll);
        };
    }, []);

    const filteredPokemon = allPokemon.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    return (
        <div className='allCardsPage'>
            <div className='searchInputDiv'>
                <input
                    className='searchInput'
                    onChange={handleChange}
                    value={searchValue}
                    placeholder='Enter Pokemon Name'
                ></input>
            </div>

            <div className='pokemonCards'>
                {filteredPokemon.map((pokemon, index) => (
                    <div key={index} className='PokemonCardBG'>
                        <img src={pokemon.sprite} alt={pokemon.name}></img>
                        <div className='pokemonstat'>{pokemon.name}</div>
                        <div className='pokemonstat'>#{pokemon.id}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SearchPokemon;
