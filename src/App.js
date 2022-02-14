import './App.css';
import { useState, useEffect } from 'react';
import { queryMovies, selectedMovieDataFetch, enterKeyCheck } from './helpers/useMoviesQuery';
import Search from './components/Search';
import Showcase from './components/Showcase';

// Constants
const CURRENT_YEAR = new Date().getFullYear();
const MIN_YEAR = 1824;
const MAX_YEAR = CURRENT_YEAR;
const MIN_SEARCH_TERM_LENGTH = 3;
const MOVIE_TYPE_TO_FILTER_VALUE = [
  { title: 'Any', filter: '' },
  { title: 'Movies', filter: 'movie' },
  { title: 'Series', filter: 'series' },
  { title: 'Episodes', filter: 'episode' }
];

function App() {
  // States
  const [movieTypeIndex, setMovieTypeIndex] = useState(0);
  const movieType = MOVIE_TYPE_TO_FILTER_VALUE[movieTypeIndex];
  const [searchTerm, setSearchTerm] = useState('');
  const [yearSliderValue, setYearSliderValue] = useState([
    MIN_YEAR,
    CURRENT_YEAR
  ]);
  const [message, setMessage] = useState('Please, make a search');
  const [selectedMovie, setSelectedMovie] = useState(undefined);
  const [movieQueryMeta, setMovieQueryMeta] = useState();
  const [movieQueryResult, setMovieQueryResult] = useState([]);
  const [bookmarkedMovies, setBookmarkedMovies] = useState([]);


  // Event Handlers
  const handleSearchTermChange = e => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
  };
  const handleYearSliderValueChange = newYearsArray => {
    setYearSliderValue(newYearsArray);
  };

  const handleMovieTypeChange = index => {
    setMovieTypeIndex(index);
  };

  const handleSearchEnterKeyPress = e => {
    let usableSearchTerm = searchTerm.trim();

    // Check if 'Enter' key was pressed
    if (!enterKeyCheck(e)) {
      return;
    }
    setSelectedMovie(undefined);
    // check the length of searchTerm
    if (usableSearchTerm.length < MIN_SEARCH_TERM_LENGTH) {
      //
      setMessage(`Please, enter not less than 3 characters`);

      return;
    }

    // assigning values from the years filter state to variables
    // to use them as the parameters in the queryMovies() fn
    let fromYear, toYear;
    if (yearSliderValue[0] < yearSliderValue[1]) {
      fromYear = yearSliderValue[0];
      toYear = yearSliderValue[1];
    } else {
      fromYear = yearSliderValue[1];
      toYear = yearSliderValue[0];
    }
    // assigning the results [promise] of function call to a variable
    const newQueryMeta = queryMovies(
      fromYear,
      toYear,
      movieType,
      usableSearchTerm
    );

    newQueryMeta.promise
      .then(data => {
        if (data[0].Response) {
          // error? => put error message to the state
          setMessage(data[0].Error);
        } else {
          // prompt user to select the movie from the left-hand sidebar
          setMessage('Please, select the movie to see the details');
          // update the state
          setMovieQueryResult(data);
        }
      })
      .catch(errorMessage => {
        // put the error message from promise (reject) to the state
        setMessage(errorMessage);
      });
    // storing the metadata of the query in the state
    setMovieQueryMeta(oldQueryMeta => {
      // if user hits enter 2nd time before initial fetch finished, cancel the process of fetching
      if (oldQueryMeta && oldQueryMeta.cancelPromise) {
        oldQueryMeta.cancelPromise();
      }
      return newQueryMeta;
    });
  };

  const handleMovieItemClick = async movieId => {
  // initial state
  if (selectedMovie === undefined || selectedMovie.imdbID !== movieId) {
    let data;
    // fetching full date of the selected movie
    data = await selectedMovieDataFetch(movieId);
    // updating the state
    setSelectedMovie(data);
  }
    return;
  };

  const handleWatchlistBtnClick = e => {
    const movieToBookmark = selectedMovie;
    let newBookmarkedMoviesArray = []
    //  is anything bookmarked yet?
    if(bookmarkedMovies.length === 0) {
      // false? => 1) add selected movie to the array
      newBookmarkedMoviesArray.push(movieToBookmark)
       // 2) pass the new list of bookmarked movies to the state
       setBookmarkedMovies(newBookmarkedMoviesArray)
    } else {
      // is this movie already in the list?
      const isAlreadyBookmarked = bookmarkedMovies.some(movie=> movie.imdbID === movieToBookmark.imdbID)
      if(isAlreadyBookmarked) {
        //true? => 1) take out it from the list
        newBookmarkedMoviesArray=bookmarkedMovies.filter(movie=>movie.imdbID !== movieToBookmark.imdbID);
        // 2) pass the new list of bookmarked movies to the state
        setBookmarkedMovies(newBookmarkedMoviesArray);
      } else {
        //false? => update the state adding selected movie
        setBookmarkedMovies([...bookmarkedMovies, movieToBookmark])
      }
    }
    return;
  };


  // console.log('app msg: ', message)
  return (
    <div id='app'>
      <Search
        searchTerm={searchTerm}
        handleSearchTermChange={handleSearchTermChange}
        MIN_YEAR={MIN_YEAR}
        MAX_YEAR={MAX_YEAR}
        yearSliderValue={yearSliderValue}
        handleYearSliderValueChange={handleYearSliderValueChange}
        MOVIE_TYPE_TO_FILTER_VALUE={MOVIE_TYPE_TO_FILTER_VALUE}
        movieTypeIndex={movieTypeIndex}
        movieType={movieType}
        handleMovieTypeChange={handleMovieTypeChange}
        searchKeyPress={handleSearchEnterKeyPress}

      />
      {/* <p>{message}</p> */}
      <Showcase
        message={message}
        movies={movieQueryResult}
        handleMovieItemClick={handleMovieItemClick}
        selectedMovie={selectedMovie}
        handleWatchlistBtnClick={handleWatchlistBtnClick}
        bookmarkedMovies={bookmarkedMovies}
      />
    </div>
  );
}

export default App;
