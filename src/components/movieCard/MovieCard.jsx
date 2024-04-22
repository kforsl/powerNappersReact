import { useEffect, useState } from 'react';
import './movieCard.css'
import { Link } from 'react-router-dom';

function MovieCard({ movie, favoriteMovies, watchlist, handleFavorites, handleWatchlist }) {
    const [isInWatchlist, setIsInWatchlist] = useState(false);
    const [isInFavorites, setIsInFavorites] = useState(false);

    useEffect(() => {
        if (movie.imdbID) {
            setIsInWatchlist(watchlist.some(item => item.imdbID === movie.imdbID))
            setIsInFavorites(favoriteMovies.some(item => item.imdbID === movie.imdbID))
        } else if (movie.imdbid) {
            setIsInWatchlist(watchlist.some(item => item.imdbid === movie.imdbid))
            setIsInFavorites(favoriteMovies.some(item => item.imdbid === movie.imdbid))
        }
    }, [watchlist, favoriteMovies, movie]);

    const toggleWatchlist = () => {
        if (isInWatchlist) {
            handleWatchlist(movie);
        } else {
            handleWatchlist(movie);
        }
    };

    const toggleFavorites = () => {
        if (isInFavorites) {
            handleFavorites(movie);
        } else {
            handleFavorites(movie);
        }
    };

    return (
        <article className='movieCard'>
            <Link className='moviCard-Link' to={`/singlemovie/${movie.imdbid ? movie.imdbid : movie.imdbID}`}>
                <img className='movieCard__poster' src={movie.poster ? movie.poster : movie.Poster} alt={movie.title ? movie.title : movie.Title} />
                <section className='movieCard__overlay'>
                    <h2 className='movieCard__title'>{movie.title ? movie.title : movie.Title} </h2>
                    <div className="movieCard__actions">
                        <button className='watchlist-btn' onClick={(e) => { e.preventDefault(); toggleWatchlist() }}>
                            <img src={isInWatchlist ? '../src/assets/checked.svg' : '../src/assets/plus.svg'} alt={`Watchlist for ${movie.title ? movie.title : movie.Title}`} />
                        </button>
                        <button className='favlist-btn' onClick={(e) => { e.preventDefault(); toggleFavorites() }}>
                            <img src={isInFavorites ? '../src/assets/starFilled.svg' : '../src/assets/StarEmpty.svg'} alt={`Favorites for ${movie.title ? movie.title : movie.Title}`} />
                        </button>
                    </div>
                </section>
            </Link>
        </article>
    );
}

export default MovieCard;
