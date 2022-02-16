import Movies, {PAGE_MODE_HOME} from './Movies';
import MovieDetails from './MovieDetails';


const Showcase = ({
  message,
  movies,
  handleMovieItemClick,
  selectedMovie,
  handleWatchlistBtnClick,
    bookmarkedMovies
}) => {
  return (
    <div id='showcase'>
      {movies && (
        <Movies
          movies={movies}
          selectedMovie={selectedMovie}
          handleMovieItemClick={handleMovieItemClick}
          bookmarkedMovies = {bookmarkedMovies}
          pageMode={PAGE_MODE_HOME}
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
