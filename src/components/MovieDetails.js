import React from 'react';

const MovieDetails = ({selectedMovieData}) => {
  // const {Title, Year, Rated, Genre} = selectedMovieData;

  return <>
          {selectedMovieData && (<div>
        <p>{selectedMovieData.Title}</p>
        <p>{selectedMovieData.Year}</p>
        <p>{selectedMovieData.Rated}</p>
        <p>{selectedMovieData.Genre}</p>
      </div>)}
  </>
};

export default MovieDetails;
