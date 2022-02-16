import Movies, {PAGE_MODE_WATCHLIST} from './Movies';
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
    const [bookmarkedMovies, setBookmarkedMovies] = useState(()=>{
        return initialLocalStorage?.bookmarkedMovies ?? [];
    });
    const saveStatesToLocalStorage = (override = {})=>{

        // Get from local storage by key
        let existingValue = window.localStorage.getItem(LOCAL_STORAGE_KEY);
        // Parse stored json or if none return initialValue
        existingValue = existingValue ? JSON.parse(existingValue) : {};

        const newValue = { ...existingValue, watchlistMovies: bookmarkedMovies, ...override }
        window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newValue))
    }
    const [selectedMovie, setSelectedMovie] = useState();

    const handleMovieItemClick = (movieId)=>{
        console.log("movieId", movieId)
        let movieToSelect = bookmarkedMovies.find(movie=>movie.imdbID === movieId)
        console.log(movieToSelect)
        console.log(selectedMovie)
       setSelectedMovie(movieToSelect)

    }

    const handleWatchlistBtnClick = e => {
        const movieToBookmark = selectedMovie;
        let newBookmarkedMoviesArray = []
        // is this movie already in the list?
        const isAlreadyBookmarked = bookmarkedMovies.some(movie=> movie.imdbID === movieToBookmark.imdbID)
        if(isAlreadyBookmarked) {
            //true? => 1) take out it from the list
            newBookmarkedMoviesArray=bookmarkedMovies.filter(movie=>movie.imdbID !== movieToBookmark.imdbID);

        } else {
            //false? => update the state adding selected movie
            newBookmarkedMoviesArray = [...bookmarkedMovies, movieToBookmark];
        }
        // 2) pass the new list of bookmarked movies to the state
        setBookmarkedMovies(newBookmarkedMoviesArray);
        saveStatesToLocalStorage({bookmarkedMovies: newBookmarkedMoviesArray})
        // }
        return;
    };


    return (
        <div id='watchlist'>

            <div className="navbar">
                <MdBookmarkBorder color='#ffa200'/> Watchlist
            </div>

            {bookmarkedMovies && (
                <Movies
                    movies={bookmarkedMovies}
                    handleMovieItemClick={handleMovieItemClick}
                    selectedMovie={selectedMovie}
                    bookmarkedMovies={bookmarkedMovies}
                    pageMode={PAGE_MODE_WATCHLIST}
                />
            )}
            <MovieDetails
                message={message}
                selectedMovie={selectedMovie}
                handleWatchlistBtnClick={handleWatchlistBtnClick}
                bookmarkedMovies={bookmarkedMovies}
            />

        </div>

    );
};

export default Watchlist;
