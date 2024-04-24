import MovieListGrid from '../../components/movieListGrid/MovieListGrid';
import './favoritesPage.css'

function FavoritesPage({ favoriteMovies, watchlist, handleFavorites, handleWatchlist }) {
    return (
        <main className='favoritePage-container'>
            <h1 className='favoritePage-heading'>My Favorites</h1>
            <MovieListGrid
                movies={favoriteMovies}
                watchlist={watchlist}
                favoriteMovies={favoriteMovies}
                handleFavorites={handleFavorites}
                handleWatchlist={handleWatchlist}
            />
        </main>
    )
}

export default FavoritesPage;