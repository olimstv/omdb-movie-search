import Movie from './Movie.js';
import { MAX_MOVIES_TO_SHOW } from '../helpers/useMoviesQuery';
const Movies = ({ movies, handleMovieItemClick, selectedMovie }) => {
  console.log('movies selectedMovie:', selectedMovie);
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
        <Movie
            // selected={movie.imdbID===selectedMovie.imdbID}
            movie={movie}
            handleMovieItemClick={handleMovieItemClick}
            selectedMovie={selectedMovie}
            key={movie.imdbID} />
      ))}
    </div>
  );
};

export default Movies;
