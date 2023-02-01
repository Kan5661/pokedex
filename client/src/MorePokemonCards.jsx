import { useState, useEffect } from 'react'

function SearchPokemon() {
    const [allPokemon, setAllPokemon] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [searchTotal, setSearchTotal] = useState(10)
    const pokemonList = []
    function handleChange(e) {
        console.log(e.target.value)
    }

    function getScroll() {
        let scrollPosition = window.innerHeight + window.scrollY
        let pageHeight = document.body.offsetHeight
        if (scrollPosition == pageHeight) {
            console.log('you are at the bottom of the page')
        }
    }

    function fetchPokemon() {
        if (searchValue === '') {
            for (let i = 0; i <= searchTotal; i++) {
                fetch(`https://pokeapi.co/api/v2/pokemon/${searchTotal}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    const newPokemon = {
                        name: data.name
                    }
                    pokemonList.push(newPokemon)
                    setAllPokemon(pokemonList)
                })
            }
        }
    }
    window.onscroll = () => getScroll()

    useEffect(() => fetchPokemon(), [])

    return(
        <div className='allCardsPage'>
            <input className='searchInput' onChange={handleChange}></input>
        </div>
    )
}

export default SearchPokemon