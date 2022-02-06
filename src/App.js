import './App.css';
import './App.css';
import { useState } from 'react';
import Search from './components/Search';

// Constants
const CURRENT_YEAR = new Date().getFullYear();
const MIN_YEAR = 1824;
const MAX_YEAR = CURRENT_YEAR;
const DEFAULT_YEAR_RANGE_LENGTH = 10;
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
        handleMovieTypeChange={handleMovieTypeChange}
      />
    </div>
  );
}

export default App;
