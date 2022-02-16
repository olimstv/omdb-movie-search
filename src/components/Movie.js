import { useState } from 'react';

const Movie = ({ movie, selected, selectedMovie, handleMovieItemClick }) => {

  let addedClassName;

  return (
    <>
      {movie && (
        <div
          // className={`movie-item${addedClassName}`}
          className={selected ? 'movie-item selected' : 'movie-item'}
          onClick={e => {
            handleMovieItemClick(movie.imdbID);
          }}
          check
        >
          {movie.Poster !== 'N/A' ? (
            <img src={movie.Poster} alt={movie.Title} />
          ) : (
            <>{movie.Poster}</>
          )}
          <div>
            <p>{movie.Title}</p>
            <span>{movie.Year}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default Movie;
