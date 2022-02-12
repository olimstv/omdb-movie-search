import './App.css';
import { useState, useEffect } from 'react';
import { queryMovies, selectedMovieDataFetch } from './helpers/useMoviesQuery';
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
  // ---
  const [movieQueryMeta, setMovieQueryMeta] = useState();
  const [movieQueryResult, setMovieQueryResult] = useState([]);
  // ---

  let fromYear, toYear;
  if (yearSliderValue[0] < yearSliderValue[1]) {
    fromYear = yearSliderValue[0];
    toYear = yearSliderValue[1];
  } else {
    fromYear = yearSliderValue[1];
    toYear = yearSliderValue[0];
  }
  // console.log(`From ${fromYear} to ${toYear}.`);

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

    // Check if Enter key was pressed
    if (!enterKeyCheck(e)) {
      return;
    }
    setSelectedMovie(undefined);
    // check the length of searchTerm
    if (usableSearchTerm.length < MIN_SEARCH_TERM_LENGTH) {
      setMessage(`Please, enter not less than 3 characters`);
      // setMovieQueryResult({});

      return;
    }
    // setMessage();

    const newQueryMeta = queryMovies(
      fromYear,
      toYear,
      movieType,
      usableSearchTerm
    );

    newQueryMeta.promise
      .then(data => {
        if (data[0].Response) {
          setMessage(data[0].Error);
        } else {
          setMessage('Please, select the movie to see the details');
          setMovieQueryResult(data);
        }
      })
      .catch(errorMessage => {
        setMessage(errorMessage);
      });

    setMovieQueryMeta(oldQueryMeta => {
      if (oldQueryMeta && oldQueryMeta.cancelPromise) {
        oldQueryMeta.cancelPromise();
      }
      return newQueryMeta;
    });
  };

  const handleMovieItemClick = async movieId => {
    // console.log(`movieId: ${movieId}`)

    if (selectedMovie === undefined || selectedMovie.imdbID !== movieId) {
      // console.log('selectedMovie.imdbId: ',selectedMovie.imdbID)
      // console.log('movieId: ',movieId)
      let data;
      data = await selectedMovieDataFetch(movieId);
      // console.log(data)
      setSelectedMovie(data);
    } else {
      return;
    }
    return;
  };

  const enterKeyCheck = key => {
    return key.code === 'Enter';
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
      />
    </div>
  );
}

export default App;
