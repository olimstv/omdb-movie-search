import {useState} from "react";

const Movie = ({ movie, selectedMovie, handleMovieItemClick }) => {
  console.log(`movie selectedMovie: ${selectedMovie}`);
  // console.log(selected)
  // let addedClassName = `${selected}`?' selected':'';
let addedClassName;
  // if(selected){
  //   addedClassName = ' selected'
  // } else {
  //   addedClassName = ''
  // }
  return (
    <>
      {movie && (
        <div
            // className={`movie-item${addedClassName}`}
              className='movie-item'
            onClick={(e)=>{
            handleMovieItemClick(movie.imdbID)}} check>
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
