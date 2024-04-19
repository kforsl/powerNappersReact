import { useState } from 'react';
import './movieCardSlider.css'
import { useEffect } from 'react';

function MovieCardSlider({ movies }) {
    const nmbrOfRow = Math.ceil(movies.length / 5 - 1)
    const [sliderPosition, setSliderPosition] = useState(0)
    const [progressBar, setProgressBar] = useState([])

    useEffect(() => {
        createprogressBar()
    }, [nmbrOfRow])

    useEffect(() => {
        createprogressBar()
    }, [sliderPosition])

    const changeLeft = () => {
        if (sliderPosition > 0) {
            const newPosition = sliderPosition - 1
            setSliderPosition(newPosition)
        }
    }
    const changeRight = () => {
        if (sliderPosition < nmbrOfRow) {
            const newPosition = sliderPosition + 1
            setSliderPosition(newPosition)
        }
    }

    const createprogressBar = () => {
        const newProgressBar = [];
        for (let i = 0; i < nmbrOfRow + 1; i++) {
            sliderPosition === i ?
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
                <img src={'../src/assets/arrow-left.svg'} alt="slider navigate arrow left " />
            </button>

            <div className='slider' style={{ transform: `translateX(calc(-100% * ${sliderPosition}))` }}>
                {
                    movies.map((movie, index) => <img key={index} src={movie.Poster} alt={`Poster for ${movie.Title}`} />
                    )
                }
            </div>

            <button
                onClick={changeRight}
                className='card-slider__navigation-btn card-slider__navigation-btn--right'
            >
                <img src={'../src/assets/arrow-right.svg'} alt="slider navigate arrow right" />
            </button>

            <section className='progress-bar'>
                {
                    progressBar.map((nob, index) => {
                        return nob ?
                            <p key={index} className='progress-bar__nob progress-bar__nob--active'></p> :
                            <p key={index} className='progress-bar__nob'></p>
                    })
                }
            </section>
        </section>
    )
}

export default MovieCardSlider
