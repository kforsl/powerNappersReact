import { useEffect, useState } from 'react';
import './trailerCarousel.css'

const moveTrailers = (trailerNode, trailerArray, setTrailerArray, direction) => {
    const newTrailerArray = trailerArray // sparar trailerArray för att kunna modifiera array
    if (direction === 'left') {
        newTrailerArray.push(newTrailerArray.shift()) // Flyttar första objektet i arrayen till sista positionen
    } else {
        newTrailerArray.unshift(newTrailerArray.pop()) // Flyttar sista objektet i arrayen till första positionen
    }
    trailerNode.forEach(item => { // Tar bort klassen trailer-carousel__item-# från alla trailers 
        item.classList.remove(
            'trailer-carousel__item-1',
            'trailer-carousel__item-2',
            'trailer-carousel__item-3',
            'trailer-carousel__item-4',
            'trailer-carousel__item-5'
        )
    })
    // går igenom alla object i arrayen och sätter ny klass baserad på position i array 
    newTrailerArray.map((item, index) => {
        item.classList.add(`trailer-carousel__item-${index + 1}`)
    })
    setTrailerArray(newTrailerArray) // sparar omgjord array för att ändra klasser i DOM 
}

function TrailerCarousel({ movies }) {

    const [trailerNode, setTrailerNode] = useState([]) // Här sparas nodelist med de trailers som visas på skärmen 
    const [trailerArray, setTrailerArray] = useState([]) // Här sparas en array av trailerNode

    useEffect(() => {
        setTrailerNode([...document.querySelectorAll('.trailers-carousel__item')]) // Sparar nodelist från DOM i trailerNode
    }, [movies])

    useEffect(() => {
        setTrailerArray(Array.from(trailerNode)); // Gör om nodelist till array och sparar i trailerArray
        console.log(trailerNode);
    }, [trailerNode])

    return (
        <section className='trailer-carousel'>
            <div className='trailer-carousel__fade-left'>
                <button
                    className='trailer-carousel__navigation-btn'
                    onClick={() => moveTrailers(trailerNode, trailerArray, setTrailerArray, 'left')}>
                    <img
                        src="../src/assets/chevronLeft.svg"
                        alt="trailer carousel navigate arrow left "
                    />
                </button>
            </div>
            {
                movies.map((movie, index) => {
                    if (movie) {
                        return <iframe
                            src={movie.trailer_link}
                            title={`trailer for ${movie.title}`}
                            key={movie.title}
                            className={`trailers-carousel__item trailer-carousel__item-${index + 1}`}
                        ></iframe>
                    }
                })
            }
            <div className='trailer-carousel__fade-right'>
                <button
                    className='trailer-carousel__navigation-btn'
                    onClick={() => moveTrailers(trailerNode, trailerArray, setTrailerArray, 'right')}>
                    <img
                        src="../src/assets/chevronRight.svg"
                        alt="trailer carousel navigate arrow right"
                    />
                </button>
            </div>
        </section>
    )
}

export default TrailerCarousel