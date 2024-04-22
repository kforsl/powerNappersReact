import './header.css'
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import searchIcon from '../../assets/searchIcon.svg'


const apiKey = `2799d50`

function Header() {

    const [searchResult, setSearchResult] = useState([])
    const [searchValue, setSearchValue] = useState('')

    const handleSearchInput = (event) => {
        setSearchValue(event.target.value)
        axios.get(`http://www.omdbapi.com/?apikey=${apiKey}&s=${event.target.value}`)
            .then(res => {
                if (res.data.Search) {
                    setSearchResult(res.data.Search);
                } else {
                    setSearchResult([])
                }
            })
            .catch(error => console.log(error))
    }

    const handleClose = () => {
        setSearchResult([])
        const input = document.querySelector(`#inputField`)
        input.value = ``
    }

    const activeBtn = (e) => {
        document.querySelectorAll(`.header__list-item`)
            .forEach(item => {
                item.classList.remove(`active`)
            })

        if (e.target.tagName === 'LI') {
            e.target.classList.add(`active`)
        } else if (e.target.tagName === 'H1') {
            document.querySelector(`.header__list-item`).classList.add(`active`)
        }
    }


    return (
        <header className='header'>
            <section className='header__container'>
                <Link to="/" onClick={activeBtn} className='header__linktag' >
                    <h1 className='header__heading'>NAPFLIX</h1>
                </Link>
                <div className='search-container'>
                    <section className='search-dropdown'> {
                        searchResult.map((result) => {
                            return (
                                <Link
                                    onClick={handleClose}
                                    className='search-dropdown__link'
                                    key={result.imdbID}
                                    to={`/singlemovie/${result.imdbID}`}>
                                    <p className='search-dropdown__item'>
                                        {
                                            result.Title
                                        }
                                    </p>
                                </Link>
                            )
                        })}
                    </section>
                    <input
                        id='inputField'
                        onChange={handleSearchInput}
                        className='header__input'
                        type="text"
                        placeholder='Search...'
                        aria-label='search bar field'
                    />
                    <Link
                        onClick={handleClose}
                        to={`/search/${searchValue}`}
                        className='header__linktag header__btn'
                    >
                        <img
                            className='header__search-icon'
                            src={searchIcon}
                            alt='search icon'
                        />
                    </Link>
                </div>
                <nav className='header__nav'>
                    <ul className='header__nav-list'>
                        {/* <Link to="/" className='header__linktag' >
                            <li onClick={activeBtn} className='header__list-item'>Home</li>
                        </Link> */}
                        <Link to="/favorites/" className='header__linktag'>
                            <li onClick={activeBtn} className='header__list-item'>Favorites</li>
                        </Link>
                        <Link to="/watchlist/" className='header__linktag'>
                            <li onClick={activeBtn} className='header__list-item'>Watchlist</li>
                        </Link>
                    </ul>
                </nav>
            </section>
        </header>
    )
}

export default Header;
