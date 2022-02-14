import Movie from './Movie.js';
import { MAX_MOVIES_TO_SHOW } from '../helpers/useMoviesQuery';
import { MdBookmarkBorder } from 'react-icons/md';
const Movies = ({ movies, handleMovieItemClick, selectedMovie, bookmarkedMovies }) => {
  const counterStr =
    movies.length < MAX_MOVIES_TO_SHOW
      ? `${movies.length} results`
      : `${MAX_MOVIES_TO_SHOW}+ results`;



  return (
    <div id='movies-container'>

        {bookmarkedMovies.length!==0 &&
            <div className='bookmarked-movies'>
                    <MdBookmarkBorder size='1.5rem' color='#ffa200' />
                <a href={'#'}>
                    Watchlist</a>
            </div>}

      <div className='results-count'>
        <p>{counterStr}</p>
      </div>
        {movies.map((movie) => {
            let selected = false
            if(selectedMovie!== undefined) {
                selected = selectedMovie.imdbID === movie.imdbID
            }
            return (<Movie
                    selected={selected}
                    movie={movie}
                    handleMovieItemClick={handleMovieItemClick}
                    selectedMovie={selectedMovie}
                    key={movie.imdbID} />
            )})

        }
    </div>
  );
};

export default Movies;
