import { FaSearch } from 'react-icons/fa';
import YearsFilter from './YearsFilter';
import TypeFilter from './TypeFilter';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

const Search = ({
  searchTerm,
  handleSearchTermChange,
  MIN_YEAR,
  MAX_YEAR,
  yearSliderValue,
  handleYearSliderValueChange,
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
          <FaSearch className='search-icon'/>
          <input
              type='text'
              placeholder='Search...'
              value={searchTerm}
              onChange={handleSearchTermChange}
              onKeyDown={e => searchKeyPress(e)}
          />
        </div>
        <div id='filter'>
          <div className="years-filter">
            <span>{yearSliderValue[0]}</span>
            <Box sx={{width: 200}}>
              <Slider
                  getAriaLabel={() => 'Years'}
                  value={yearSliderValue}
                  onChange={(event, newValue) =>
                      handleYearSliderValueChange(newValue)
                  }
                  valueLabelDisplay='off'
                  size='medium'
                  min={MIN_YEAR}
                  max={MAX_YEAR}
              />
            </Box>
            <span>{yearSliderValue[1]}</span>

          </div>

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
