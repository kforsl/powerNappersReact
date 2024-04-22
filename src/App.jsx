import { useEffect, useState } from "react"
import Header from "./components/header/Header"
import Footer from "./components/footer/Footer"
import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/homePage/HomePage.jsx"
import SearchPage from "./pages/searchPage/SearchPage.jsx"
import handleSearchInput from './components/header/Header.jsx'
import FavoritesPage from './pages/favoritesPage/FavoritesPage';
import WatchListPage from './pages/watchListPage/WatchListPage';
import SingleMoviePage from './pages/singleMoviePage/SingleMoviePage';

function App() {
    const [recentlyViewed, setRecentlyViewed] = useState([])
    const handleRecentlyViewed = (movie) => {
        if (movie === 'clear') {
            setRecentlyViewed([])
        } else {
            if (movie.imdbID !== undefined) {
                const newRecentlyViewed = []
                console.log([...recentlyViewed]);
                [...recentlyViewed].some(m => m.imdbID === movie.imdbID) ? console.log(true) : console.log(false);
                for (let i = 0; i < 6; i++) {
                    if (recentlyViewed[i]) {
                        console.log(recentlyViewed[i]);
                        recentlyViewed[i].imdbID !== movie.imdbID && newRecentlyViewed.push(recentlyViewed[i])
                    }
                }
                newRecentlyViewed.unshift(movie)
                setRecentlyViewed(newRecentlyViewed)
            }
        }
    }

    const [favoriteMovies, setFavoriteMovies] = useState([]);
    const [watchlist, setWatchlist] = useState([]);

    const handleFavorites = (movie) => {
        if (favoriteMovies.find(m => m.imdbid === movie.imdbid)) {
            const updatedFavorite = favoriteMovies.filter(m => m.imdbid !== movie.imdbid)
            setFavoriteMovies(updatedFavorite)
        }
        else {
            const updatedFavorite = [...favoriteMovies]
            updatedFavorite.unshift(movie)
            setFavoriteMovies(updatedFavorite)
        }
    }

    const handleWatchlist = (movie) => {
        if (watchlist.find(m => m.imdbid === movie.imdbid)) {
            const newWatchlist = watchlist.filter(m => m.imdbid !== movie.imdbid)
            setWatchlist(newWatchlist)
        }
        else {
            const newWatchlist = [...watchlist]
            newWatchlist.unshift(movie)
            setWatchlist(newWatchlist)
        }
    }

    return (
        <div className="app">
            <Header handleSearchInput={handleSearchInput} />
            <Routes>
                <Route path="/" element={
                    <HomePage
                        watchlist={watchlist}
                        favoriteMovies={favoriteMovies}
                        handleFavorites={handleFavorites}
                        handleWatchlist={handleWatchlist}
                    />} />
                <Route path="/search/:searchTerm" element={
                    <SearchPage
                        watchlist={watchlist}
                        favoriteMovies={favoriteMovies}
                        handleFavorites={handleFavorites}
                        handleWatchlist={handleWatchlist}
                    />} />
                <Route path="/watchlist/" element={
                    <WatchListPage
                        watchlist={watchlist}
                        favoriteMovies={favoriteMovies}
                        handleFavorites={handleFavorites}
                        handleWatchlist={handleWatchlist}
                    />} />
                <Route path="/favorites/" element={<FavoritesPage
                    watchlist={watchlist}
                    favoriteMovies={favoriteMovies}
                    handleFavorites={handleFavorites}
                    handleWatchlist={handleWatchlist}
                />} />
                <Route path="/singlemovie/:id" element={
                    <SingleMoviePage
                        watchlist={watchlist}
                        favoriteMovies={favoriteMovies}
                        handleFavorites={handleFavorites}
                        handleWatchlist={handleWatchlist}
                        handleRecentlyViewed={handleRecentlyViewed}
                    />} />
            </Routes>
            <Footer recentlyViewed={recentlyViewed} handleRecentlyViewed={handleRecentlyViewed} />
        </div>
    )
}

export default App