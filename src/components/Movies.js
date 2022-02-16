import Movie from './Movie.js';
import { Link, useLocation} from 'react-router-dom'
import { MAX_MOVIES_TO_SHOW } from '../helpers/useMoviesQuery';
import { MdBookmarkBorder } from 'react-icons/md';
import { MdOutlineHome } from 'react-icons/md';
const Movies = ({ movies, handleMovieItemClick, selectedMovie, bookmarkedMovies }) => {
  const counterStr =
    movies.length < MAX_MOVIES_TO_SHOW
      ? `${movies.length} results`
      : `${MAX_MOVIES_TO_SHOW}+ results`;

const currentUrl = useLocation().pathname;

    const backToHomeBtn = (
        <>
        <MdOutlineHome className='btn-icon' size='1.5rem' color='#ffa200'/>
        <Link to='/'>
            Back to Home
        </Link></>)
    const watchListBtn = (<>
            <MdBookmarkBorder className='btn-icon' size='1.5rem' color='#ffa200'/>
        <Link to='/watchlist'>

                Watchlist
        </Link></>)

  return (
    <div id='movies-container'>
        {bookmarkedMovies.length!==0 &&
            <button className='bookmarked-movies'>
                {currentUrl==='/'
                    ? watchListBtn
                    : backToHomeBtn}
            </button>
    }


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
