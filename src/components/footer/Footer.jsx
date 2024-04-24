import './footer.css'
import RecentlyViewed from './../recentlyViewed/RecentlyViewed';

function Footer({ recentlyViewed, handleRecentlyViewed }) {
    return (
        <footer className='footer'>
            <section className='footer__container'>
                <div className='footer__top-section'>
                    <h2 className='footer__title'>
                        Recently Viewed
                    </h2>
                    <button
                        className='footer__clear-btn'
                        onClick={() => handleRecentlyViewed('clear')}
                    >
                        Clear Recently Viewed
                    </button>
                </div>
                <RecentlyViewed recentlyViewed={recentlyViewed} handleRecentlyViewed={handleRecentlyViewed} />
            </section>
        </footer>
    )
}

export default Footer;