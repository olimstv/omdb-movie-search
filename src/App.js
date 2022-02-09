import './App.css';
import { useState, useEffect } from 'react';
import Search from './components/Search';
import { queryMovies } from './helpers/useMoviesQuery';
import _ from 'lodash';

// Constants
const CURRENT_YEAR = new Date().getFullYear();
const MIN_YEAR = 1824;
const MAX_YEAR = CURRENT_YEAR;
const DEFAULT_YEAR_RANGE_LENGTH = 10;
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
  const [fromYear, setFromYear] = useState(
    CURRENT_YEAR - DEFAULT_YEAR_RANGE_LENGTH
  );
  const [toYear, setToYear] = useState(CURRENT_YEAR);
  const [isPending, setIsPending] = useState(false);
  const [message, setMessage] = useState();
  // const [firstDataLoad, setFirstDataLoad] = useState();
  const [selectedMovie, setSelectedMovie] = useState();

  // ---
  const [movieQueryPromise, setMovieQueryPromise] = useState();
  const [movieQueryResult, setMovieQueryResult] = useState();
  // ---

  // Event Handlers
  const handleSearchTermChange = e => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
  };
  const handleFromYearChange = e => {
    setFromYear(e.target.value);
  };

  const handleToYearChange = e => {
    setToYear(e.target.value);
  };

  const handleMovieTypeChange = index => {
    setMovieTypeIndex(index);
  };

  const handleSearchEnterKeyPress = e => {
    let usableSearchTerm = searchTerm.trim();

    // Check if the Enter was pressed
    if (!enterKeyCheck(e)) {
      return;
    }
    // check the length of searchTerm
    if (usableSearchTerm.length < MIN_SEARCH_TERM_LENGTH) {
      setMovieQueryResult({});
      setMessage(
        `I'm too lazy to start searching only for ${usableSearchTerm.length} letters (word should be at least ${MIN_SEARCH_TERM_LENGTH} letters long)`
      );
      return;
    }
    queryMovies(searchTerm, fromYear, toYear, movieType, usableSearchTerm).then(
      data => {
        setMovieQueryResult(data);
      }
    );
    // console.log(newMovieQuery);
    // newMovieQuery.then(queryData => {
    //   setMovieQueryResult(queryData);
    // });
    // let usableSearchTerm = searchTerm.trim();
    // let apiUrl = apiUrlBuilder();
    // // Check if the Enter was pressed
    // if (!enterKeyCheck(e)) {
    //   return;
    // }
    // // check the length of searchTerm
    // if (usableSearchTerm.length < MIN_SEARCH_TERM_LENGTH) {
    //   setMovieQueryResult({});
    //   setMessage(
    //     `I'm too lazy to start searching only for ${usableSearchTerm.length} letters (word should be at least ${MIN_SEARCH_TERM_LENGTH} letters long)`
    //   );
    //   return;
    // }
    // // 1. Make a first fetch to get the totalResults number (if success)
    // if (movieType.filter === '') {
    //   apiUrl = `https://www.omdbapi.com/?s=${searchTerm}&apikey=81b34f15`;
    // } else {
    //   apiUrl = `https://www.omdbapi.com/?s=${searchTerm}&type=${movieType.filter}&apikey=81b34f15`;
    // }

    // fetch(apiUrl)
    //   .then(res => {
    //     return res.json();
    //   })
    //   .then(data => {
    //     setMovieQueryResult(data);
    //   });
    // 2. Get all movie objects
    // if (movieQueryResult.Error) {
    //   console.log('movieQueryResult', movieQueryResult);
    //   // error
    //   setMessage(movieQueryResult.Error);
    //   console.log('message', message);
    //   console.log('movieQueryResult.Error', movieQueryResult.Error);
    //   // filter results
    //   // let filteredMovies = movieQueryResult.Search.filter(movie => {

    //   // });

    //   console.log(movieQueryResult);
  };

  const enterKeyCheck = key => {
    return key.code === 'Enter';
  };

  return (
    <div>
      <Search
        searchTerm={searchTerm}
        handleSearchTermChange={handleSearchTermChange}
        MIN_YEAR={MIN_YEAR}
        MAX_YEAR={MAX_YEAR}
        fromYear={fromYear}
        toYear={toYear}
        handleFromYearChange={handleFromYearChange}
        handleToYearChange={handleToYearChange}
        MOVIE_TYPE_TO_FILTER_VALUE={MOVIE_TYPE_TO_FILTER_VALUE}
        movieTypeIndex={movieTypeIndex}
        movieType={movieType}
        handleMovieTypeChange={handleMovieTypeChange}
        searchKeyPress={handleSearchEnterKeyPress}
      />
      <p>{message}</p>
    </div>
  );
}

export default App;
