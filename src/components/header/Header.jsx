import './header.css'
import { Link } from 'react-router-dom';
import SearchField from '../searchField/SearchField.jsx';
import Navigation from '../navigation/Navigation.jsx';

function Header() {

    const activeBtn = (e) => {
        document.querySelectorAll(`.header__list-item`)
            .forEach(item => {
                item.classList.remove(`active`)
            })

        if (e.target.tagName === 'LI') {
            e.target.classList.add(`active`)
        } else if (e.target.tagName === 'IMG') {
            document.querySelector(`.header__list-item`).classList.add(`active`)
        }
    }

    return (
        <header className='header'>
            <section className='header__container'>
                <Link to="/" onClick={activeBtn} className='header__linktag' >
                    <img className='header__logo' src="../src/assets/napflix.svg" alt="napflix logo" />
                </Link>
                <SearchField />
                <Navigation activeBtn={activeBtn} />
            </section>
        </header>
    )
}

export default Header;
