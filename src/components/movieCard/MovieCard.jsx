import { useEffect, useState } from 'react';
import './movieCard.css'
import { Link } from 'react-router-dom';

function MovieCard({ movie, favoriteMovies, watchlist, handleFavorites, handleWatchlist }) {
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [isInFavorites, setIsInFavorites] = useState(false);

  useEffect(() => {
    setIsInWatchlist(watchlist.some(item => item.imdbid === movie.imdbid));
    setIsInFavorites(favoriteMovies.some(item => item.imdbid === movie.imdbid));
  }, [watchlist, favoriteMovies, movie]);

  const toggleWatchlist = () => {
    if (isInWatchlist) {
      handleWatchlist(movie, 'remove');
      setIsInWatchlist(false);
    } else {
      handleWatchlist(movie, 'add');
      setIsInWatchlist(true);
    }
  };

  const toggleFavorites = () => {
    if (isInFavorites) {
      handleFavorites(movie, 'remove');
      setIsInFavorites(false);
    } else {
      handleFavorites(movie, 'add');
      setIsInFavorites(true);
    }
  };

  return (
    <article className='movieCard'>
      <Link to="//singlemoviepage/:id">
        <img className='movieCard__poster' src={movie.poster} alt={movie.title} />
        <section className='movieCard__overlay'>
          <h2 className='movieCard__title'>{movie.title} </h2>

          <div className="movieCard__actions">
            <button className='watchlist-btn' onClick={(e) => { e.preventDefault(); toggleWatchlist() }}>
              <img src={isInWatchlist ? 'src/assets/check.svg' : 'src/assets/plus.svg'} alt="Watchlist" />
            </button>
            <button className='favlist-btn' onClick={(e) => { e.preventDefault(); toggleFavorites() }}>
              <img src={isInFavorites ? 'src/assets/starFilled.svg' : 'src/assets/StarEmpty.svg'} alt="Favorites" />
            </button>
          </div>
        </section>
      </Link>
    </article>
  );
}

export default MovieCard;