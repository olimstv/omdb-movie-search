import Movies from './Movies';
import MovieDetails from './MovieDetails';

const Showcase = ({
  message,
  movies,
  handleMovieItemClick,
  selectedMovie,
  handleWatchlistBtnClick,
    bookmarkedMovies
}) => {
  // console.log(`showcase selectedMovie ${selectedMovie}`);
  // const selectedMovieID = selectedMovieData.imdbID;
  // console.log('Showcase movies:', movies.length===true)
  return (
    <div id='showcase'>
      {movies && (
        <Movies
          movies={movies}
          selectedMovie={selectedMovie}
          handleMovieItemClick={handleMovieItemClick}
          bookmarkedMovies = {bookmarkedMovies}
        />
      )}
      <MovieDetails
        selectedMovie={selectedMovie}
        message={message}
        handleWatchlistBtnClick={handleWatchlistBtnClick}
        bookmarkedMovies={bookmarkedMovies}
      />
    </div>
  );
};

export default Showcase;
