import { FaSearch } from 'react-icons/fa';

const Search = ({ searchTerm, handleSearchTermChange }) => {
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
      <div id='filter'></div>
    </div>
  );
};

export default Search;
