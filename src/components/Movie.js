const Movie = ({ movie, handleMovieItemClick }) => {
  // console.log(`movie: ${movie}`);
  return (
    <div className={'movie-item'} onClick={()=>{handleMovieItemClick(movie.imdbID)}}>
      {movie && (
        <div className='movie'>
          {movie.Poster !== 'N/A' ? (
            <img src={movie.Poster} alt={movie.Title} />
          ) : (
            <>{movie.Poster}</>
          )}
          <div>
            <p>{movie.Title}</p>
            <span>{movie.Year}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Movie;
