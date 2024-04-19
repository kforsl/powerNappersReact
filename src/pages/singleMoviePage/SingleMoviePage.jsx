import axios from 'axios';
import './singleMoviePage.css'
import plus from '../../assets/plus.svg'
import star from '../../assets/star.svg'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import checkedIcon from '../../assets/checked.svg'
import filledStar from '../../assets/filledStar.svg'
import missingPoster from '../../assets/missingPoster.svg'


const apiKey = `2799d50`

function SingleMoviePage(
  {
    handleRecentlyViewed,
    watchList,
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
    if (clickedMovie.imdbID !== undefined) {
      handleRecentlyViewed(clickedMovie)
    }
  }, [id, clickedMovie])

  useEffect(() => {
    if (favoriteMovies && favoriteMovies.length > 0) {
      setIsInFavorites(favoriteMovies.some(item => item.imdbID === clickedMovie.imdbID));
    }
    if (watchList && watchList.length > 0) {
      setIsInWatchlist(watchList.some(item => item.imdbID === clickedMovie.imdbID));
    }
  }, [clickedMovie, favoriteMovies, watchList]);

  if (clickedMovie.Poster === "N/A") {
    clickedMovie.Poster = `${missingPoster}`
  } else {
    clickedMovie.src = clickedMovie.Poster;
  }

  const handleFavoriteIcon = () => {
    if (isInFavorites) {
      handleFavorites(clickedMovie, 'remove')
      console.log(handleFavorites, 'removed');
    } else {
      handleFavorites(clickedMovie, 'add')
      console.log(handleFavorites, 'added');
    }
    setIsInFavorites(!isInFavorites)
  }

  const handleWatchListIcon = () => {
    if (isInWatchlist) {
      handleWatchlist(clickedMovie, 'remove')
      console.log(handleWatchlist, 'removed');
    } else {
      handleWatchlist(clickedMovie, 'add')
      console.log(handleWatchlist, 'added');
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
              <figure className='singleMovie__icon-container'>
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