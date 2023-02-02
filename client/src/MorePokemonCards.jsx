import { useState, useEffect } from 'react'

function SearchPokemon() {
    const [allPokemon, setAllPokemon] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [searchTotal, setSearchTotal] = useState(30)
    const [searchIndex, setSearchIndex] = useState(1)
    const [refreshPage, setRefreshPage] = useState(0)
    const pokemonList = []
    let namesList = []

    function handleChange(e) {
        console.log(e.target.value)
        setSearchValue(e.target.value)
    }

    function getScroll() {
        let scrollPosition = window.innerHeight + window.scrollY
        let pageHeight = document.body.offsetHeight
        console.log(scrollPosition, pageHeight)
        if (scrollPosition == pageHeight) {
            console.log('you are at the bottom of the page')
            // setSearchTotal((prev) => prev + 10)
            // pokemonIndex((prev) => prev + 10)
            setRefreshPage((prev) => prev + 1)
        }
    }

    function fetchPokemon() {
        if (searchValue === '') {
            for (let i = 1; i <= 905; i++) {
                fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
                .then(res => res.json())
                .then(data => {
                    const newPokemon = {
                        name: data.name,
                        sprite: data.sprites.front_default
                    }
                    pokemonList.push(newPokemon)
                    namesList.push(newPokemon.name)
                    setAllPokemon(pokemonList)
                    setRefreshPage((prev) => prev + 1)
                })
            }
        }
        else setAllPokemon([])
        
    }
    window.onscroll = () => getScroll()

    useEffect(() => fetchPokemon(), [searchValue])
    useEffect(() => {}, [refreshPage])

    return(
        <div className='allCardsPage'>

            <div className='searchInputDiv'>
                <input className='searchInput' onChange={handleChange}></input>
            </div>

            <div className='pokemonCards'>
            {allPokemon.map(pokemon => {
                return (
                    <div>
                        <img src={pokemon.sprite}></img>
                        <div>hello</div>
                    </div>
                )
            })}
            </div>
        </div>
    )
}

export default SearchPokemon