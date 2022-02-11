import Movies from './Movies';
import MovieDetails from './MovieDetails';

const Showcase = ({ message ,movies, handleMovieItemClick, selectedMovieData }) => {
    // console.log('Showcase msg:', message)
  return (
    <div id='showcase'>
      {movies && <Movies movies={movies} handleMovieItemClick={handleMovieItemClick}/>}
         <MovieDetails selectedMovie={selectedMovieData} message={message}/>
    </div>
  );
};

export default Showcase;
