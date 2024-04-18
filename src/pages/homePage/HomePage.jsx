import { useEffect } from 'react';
import './homePage.css'
import { useState } from 'react';
import axios from 'axios';
import TrailerCarousel from '../../components/trailerCarousel/TrailerCarousel';
import MovieCardSlider from '../../components/movieCardSlider/MovieCardSlider';
import MovieListGrid from './../../components/movieListGrid/MovieListGrid';

const getTopMovies = (setTopMovies) => {
    axios.get('https://santosnr6.github.io/Data/movies2.json')
        .then((response) => {
            setTopMovies(response.data);
        })
        .catch(error => console.log(error))
}

const getfeaturedMovies = (setFeaturedTrailers, topMovies) => {
    const movies = [...topMovies]
    const newFeaturedTrailers = []

    while (newFeaturedTrailers.length < 5) {
        const index = Math.floor(Math.random() * movies.length)
        const randomMovie = movies.splice(index, 1)
        newFeaturedTrailers.push(randomMovie[0])
    }

    setFeaturedTrailers(newFeaturedTrailers);
}

function Homepage({ favoritMovies, watchlist, handleFavorites, handleWatchlist }) {

    const [topMovies, setTopMovies] = useState([])
    const [featuredTrailers, setFeaturedTrailers] = useState([])
    const [editorsChoices, setEditorsChoices] = useState([])

    useEffect(() => {
        getTopMovies(setTopMovies)
    }, [])

    useEffect(() => {
        getfeaturedMovies(setFeaturedTrailers, topMovies)
    }, [topMovies])

    return (
        <main
            className='home-page'
        >
            <section className='home-page__content'>
                <article className='home-page__container'>
                    <h2 className='home-page__title'>
                        Featured today
                    </h2>
                    <TrailerCarousel
                        movies={featuredTrailers}
                    />

                </article>

                <article className='home-page__container'>
                    <h2 className='home-page__title'>
                        Editors Choice
                    </h2>

                    <MovieCardSlider
                        movies={editorsChoices}
                        favoritMovies={favoritMovies}
                        watchlist={watchlist}
                        handleFavorites={handleFavorites}
                        handleWatchlist={handleWatchlist}
                    />

                </article>

                <article className='home-page__container'>
                    <h2 className='home-page__title'>
                        Top 20
                    </h2>
                    <MovieListGrid
                        movies={topMovies}
                        favoritMovies={favoritMovies}
                        watchlist={watchlist}
                        handleFavorites={handleFavorites}
                        handleWatchlist={handleWatchlist}
                    />
                </article>
            </section>
        </main>
    )
}

export default Homepage;