import React from 'react';

const YearsFilter = ({
  fromYear,
  MIN_YEAR,
  MAX_YEAR,
  handleFromYearChange,
  toYear,
  handleToYearChange
}) => {
  return (
    <div>
      <div>
        <label htmlFor='fromYear'> {fromYear}</label>
        <input
          type='range'
          min={MIN_YEAR}
          max={MAX_YEAR}
          step={1}
          value={fromYear}
          id={fromYear}
          onChange={handleFromYearChange}
        />
      </div>
      <div>
        <input
          type='range'
          min={MIN_YEAR}
          max={MAX_YEAR}
          step={1}
          value={toYear}
          id={toYear}
          onChange={handleToYearChange}
        />
        <label htmlFor='toYear'> {toYear}</label>
      </div>
    </div>
  );
};

export default YearsFilter;
