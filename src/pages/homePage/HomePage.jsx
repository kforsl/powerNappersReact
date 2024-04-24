import { useState, useEffect } from 'react';
import './homePage.css'
import axios from 'axios';
import TrailerCarousel from '../../components/trailerCarousel/TrailerCarousel';
import MovieCardSlider from '../../components/movieCardSlider/MovieCardSlider';
import MovieListGrid from './../../components/movieListGrid/MovieListGrid';
import editorsChoiceJson from '../../assets/editorsChoice.json'

const getTopMovies = (setTopMovies) => {
    axios.get('https://santosnr6.github.io/Data/movies2.json')
        .then((response) => {
            setTopMovies(response.data); // Sparar datan från API i setTopMovies
        })
        .catch(error => console.log(error))
}

const getfeaturedMovies = (setFeaturedTrailers, featuredTrailers, movieOptions) => {
    if (movieOptions.length !== 0) { // Kollar om det finns någon film i movieOptions
        if (featuredTrailers.length !== 5) { // Kollar om det behöver slumpas ut 5 nya filmer eller ej
            const movies = [...movieOptions] // Gör en kopia av movieOptions för att kunna ändra innehåll
            const newFeaturedTrailers = [] // Slumpade filmer läggs i arrayen

            while (newFeaturedTrailers.length < 5) {
                const index = Math.floor(Math.random() * movies.length) // Slumpar fram ett tal baserat på movies.length
                const randomMovie = movies.splice(index, 1) // Tar bort 1 film från movies & sparar den i randomMovie
                newFeaturedTrailers.push(randomMovie[0]) // Pushar in det nya objektet i newFeaturedTrailers
            }
            setFeaturedTrailers(newFeaturedTrailers); // Uppdaterar featuredTrailers med de nya slumpade trailers
        }
    }
}

function Homepage({ favoriteMovies, watchlist, handleFavorites, handleWatchlist }) {

    const [topMovies, setTopMovies] = useState([]) // Här sparas filmer som visas i top20
    const [featuredTrailers, setFeaturedTrailers] = useState([]) // Här sparas det filmer som ska visas i trailerkarusell
    const [editorsChoices, setEditorsChoices] = useState([]) // Här sparas filmer som visas i editorsChoice

    // useEffect körs vid mount
    useEffect(() => {
        getTopMovies(setTopMovies)
        setEditorsChoices([...editorsChoiceJson])
    }, [])

    // useEffect körs när topMovies ändras
    useEffect(() => {
        getfeaturedMovies(setFeaturedTrailers, featuredTrailers, topMovies)
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
                    {featuredTrailers.length === 5 &&
                        < TrailerCarousel
                            movies={featuredTrailers}
                        />}

                </article>

                <article className='home-page__container'>
                    <h2 className='home-page__title'>
                        Editors Choice
                    </h2>

                    <MovieCardSlider
                        movies={editorsChoices}
                        favoriteMovies={favoriteMovies}
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
                        favoriteMovies={favoriteMovies}
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