import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import MovieListGrid from '../../components/movieListGrid/MovieListGrid';
import './searchPage.css'
import apiKey from '../../../apiKey.js';

function SearchPage( { favoriteMovies, watchlist, handleFavorites, handleWatchlist } ) {
  const { searchTerm } = useParams();
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://www.omdbapi.com/?apikey=${apiKey}&s=${searchTerm}`);
        setSearchResults(response.data.Search);
      } catch (error) {
        console.error('Error vid hämtning av sökresultat:', error);
      }
    };

    fetchData();
  }, [searchTerm]);

  return (
    <main className='searchPage'>
      <h1 className='searchPage__title'>Resultat för sökningen <span>{searchTerm}</span> </h1>
      <MovieListGrid
          movies={searchResults}
          favoriteMovies={favoriteMovies}
          watchlist={watchlist}
          handleFavorites={handleFavorites}
          handleWatchlist={handleWatchlist}
      />
    </main>
  )
}

export default SearchPage;