import './App.css';
import { useState, useEffect } from 'react';
import { queryMovies, selectedMovieDataFetch } from './helpers/useMoviesQuery';
import Search from './components/Search';
import Showcase from './components/Showcase';

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
  const [yearSliderValue, setYearSliderValue] = useState([
    CURRENT_YEAR - DEFAULT_YEAR_RANGE_LENGTH,
    CURRENT_YEAR
  ]);
  const [isPending, setIsPending] = useState(false);
  const [message, setMessage] = useState();
  const [selectedMovie, setSelectedMovie] = useState();
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
  console.log(`From ${fromYear} to ${toYear}.`);



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
    // check the length of searchTerm
    if (usableSearchTerm.length < MIN_SEARCH_TERM_LENGTH) {
      setMessage(
        `I'm too lazy to start searching only for ${usableSearchTerm.length} letters (word should be at least ${MIN_SEARCH_TERM_LENGTH} letters long)`
      );
      setMovieQueryResult({});
      return;
    }
    setMessage();

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

  const handleMovieItemClick= async (movieId)=>{
    const data = await selectedMovieDataFetch(movieId)
    // console.log(data)
    setSelectedMovie(data)
    // console.log(`selectedMovie`, selectedMovie)
  }

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
        yearSliderValue={yearSliderValue}
        handleYearSliderValueChange={handleYearSliderValueChange}
        MOVIE_TYPE_TO_FILTER_VALUE={MOVIE_TYPE_TO_FILTER_VALUE}
        movieTypeIndex={movieTypeIndex}
        movieType={movieType}
        handleMovieTypeChange={handleMovieTypeChange}
        searchKeyPress={handleSearchEnterKeyPress}
      />
      {/* <p>{message}</p> */}
      <Showcase movies={movieQueryResult} handleMovieItemClick={handleMovieItemClick} selectedMovieData={selectedMovie} />
    </div>
  );
}

export default App;
