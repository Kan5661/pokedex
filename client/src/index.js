import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route, Link } from 'react-router-dom'
import SearchPokemon from './MorePokemonCards.jsx';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

 
        <Router>
        <nav className="nav">
          <Link to='/allcards' className='allCardLink'>All Cards</Link>
          <div className='title'>Pokédex</div>
          <Link to='/' className='sliderLink'>slider</Link>
        </nav>
          <Routes>
            <Route path='/' element={<App /> }/>
            <Route path='/allcards' element={<SearchPokemon /> }/>
          </Routes>
        </Router>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
