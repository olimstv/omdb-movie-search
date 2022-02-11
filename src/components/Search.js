import { FaSearch } from 'react-icons/fa';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

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

          {/*Years Filter*/}
          <div className="years-filter">
            <span>{yearSliderValue[0]}</span>
            <Box sx={{width: 150}}>
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

          {/* Type Filter */}

          <FormControl>
            <FormLabel id="">Type</FormLabel>
            <RadioGroup row>
              {MOVIE_TYPE_TO_FILTER_VALUE.map(({title, filter}, index)=>{
                return (
                    <FormControlLabel
                        key={filter}
                        value={filter}
                        checked={movieTypeIndex === index}
                        control={<Radio size='small' />}
                        onChange={handleMovieTypeChange.bind(null, index)}
                        label={title}
                    />
                )
              })}
            </RadioGroup>
          </FormControl>

        </div>
      </div>
  );

};

export default Search;
