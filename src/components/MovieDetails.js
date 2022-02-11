import React from 'react';

const MovieDetails = ({message, selectedMovie}) => {

  // console.log('MovieDetails msg:', message)
  return <div id='movie-details'>
          {!selectedMovie ?
              (
                <span className='message'>{message}</span>
              ) :
              (
                  <div className='movie-description'>
                    <img src={selectedMovie.Poster} alt=""/>
                  </div>
              )}
  </div>
};

export default MovieDetails;
