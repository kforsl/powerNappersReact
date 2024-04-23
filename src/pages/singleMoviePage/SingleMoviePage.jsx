import axios from 'axios';
import './singleMoviePage.css'
import plus from '../../assets/plus.svg'
import star from '../../assets/starEmpty.svg'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import checkedIcon from '../../assets/checked.svg'
import filledStar from '../../assets/starFilled.svg'
import missingPoster from '../../assets/missingPoster.svg'
import apiKey from '../../../apiKey';

function SingleMoviePage(
    {
        handleRecentlyViewed,
        watchlist,
        handleWatchlist,
        favoriteMovies,
        handleFavorites,
    }
) {

    const { id } = useParams();

    const [clickedMovie, setClickedMovie] = useState({});
    const [isInFavorites, setIsInFavorites] = useState(false);
    const [isInWatchlist, setIsInWatchlist] = useState(false);

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

    const handleFavoriteIcon = () => {
        if (isInFavorites) {
            handleFavorites(clickedMovie, 'remove')
        } else {
            handleFavorites(clickedMovie, 'add')
        }
        setIsInFavorites(!isInFavorites)
    }

    const handleWatchListIcon = () => {
        if (isInWatchlist) {
            handleWatchlist(clickedMovie, 'remove')
        } else {
            handleWatchlist(clickedMovie, 'add')
        }
        setIsInWatchlist(!isInWatchlist)
    }


    return (
        <main className='singleMovie__main'>
            <article className='singleMovie__section'>
                <img className='singleMovie__img' src={clickedMovie.Poster} alt={`Poster of, ${clickedMovie.Title}`} />
                <section className='singleMovie__info-container'>
                    <section className='singleMovie__wrapper-upper'>
                        <section className='singleMovie__heading-container'>
                            <h2 className='singleMovie__heading'>{clickedMovie.Title}</h2>
                            <figure>
                                <img
                                    onClick={handleWatchListIcon}
                                    className='singleMovie__plus-icon'
                                    src={isInWatchlist ? checkedIcon : plus}
                                    alt="Plus icon"
                                />
                                <img
                                    onClick={handleFavoriteIcon}
                                    className='singleMovie__star-icon'
                                    src={isInFavorites ? filledStar : star}
                                    alt="Star icon"
                                />
                            </figure>
                        </section>
                        <section className='singleMovie__details'>
                            <p className='singleMovie__details-item'>{clickedMovie.Type}</p>
                            <p className='singleMovie__details-item'>Rated: {clickedMovie.Rated}</p>
                            <p className='singleMovie__details-item'>Genre: {clickedMovie.Genre}</p>
                            <p className='singleMovie__details-item'>Runtime: {clickedMovie.Runtime}</p>
                            <p className='singleMovie__details-item'>Released: {clickedMovie.Released}</p>
                            <p className='singleMovie__details-item'>Rating: {clickedMovie.Ratings && clickedMovie.Ratings.length > 0 ? clickedMovie.Ratings[0].Value : "N/A"}</p>
                        </section>
                    </section>
                    <div className='singleMovie__plot-container'>
                        <h3 className='singleMovie__plot-heading'>Storyline:</h3>
                        <p className='singleMovie__plot'>{clickedMovie.Plot}</p>
                    </div>
                    <section className='singleMovie__staff'>
                        <p className='singleMovie__staff-item'>Director:<br /> {clickedMovie.Director}</p>
                        <p className='singleMovie__staff-item'>Writer:<br /> {clickedMovie.Writer} </p>
                        <p className='singleMovie__staff-item'>Actors:<br /> {clickedMovie.Actors} </p>
                    </section>
                </section>
            </article>
        </main>
    )
}

export default SingleMoviePage;