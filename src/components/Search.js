import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import SearchIcon from '@mui/icons-material/Search'
import {styled} from "@mui/material/styles";



const StyledSlider = styled(Slider)(({theme})=>({
  color: '#dfdfdf',
  '& .MuiSlider-thumb': {
    '&:hover': {
      boxShadow: '0px 0px 0px 8px rgba(253, 253, 253, 0.03)'
    }
  }
}))
// css changed in a bit of 'hacky'
// way didn't have much time to fully explore Material Ui design system
const StyledRadio = styled(Radio)(({theme})=>({
  color: '#fff',
  '& .PrivateSwitchBase-input:hover':{
    color: '#fff',
  },
  '& .css-1m9pwf3:hover':{
    color: '#fff',
  },
  '& .css-vqmohf-MuiButtonBase-root-MuiRadio-root': {
    '&:hover': {
      backgroundColor: 'none'
    }
  }
}))

const Search = ({searchTerm,
                handleSearchTermChange,
                MIN_YEAR,
                MAX_YEAR,
                yearSliderValue,
                handleYearSliderValueChange,
                MOVIE_TYPE_TO_FILTER_VALUE,
                movieTypeIndex,
                handleMovieTypeChange,
                searchKeyPress,
}) => {
  return (
      //input box
      <div id='search'>
        <div id='search-box'>
          <label htmlFor='search'></label>
          <SearchIcon fontSize='large'/>
          <input
              type='text'
              placeholder='Search...'
              value={searchTerm}
              onChange={handleSearchTermChange}
              onKeyDown={e => searchKeyPress(e)}
          />
        </div>

        {/*Filters*/}
        <div id='filter'>
          {/*Years Filter*/}
          <div id="years-filter">
            <Box sx={{textTransform: 'uppercase'}} id="">Year</Box>
            <div className='year-slider'>
            <span>{yearSliderValue[0]}</span>
            <Box sx={{width: 150, margin:'auto 15px'}}>
              <StyledSlider

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
          </div>

          {/* Type Filter */}
          <div id="types-filter">
            <Box sx={{textTransform: 'uppercase'}} id="">Type</Box>
            <RadioGroup row>
              {MOVIE_TYPE_TO_FILTER_VALUE.map(({title, filter}, index)=>{
                return (
                    <FormControlLabel
                        key={filter}
                        value={filter}
                        checked={movieTypeIndex === index}
                        control={<StyledRadio size='medium' />}
                        onChange={handleMovieTypeChange.bind(null, index)}
                        label={title}
                    />
                )
              })}
            </RadioGroup>

          </div>
        </div>
      </div>
  );

};

export default Search;
