import React from 'react';
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

const YearsFilter = ({
                         MIN_YEAR, MAX_YEAR,
                         handleYearSliderValueChange,
                         yearSliderValue
}) => {
  return (
    <div>
        {/*<Box sx={{ width: 150 }}>*/}
        {/*    <Slider*/}
        {/*        getAriaLabel={() => 'Years'}*/}
        {/*        value={yearSliderValue}*/}
        {/*        onChange={(event, newValue) =>*/}
        {/*            handleYearSliderValueChange(newValue)*/}
        {/*        }*/}
        {/*        valueLabelDisplay='auto'*/}
        {/*        min={MIN_YEAR}*/}
        {/*        max={MAX_YEAR}*/}
        {/*    />*/}
        {/*</Box>*/}
    </div>
  );
};

export default YearsFilter;
