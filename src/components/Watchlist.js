import Movies from './Movies';
import MovieDetails from './MovieDetails';
import { MdBookmarkBorder } from 'react-icons/md';
import {useState} from "react";
import {LOCAL_STORAGE_KEY} from "./Home";


const Watchlist = () => {
    const [initialLocalStorage] = useState(()=>{
        // Get from local storage by key
        const item = window.localStorage.getItem(LOCAL_STORAGE_KEY);
        // Parse stored json or if none return initialValue
        return item ? JSON.parse(item) : null;
    })
    const [message, setMessage] = useState('Please, make a search');
    const [watchlistMovies, setWatchlistMovies] = useState(()=>{
        return initialLocalStorage?.bookmarkedMovies ?? [];
    });
    const saveStatesToLocalStorage = (override = {})=>{
        const newValue = { selectedMovie, watchlistMovies, ...override }
        window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newValue))
    }
    const [selectedMovie, setSelectedMovie] = useState(()=>{
        return initialLocalStorage?.selectedMovie ?? undefined;

    });

    const handleMovieItemClick = (movieId)=>{
        let movieToSelect = watchlistMovies.filter(movie=>movie.imdbID === movieId)
        console.log(movieToSelect)
        console.log(selectedMovie)
        if(selectedMovie.imdbID !== movieToSelect[0].imdbID) {
            setSelectedMovie(movieToSelect[0])
        }

    }

    const handleWatchlistBtnClick = e => {
        const movieToBookmark = selectedMovie;
        let newBookmarkedMoviesArray = []
        // is this movie already in the list?
        const isAlreadyBookmarked = watchlistMovies.some(movie=> movie.imdbID === movieToBookmark.imdbID)
        if(isAlreadyBookmarked) {
            //true? => 1) take out it from the list
            newBookmarkedMoviesArray=watchlistMovies.filter(movie=>movie.imdbID !== movieToBookmark.imdbID);

        } else {
            //false? => update the state adding selected movie
            newBookmarkedMoviesArray = [...watchlistMovies, movieToBookmark];
        }
        // 2) pass the new list of bookmarked movies to the state
        setWatchlistMovies(newBookmarkedMoviesArray);
        saveStatesToLocalStorage({watchlistMovies: newBookmarkedMoviesArray})
        // }
        return;
    };


    return (
        <div id='watchlist'>

            <div className="navbar">
                <MdBookmarkBorder color='#ffa200'/> Watchlist
            </div>

            {watchlistMovies && (
                <Movies
                    movies={watchlistMovies}
                    handleMovieItemClick={handleMovieItemClick}
                    selectedMovie={selectedMovie}
                    bookmarkedMovies={watchlistMovies}
                />
            )}
            <MovieDetails
                message={message}
                selectedMovie={selectedMovie}
                handleWatchlistBtnClick={handleWatchlistBtnClick}
                bookmarkedMovies={watchlistMovies}
            />

        </div>

    );
};

export default Watchlist;
