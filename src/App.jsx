import { Route, Routes } from "react-router-dom"
import Header from "./components/header/Header"
import Footer from "./components/footer/Footer"
import HomePage from "./pages/homePage/HomePage.jsx"
import SearchPage from "./pages/searchPage/SearchPage.jsx"
import FavoritesPage from './pages/favoritesPage/FavoritesPage';
import WatchListPage from './pages/watchListPage/WatchListPage';
import { useState } from "react"

function App() {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [watchlist, setWatchlist] = useState([])

  const handleFavorites = () => {
    console.log('handleFavorites');
  }
  const handleWatchlist = () => {
    console.log('handleWatchlist');
  }

  return (
    <div>Powernappers
      <Header />
      <Routes>
        <Route path="/" element={
          <HomePage
            favoriteMovies={favoriteMovies}
            watchlist={watchlist}
            handleFavorites={handleFavorites}
            handleWatchlist={handleWatchlist}
          />
        }
        />
        <Route path="/search/:id" element={<SearchPage />} />
        <Route path="/watchlist/" element={<WatchListPage />} />
        <Route path="/favorites/" element={<FavoritesPage />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App