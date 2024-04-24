import { useState } from 'react';
import './movieCardSlider.css'
import { useEffect } from 'react';
import MovieCard from '../movieCard/MovieCard';

function MovieCardSlider({ movies, favoriteMovies, watchlist, handleFavorites, handleWatchlist }) {
    const nmbrOfIndicators = Math.ceil(movies.length / 5 - 1) // Kalkylerar hur många lägesindikatorer som ska visas i progress bar.
    const [sliderPosition, setSliderPosition] = useState(0) // talar om vilken lägesindikator som ska highlightas mm
    const [progressBar, setProgressBar] = useState([])

    useEffect(() => {
        createprogressBar()
    }, [nmbrOfIndicators])

    useEffect(() => {
        createprogressBar()
    }, [sliderPosition])

    const changeLeft = () => {
        if (sliderPosition > 0) { // För att inte kunna gå lägre än noll
            const newPosition = sliderPosition - 1
            setSliderPosition(newPosition)
        }
    }
    const changeRight = () => {
        if (sliderPosition < nmbrOfIndicators) { // För att inte kunna gå högre än max antal indikatorer
            const newPosition = sliderPosition + 1
            setSliderPosition(newPosition)
        }
    }

    const createprogressBar = () => {
        const newProgressBar = []; // Skapar en tom array som ska innehålla indikatorerna
        for (let i = 0; i < nmbrOfIndicators + 1; i++) { // Loopar igenom baserat på hur många indikatorer som ska visas
            sliderPosition === i ? // Kontrollerar om nuvarande loop är aktiv indikator
                newProgressBar.push(true)
                :
                newProgressBar.push(false)
        }
        setProgressBar(newProgressBar)
    }

    return (
        <section className='container'>

            <button
                onClick={changeLeft}
                className='card-slider__navigation-btn card-slider__navigation-btn--left'
            >
                <img src={'../src/assets/chevronLeft.svg'} alt="slider navigate chevron left " />
            </button>
            
            {/* Räkna ut hur mycket slidern ska flyttas vid knapptryck */}
            <div className='slider' style={{ transform: `translateX(calc(-100% * ${sliderPosition}))` }}>
                {
                    movies.map((movie) => <MovieCard
                        key={movie.imdbid}
                        movie={movie}
                        handleFavorites={handleFavorites}
                        handleWatchlist={handleWatchlist}
                        favoriteMovies={favoriteMovies}
                        watchlist={watchlist} />)
                }
            </div>
            <button
                onClick={changeRight}
                className='card-slider__navigation-btn card-slider__navigation-btn--right'
            >
                <img src={'../src/assets/chevronRight.svg'} alt="slider navigate chevron right" />
            </button>

            <section className='progress-bar'>
                {
                    progressBar.map((nob, index) => {
                        return nob ?
                            <p key={index} className='progress-bar__indicator progress-bar__indicator--active'></p> :
                            <p key={index} className='progress-bar__indicator'></p>
                    })
                }
            </section>
        </section>
    )
}

export default MovieCardSlider
