import { Link } from 'react-router-dom';
import './recentlyViewed.css'

function RecentlyViewed({ recentlyViewed, handleRecentlyViewed }) {
    return (
        <section className='footer__grid-section'>
            {
                recentlyViewed.map(movie => {
                    return (
                        <Link
                            to={`/singlemovie/${movie.imdbID}`}
                            key={movie.imdbID}
                            className='footer__link-item'
                        >
                            <img
                                onClick={handleRecentlyViewed}
                                className='footer__recently-img'
                                src={movie.Poster}
                                alt={`Poster for ${movie.Title}`}
                            />
                        </Link>
                    )
                })
            }
        </section>
    )
}

export default RecentlyViewed;