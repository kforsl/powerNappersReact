import './movieListGrid.css'

function MovieListGrid({ movies }) {
    return (
        <div>{
            movies.map((movie, index) => {
                return <h6 key={movie.title} index={index + 1}>{movie.title}</h6>
            })
        }</div>
    )
}

export default MovieListGrid;