import { useEffect, useState } from 'react';
import './trailerCarousel.css'

const moveLeft = (movieOrder, setMovieOrder) => {
    const order = [...movieOrder]
    const newMovieOrder = []
    const move = order.pop()
    newMovieOrder.push(move)
    newMovieOrder.push(...order)
    setMovieOrder(newMovieOrder)
}

const moveRight = (movieOrder, setMovieOrder) => {
    const order = [...movieOrder]
    const newMovieOrder = []
    const move = order.shift()
    newMovieOrder.push(...order)
    newMovieOrder.push(move)
    setMovieOrder(newMovieOrder)
}

function TrailerCarousel({ movies }) {

    const [movieOrder, setMovieOrder] = useState([])

    useEffect(() => {
        setMovieOrder([...movies])
    }, [movies])

    return (
        <section className='trailer-carousel'>
            <div className='trailer-carousel__fade-left'>
                <button
                    className='trailer-carousel__navigation-btn'
                    onClick={() => moveLeft(movieOrder, setMovieOrder)}>
                    <img src="../src/assets/chevronLeft.svg" alt="trailer carousel navigate arrow left " />
                </button>
            </div>
            {
                movieOrder.map((movie, index) => {
                    if (movie) {
                        return <iframe src={movie.trailer_link} title={`trailer for ${movie.title}`} key={movie.title} className={`trailer-carousel__item-${index + 1}`}></iframe>
                    }

                })
            }
            <div className='trailer-carousel__fade-right'>
                <button
                    className='trailer-carousel__navigation-btn'
                    onClick={() => moveRight(movieOrder, setMovieOrder)}>
                    <img src="../src/assets/chevronRight.svg" alt="trailer carousel navigate arrow right" />
                </button>
            </div>
        </section>
    )
}

export default TrailerCarousel
