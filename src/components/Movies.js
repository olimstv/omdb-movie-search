import Movie from './Movie.js';
import { MAX_MOVIES_TO_SHOW } from '../helpers/useMoviesQuery';
const Movies = ({ movies, handleMovieItemClick }) => {
  // console.log('movies:', movies);
  const counterStr =
    movies.length < MAX_MOVIES_TO_SHOW
      ? `${movies.length} results`
      : `${MAX_MOVIES_TO_SHOW}+ results`;
  return (
    <div id='movies-container'>
      <div className='results-count'>
        <p>{counterStr}</p>
      </div>
        {movies.map((movie) => (
        <Movie movie={movie} handleMovieItemClick={handleMovieItemClick} key={movie.imdbID} />
      ))}
    </div>
  );
};

export default Movies;
