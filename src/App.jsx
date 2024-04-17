import { Route, Routes } from "react-router-dom"
import Header from "./components/header/Header"
import Footer from "./components/footer/Footer"
import HomePage from "./pages/homePage/HomePage.jsx"
import SearchPage from "./pages/searchPage/SearchPage.jsx"
import FavoritesPage from './pages/favoritesPage/FavoritesPage';
import WatchListPage from './pages/watchListPage/WatchListPage';
import SingleMoviePage from './pages/singleMoviePage/SingleMoviePage';
import { useState } from "react"

function App() {

    const [recentlyViewed, setRecentlyViewed] = useState([])

    const handleRecentlyViewed = (movie) => {
        console.log(typeof (movie));
        if (movie === 'clear') {
            console.log('true');
            setRecentlyViewed([])
        } else {
            console.log('false');
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

    return (
        <div>
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/search/:id" element={<SearchPage />} />
                <Route path="/watchlist/" element={<WatchListPage />} />
                <Route path="/favorites/" element={<FavoritesPage />} />
                <Route path="/singlemovie/:id" element={<SingleMoviePage
                    handleRecentlyViewed={handleRecentlyViewed} />} />
            </Routes>
            <Footer recentlyViewed={recentlyViewed} handleRecentlyViewed={handleRecentlyViewed} />
        </div>
    )
}

export default App
