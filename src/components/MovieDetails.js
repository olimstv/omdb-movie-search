import { MdBookmarkBorder } from 'react-icons/md';
import { MdBookmark } from 'react-icons/md';


const MovieDetails = ({ message, selectedMovie, handleWatchlistBtnClick, bookmarkedMovies }) => {
  let isBookmarked = false;
  if(bookmarkedMovies.length !== 0 && selectedMovie !== undefined){
  isBookmarked = bookmarkedMovies.some((movie)=>movie.imdbID === selectedMovie.imdbID)
  }
  return (
    <div id='selected-movie'>
      {!selectedMovie ? (
        <span className='message'>{message}</span>
      ) : (
        <>
          <div className='movie-title'>
            <img src={selectedMovie.Poster} alt='' />
            <div className='watchlist-btn'>
              <button
                  // isBookmarked = {isBookmarked}
                className='btn-outline'
                onClick={e => handleWatchlistBtnClick(e)}
              >
                {isBookmarked
                    ?<MdBookmark size='1.5rem' color='#ffa200' />
                    :<MdBookmarkBorder size='1.5rem' />}
                Watchlist
              </button>
            </div>

            <div className='movie-details'>
              <h2 className='title-text'>{selectedMovie.Title}</h2>
              <div className='tag'>{selectedMovie.Rated}</div>
              <p>
                {selectedMovie.Year} &#183; {selectedMovie.Genre} &#183;{' '}
                {selectedMovie.Runtime}
              </p>
            </div>
            <div className='movie-staff'>
              <p>{selectedMovie.Actors}</p>
            </div>
          </div>
          <div className='movie-plot'>
            <div className='movie-plot'>
              <p>{selectedMovie.Plot}</p>
            </div>
          </div>
          <div className='movie-ratings'>
            {selectedMovie.Ratings.map((rating, i) => {
              return (
                <div className='rating-box' key={i}>
                  <h4>{rating.Value}</h4>
                  <span>{rating.Source}</span>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default MovieDetails;
