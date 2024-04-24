import { useEffect, useState } from 'react';
import './movieCard.css'
import { Link } from 'react-router-dom';
import missingPoster from '../../assets/missingPoster.svg'

function MovieCard({ movie, favoriteMovies, watchlist, handleFavorites, handleWatchlist }) {
    const [isInWatchlist, setIsInWatchlist] = useState(false);
    const [isInFavorites, setIsInFavorites] = useState(false);

    useEffect(() => {
        // Kollar om medskickad film är med stora || små bokstäver i key, eftersom APIerna gör olika.
        if (movie.imdbID) {
            setIsInWatchlist(watchlist.some(item => item.imdbID === movie.imdbID || item.imdbid === movie.imdbID))
            setIsInFavorites(favoriteMovies.some(item => item.imdbID === movie.imdbID || item.imdbid === movie.imdbID))
        } else if (movie.imdbid) {
            setIsInWatchlist(watchlist.some(item => item.imdbid === movie.imdbid || item.imdbID === movie.imdbid))
            setIsInFavorites(favoriteMovies.some(item => item.imdbid === movie.imdbid || item.imdbID === movie.imdbid))
        }
    }, [watchlist, favoriteMovies, movie]);

    // Sätter en bild på de objekt som saknar länk till poster
    if (movie.Poster === "N/A") {
        movie.Poster = `${missingPoster}`
    } else {
        movie.src = movie.Poster;
    }

    return (
        <article className='movieCard'>
            <Link className='movieCard-Link' to={`/singlemovie/${movie.imdbid ? movie.imdbid : movie.imdbID}`}>
                <img className='movieCard__poster' src={movie.poster ? movie.poster : movie.Poster} alt={movie.title ? movie.title : movie.Title} />
                <section className='movieCard__overlay'>
                    <h2 className='movieCard__title'>{movie.title ? movie.title : movie.Title} </h2>
                    <div className="movieCard__actions">
                        <button className='watchlist-btn' onClick={(e) => { e.preventDefault(); handleWatchlist(movie) }}>
                            <img src={isInWatchlist ? '../src/assets/checked.svg' : '../src/assets/plus.svg'} alt="Watchlist" />
                        </button>
                        <button className='favlist-btn' onClick={(e) => { e.preventDefault(); handleFavorites(movie) }}>
                            <img src={isInFavorites ? '../src/assets/starFilled.svg' : '../src/assets/StarEmpty.svg'} alt="Favorites" />
                        </button>
                    </div>
                </section>
            </Link>
        </article>
    );
}

export default MovieCard;
