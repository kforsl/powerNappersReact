import './header.css'
import searchIcon from '../../assets/searchIcon.svg'
import { Link } from 'react-router-dom';
import { useState } from 'react';

function Header() {

  const [] = useState('')

  return (
    <section className='header__container'>
      <h1 className='header__heading'>NAPFLIX</h1>
      <input 
      className='header__input'
      type="text" 
      placeholder='Search...' 
      aria-label='search bar field' 
      />

      <Link to="/Search/"  >
        <img className='header__search-icon' src={searchIcon} alt='search icon' />
      </Link>
      <nav className='header__nav'>
        <ul className='header__nav-list'>
          <Link to="/Home/">
            <li className='header__list-item'>Home</li>
          </Link>
          <Link to="/Favorites/">
            <li className='header__list-item'>Favorites</li>
          </Link>
          <Link to="/Watchlist/">
            <li className='header__list-item'>Watchlist</li>
          </Link>
        </ul>
      </nav>
    </section >
  )
}

export default Header;