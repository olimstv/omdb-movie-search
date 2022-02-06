import React from 'react';

const TypeFilter = ({
  MOVIE_TYPE_TO_FILTER_VALUE,
  movieTypeIndex,
  handleMovieTypeChange
}) => {
  return (
    <div>
      {MOVIE_TYPE_TO_FILTER_VALUE.map(({ title, filter }, index) => {
        return (
          <label key={filter}>
            <input
              type='radio'
              value={filter}
              checked={movieTypeIndex === index}
              onChange={handleMovieTypeChange.bind(null, index)}
            />{' '}
            {title}
          </label>
        );
      })}
    </div>
  );
};

export default TypeFilter;
