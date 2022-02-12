import Movies from './Movies';
import MovieDetails from './MovieDetails';

const Showcase = ({ message, movies, handleMovieItemClick, selectedMovie }) => {
    console.log(`showcase selectedMovie ${selectedMovie}`)
    // const selectedMovieID = selectedMovieData.imdbID;
    // console.log('Showcase movies:', movies.length===true)
  return (
    <div id='showcase'>
      {movies && <Movies
          movies={movies}
          selectedMovie={selectedMovie}
          handleMovieItemClick={handleMovieItemClick}/>}
     <MovieDetails
         selectedMovie={selectedMovie}
         message={message}/>
    </div>
  );
};

export default Showcase;
