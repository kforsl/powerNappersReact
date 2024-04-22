import './movieListGrid.css'
import MovieCard from '../movieCard/MovieCard';


function MovieListGrid({ movies, favoriteMovies, watchlist, handleFavorites, handleWatchlist }) {
    return (
        <div className='movieListGrid'>
            {movies.map(movie => (
                <MovieCard
                    key={movie.imdbid}
                    movie={movie}
                    handleFavorites={handleFavorites}
                    handleWatchlist={handleWatchlist}
                    favoriteMovies={favoriteMovies}
                    watchlist={watchlist}
                />
            ))}
        </div>
    )
}

export default MovieListGrid;