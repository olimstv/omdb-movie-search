import './App.css';
import './App.css';
import { useState, useEffect } from 'react';
import Search from './components/Search';

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
  const [firstDataLoad, setFirstDataLoad] = useState();
  const [selectedMovie, setSelectedMovie] = useState();
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

  const handleSearchKeyPress = e => {
    let apiUrl;
    let usableSearchTerm = searchTerm.trim();
    // on pressing enter key in the search box
    if (e.code === 'Enter') {
      // check the length of searchTerm
      if (usableSearchTerm.length < MIN_SEARCH_TERM_LENGTH) {
        setMessage(
          `I'm too lazy to start searching only for ${usableSearchTerm.length} letters (word should be at least ${MIN_SEARCH_TERM_LENGTH} letters long)`
        );
      }
      // make a first fetch to get the totalResults number (if success)
      if (movieType.filter === '') {
        apiUrl = `https://www.omdbapi.com/?s=${searchTerm}&apikey=81b34f15`;
      } else {
        apiUrl = `https://www.omdbapi.com/?s=${searchTerm}&type=${movieType.filter}&apikey=81b34f15`;
      }
      fetch(apiUrl)
        .then(res => {
          return res.json();
        })
        .then(data => {
          setFirstDataLoad(data);
        });
    }
    console.log('firstDataLoad:', firstDataLoad);
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
        searchKeyPress={handleSearchKeyPress}
      />
      <p>{message}</p>
    </div>
  );
}

export default App;
