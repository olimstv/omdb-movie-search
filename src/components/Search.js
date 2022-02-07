import { FaSearch } from 'react-icons/fa';
import YearsFilter from './YearsFilter';
import TypeFilter from './TypeFilter';

const focusSearchInput = () => {};

const Search = ({
  searchTerm,
  handleSearchTermChange,
  fromYear,
  MIN_YEAR,
  MAX_YEAR,
  handleFromYearChange,
  toYear,
  handleToYearChange,
  MOVIE_TYPE_TO_FILTER_VALUE,
  movieTypeIndex,
  movieType,
  handleMovieTypeChange,
  searchKeyPress
}) => {
  return (
    <div id='search'>
      <div id='search-box'>
        <label htmlFor='search'></label>
        <FaSearch className='search-icon' />
        <input
          type='text'
          placeholder='Search...'
          value={searchTerm}
          onChange={handleSearchTermChange}
          onKeyDown={e => searchKeyPress(e)}
        />
      </div>
      <div id='filter'>
        <YearsFilter
          MIN_YEAR={MIN_YEAR}
          MAX_YEAR={MAX_YEAR}
          fromYear={fromYear}
          toYear={toYear}
          handleFromYearChange={handleFromYearChange}
          handleToYearChange={handleToYearChange}
        />
        <TypeFilter
          MOVIE_TYPE_TO_FILTER_VALUE={MOVIE_TYPE_TO_FILTER_VALUE}
          movieTypeIndex={movieTypeIndex}
          handleMovieTypeChange={handleMovieTypeChange}
          movieType={movieType}
        />
      </div>
    </div>
  );
};

export default Search;
