import Movies from './Movies';
import MovieDetails from './MovieDetails';

const Showcase = ({ movies, handleMovieItemClick, selectedMovieData }) => {
  // console.log('movies Showcase:', movies);
  // console.log('movies Showcase qty:', movies.length);
  return (
    <div id='showcase'>
      {movies && <Movies movies={movies} handleMovieItemClick={handleMovieItemClick}/>}
      <MovieDetails selectedMovieData={selectedMovieData}/>
    </div>
  );
};

export default Showcase;
