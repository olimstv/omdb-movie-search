import { FaSearch } from 'react-icons/fa';
import YearsFilter from './YearsFilter';
const Search = ({
  searchTerm,
  handleSearchTermChange,
  fromYear,
  MIN_YEAR,
  MAX_YEAR,
  handleFromYearChange,
  toYear,
  handleToYearChange
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
      </div>
    </div>
  );
};

export default Search;
