import './searchField.css'
import axios from 'axios';
import apiKey from '../../../apiKey.js'
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import searchIcon from '../../assets/searchIcon.svg'

function SearchField() {

    const [searchResult, setSearchResult] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [isInputEmpty, setInputEmpty] = useState(true);

    useEffect(() => {
        const eventHandler = (event) => {
            if (event.key === 'Escape' && !isInputEmpty) { //event som lyssnar på esc-knappen och icke-tomt inputfält
                document.querySelector('#inputField').blur(); //flyttar focus från inputfält för att css ska dölja det
                const overlay = document.createElement('div'); //skapar en genomskinlig overlay för att dropdown inte ska känna av hover
                overlay.className = 'overlay';
                document.body.appendChild(overlay);

                overlay.addEventListener('mousemove', () => { // tar bort overlay så fort musen rör sig
                    overlay.remove();
                }, { once: true }); // ser till att eventlyssnaren bara körs en gång och sen tas bort
            }
        };

        window.addEventListener('keyup', eventHandler); //eventlyssnare för tangenttryckning som triggar eventHandler

        return () => {
            window.removeEventListener('keyup', eventHandler); // avaktiverar eventlyssnaren
        };
    }, [isInputEmpty]);

    const handleSearchInput = (event) => {
        setSearchValue(event.target.value) // Använder event för att hämta inmatad text ifrån inputfältet
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
        setSearchResult([]) // Rensar inputfältet vid klick på sökknappen 
        const input = document.querySelector(`#inputField`)
        input.value = ``
    }

    const checkInput = () => {
        const inputField = document.querySelector('#inputField').value;
        setInputEmpty(inputField === '');
    };


    return (
        <div className='search-container'>
            <input
                id='inputField'
                onChange={(event) => {
                    handleSearchInput(event);
                    checkInput();
                }}
                className='header__input'
                type="text"
                placeholder='Search...'
                aria-label='search bar field'
            />
            <section className='search-dropdown'> {
                searchResult.map((result) => {
                    return (
                        <Link
                            onClick={() => {
                                handleClose();
                                checkInput()
                            }}
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
            <Link
                onClick={() => {
                    handleClose();
                    checkInput()
                }}
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
    )
}

export default SearchField