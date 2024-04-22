import { useState } from "react"
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
            const newClickedMovie = { ...movie }
            const newRecentlyViewed = []
            const filterdRecently = recentlyViewed.filter(m => m.imdbID !== newClickedMovie.imdbID)
            for (let i = 0; i < 5; i++) {
                filterdRecently[i] && newRecentlyViewed.push(filterdRecently[i])
            }
            newRecentlyViewed.unshift(newClickedMovie)
            setRecentlyViewed(newRecentlyViewed)
        }
    }

    const [favoriteMovies, setFavoriteMovies] = useState([]);
    const [watchlist, setWatchlist] = useState([]);

    const handleFavorites = () => {
        console.log('handleFavorites');
    }
    const handleWatchlist = () => {
        console.log('handleWatchlist');
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
                <Route path="/watchlist/" element={<WatchListPage />} />
                <Route path="/favorites/" element={<FavoritesPage />} />
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