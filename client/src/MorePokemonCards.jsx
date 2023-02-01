import { useState } from 'react'

function SearchPokemon() {
    const [allPokemon, setAllPokemon] = useState({})

    function getScroll() {
        let scrollPosition = window.innerHeight + window.scrollY
        let pageHeight = document.body.offsetHeight
        if (scrollPosition == pageHeight) {
            console.log('you are at the bottom of the page')
        }
    }
    window.onscroll = () => getScroll()

    return(
        <div className='allCardsPage'>

        </div>
    )
}

export default SearchPokemon