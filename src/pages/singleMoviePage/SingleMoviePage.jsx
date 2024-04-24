import axios from 'axios';
import './singleMoviePage.css'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import missingPoster from '../../assets/missingPoster.svg'
import apiKey from '../../../apiKey';
import MovieInformation from './../../components/movieInformation/MovieInformation';

function SingleMoviePage(
    {
        handleRecentlyViewed,
        watchlist,
        handleWatchlist,
        favoriteMovies,
        handleFavorites,
    }
) {

    const { id } = useParams(); // Hämtar id från url

    const [clickedMovie, setClickedMovie] = useState({}); // Klickad film sparas ifrån api anrop
    const [isInFavorites, setIsInFavorites] = useState(false); // Håller koll på om filmen är med i favoriter eller inte
    const [isInWatchlist, setIsInWatchlist] = useState(false); // Håller koll på om filmen är med i watchlist eller inte

    const getApi = () => {
        axios.get(`http://www.omdbapi.com/?apikey=${apiKey}&plot=full&i=${id}`)
            .then(res => {
                setClickedMovie(res.data)
            })
            .catch(error => console.log(error))
    }

    useEffect(() => {
        getApi();
    }, [id])

    useEffect(() => {
        handleRecentlyViewed(clickedMovie)
    }, [clickedMovie])

    useEffect(() => {
        if (favoriteMovies) {
            setIsInFavorites(favoriteMovies.some(item => item.imdbID === clickedMovie.imdbID || item.imdbid === clickedMovie.imdbID));
        }
        if (watchlist) {
            setIsInWatchlist(watchlist.some(item => item.imdbID === clickedMovie.imdbID || item.imdbid === clickedMovie.imdbID));
        }
    }, [clickedMovie, favoriteMovies, watchlist]);

    if (clickedMovie.Poster === "N/A") {
        clickedMovie.Poster = `${missingPoster}`
    } else {
        clickedMovie.src = clickedMovie.Poster;
    }


    return (
        <main className='singleMovie__main'>
            <MovieInformation
                handleWatchlist={handleWatchlist}
                handleFavorites={handleFavorites}
                clickedMovie={clickedMovie}
                isInFavorites={isInFavorites}
                isInWatchlist={isInWatchlist}
            />
        </main>
    )
}

export default SingleMoviePage;