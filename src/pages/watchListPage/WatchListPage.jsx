import './watchListPage.css'
import MovieListGrid from './../../components/movieListGrid/MovieListGrid';

function WatchListPage({ favoriteMovies, watchlist, handleFavorites, handleWatchlist }) {
    return (
        <main className='watchlist'>
            <h1 className='watchlist__title'> My Watchlist </h1>
            <MovieListGrid
                movies={watchlist}
                favoriteMovies={favoriteMovies}
                watchlist={watchlist}
                handleFavorites={handleFavorites}
                handleWatchlist={handleWatchlist}
            />
        </main>
    )
}

export default WatchListPage;