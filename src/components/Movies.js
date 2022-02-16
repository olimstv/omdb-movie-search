import Movie from './Movie.js';
import { Link} from 'react-router-dom'
import { MAX_MOVIES_TO_SHOW } from '../helpers/useMoviesQuery';
import { MdBookmarkBorder } from 'react-icons/md';
import { MdOutlineHome } from 'react-icons/md';

export const PAGE_MODE_HOME = 'home';
export const PAGE_MODE_WATCHLIST = 'watchlist';

const Movies = ({ movies, handleMovieItemClick, selectedMovie, bookmarkedMovies, pageMode }) => {

    const counterStr =
    movies.length < MAX_MOVIES_TO_SHOW
      ? `${movies.length} results`
      : `${MAX_MOVIES_TO_SHOW}+ results`;
//    ------- w/o restrictions (MAX_MOVIES_TO_SHOW)
// `${movies.length} ${movies.length === 1
//     ?`result`
//     :`results`}`
    const showNavigationBtn = pageMode === PAGE_MODE_WATCHLIST || bookmarkedMovies.length!==0;
    let btnDOM;
    switch (pageMode) {
        case PAGE_MODE_WATCHLIST:
            btnDOM = <>
                <MdOutlineHome className='btn-icon' size='1.5rem' color='#ffa200'/>
                <Link to='/'>
                    Back to Home
                </Link>
            </>;
            break;
        case PAGE_MODE_HOME:
            btnDOM = <>
                <MdBookmarkBorder className='btn-icon' size='1.5rem' color='#ffa200'/>
                <Link to='/watchlist'>

                    Watchlist
                </Link>
            </>;
            break;
        default:
            throw new Error(`Unknown page mode = "${pageMode}".`);
    }

  return (
    <div id='movies-container'>
        {
            showNavigationBtn &&
            <button className='bookmarked-movies'>
                {btnDOM}
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
