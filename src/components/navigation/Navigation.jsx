import { Link } from 'react-router-dom';
import './navigation.css'

function Navigation({ activeBtn }) {

  return (
    <nav>
      <ul className='header__nav-list'>
        <Link to="/" className='header__linktag' >
          <li onClick={activeBtn} className='header__list-item'>Home</li>
        </Link>
        <Link to="/favorites/" className='header__linktag'>
          <li onClick={activeBtn} className='header__list-item'>Favorites</li>
        </Link>
        <Link to="/watchlist/" className='header__linktag'>
          <li onClick={activeBtn} className='header__list-item'>Watchlist</li>
        </Link>
      </ul>
    </nav>
  )
}

export default Navigation;