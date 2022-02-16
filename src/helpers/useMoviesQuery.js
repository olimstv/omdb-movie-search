// temporary workaround to reduce the amount of API calls while development
// (as they are limited to 1000 per day)
export const MAX_MOVIES_TO_SHOW = 5;

export function queryMovies(
  fromYear,
  toYear,
  movieType,
  usableSearchTerm
) {
  let cancelFetch = false;

  const promise = new Promise((resolve, reject) => {
    let numPages;
    let movies = [];
    // recursive function, fetching movies page by page
    const fetchNextPage = currPage => {
      // if cancelPromise function called, cancelFetch value changes to true
      // and the process of further fetching stops
      if (cancelFetch) {
        resolve(movies);
        return;
      }
      const isFinished =
        (numPages !== undefined && currPage > numPages) ||
        movies.length > MAX_MOVIES_TO_SHOW;

      if (isFinished) {
        resolve(movies);
        return;
      }
      // fetching movies (first fetch gives 10 movies and the totalResults count)
      fetchMovies(usableSearchTerm, movieType, currPage).then(data => {
        // if no movies found
        if (data.Response === 'False') {
          reject(data.Error);
          return;
        }
        // if we haven't count the number of pages yet
        if (numPages === undefined) {
          // the results come 10 movies per 1 api call. totalResults count / 10 = number of calls needed
          // to fetch all movies
          numPages = Math.ceil(data.totalResults / 10);
        }
        data.Search.map(item => {
          // using filter
          const passFilter = yearsFilter(item, fromYear, toYear);
          if (passFilter) {
            // if passed, adding to the array of results
            movies.push(item);
          }
        });
        // fetching the next page
        fetchNextPage(currPage + 1);
      });
    };
    fetchNextPage(1);
  });

  const cancelPromise = () => {
    // sets cancelFetch variable to true
    cancelFetch = true;
  };

  const queryMeta = { promise, cancelPromise };
  // returning promise and cancelPromise function
  return queryMeta;
}
// creating url based on parameters (search term, type, page)
const apiUrlBuilder = (query, type, page) => {
  let url;
  return (url = `https://www.omdbapi.com/?s=${query}&type=${type.filter}&page=${page}&apikey=81b34f15`);
};
// fetching movies
const fetchMovies = async (query, type, pageNum) => {
  // creating url
  const url = apiUrlBuilder(query, type, pageNum);

  const res = await fetch(url);
  const data = await res.json();
  return data;
};
// Function filters the results by years range (using years filter values)
const yearsFilter = (movieObj, filterMinYear, filterMaxYear) => {
  let movieObjYearMin;
  let movieObjYearMax;
  let yearStrLength = movieObj.Year.length;

  // API gives 3 types of years in movie object:
  // "1985", "1985-" and "1985 - 2022"
  if (yearStrLength === 4 || yearStrLength === 5) {
    movieObjYearMin = parseInt(movieObj.Year.slice(0, 4));
    return movieObjYearMin >= filterMinYear && movieObjYearMin <= filterMaxYear;
  }
  if (yearStrLength === 9) {
    movieObjYearMin = parseInt(movieObj.Year.slice(0, 4));
    movieObjYearMax = parseInt(movieObj.Year.slice(5));
    return (
      //  for the "Series", which usually have two years values (year started and year finished)
      //  returns all items when filter values are overlapping with item year values
      (movieObjYearMin >= filterMinYear && movieObjYearMin <= filterMaxYear) ||
      (movieObjYearMax >= filterMinYear && movieObjYearMax <= filterMaxYear)
    );
  }
};
// Function fetching selected movie data
export async function selectedMovieDataFetch (movieId){
  const apiUrl = `http://www.omdbapi.com/?i=${movieId}&apikey=81b34f15`
  const fetchRes = await fetch(apiUrl);
  return fetchRes.json()
}
// checking if 'Enter' key pressed when search-box in focus
export function enterKeyCheck (key) {
  return key.code === 'Enter';
};
