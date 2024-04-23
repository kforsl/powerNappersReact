import { useEffect, useState } from 'react';
import './trailerCarousel.css'


const moveLeft = (trailers, trailerArray, setTrailerArray) => {
    const newTrailerArray = trailerArray
    newTrailerArray.push(newTrailerArray.shift())
    trailers.forEach(item => {
        item.classList.remove(
            'trailer-carousel__item-1',
            'trailer-carousel__item-2',
            'trailer-carousel__item-3',
            'trailer-carousel__item-4',
            'trailer-carousel__item-5'
        )
    })


    newTrailerArray.map((item, index) => {
        item.classList.add(`trailer-carousel__item-${index + 1}`)
    })
    setTrailerArray(newTrailerArray)
}


const moveRight = (trailers, trailerArray, setTrailerArray) => {
    const newTrailerArray = trailerArray
    newTrailerArray.unshift(newTrailerArray.pop())
    trailers.forEach(item => {
        item.classList.remove(
            'trailer-carousel__item-1',
            'trailer-carousel__item-2',
            'trailer-carousel__item-3',
            'trailer-carousel__item-4',
            'trailer-carousel__item-5'
        )
    })


    newTrailerArray.map((item, index) => {
        item.classList.add(`trailer-carousel__item-${index + 1}`)
    })


    console.log(...newTrailerArray);
    setTrailerArray(newTrailerArray)
}


function TrailerCarousel({ movies }) {


    const [movieOrder, setMovieOrder] = useState([])
    const [trailers, setTrailers] = useState([])
    const [trailerArray, setTrailerArray] = useState([])


    useEffect(() => {
        setMovieOrder([...movies])
    }, [movies])


    useEffect(() => {
        setTrailers([...document.querySelectorAll('.trailers-carousel__item')])
    }, [movieOrder])


    useEffect(() => {
        setTrailerArray(Array.from(trailers));
    }, [trailers])


    return (
        <section className='trailer-carousel'>
            <div className='trailer-carousel__fade-left'>
                <button
                    className='trailer-carousel__navigation-btn'
                    onClick={() => moveLeft(trailers, trailerArray, setTrailerArray)}>
                    <img src="../src/assets/chevronLeft.svg" alt="trailer carousel navigate arrow left " />
                </button>
            </div>
            {
                movieOrder.map((movie, index) => {
                    if (movie) {
                        return <iframe src={movie.trailer_link} title={`trailer for ${movie.title}`} key={movie.title} className={`trailers-carousel__item trailer-carousel__item-${index + 1}`}></iframe>
                    }


                })
            }
            <div className='trailer-carousel__fade-right'>
                <button
                    className='trailer-carousel__navigation-btn'
                    onClick={() => moveRight(trailers, trailerArray, setTrailerArray)}>
                    <img src="../src/assets/chevronRight.svg" alt="trailer carousel navigate arrow right" />
                </button>
            </div>
        </section>
    )
}


export default TrailerCarousel

