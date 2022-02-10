const MAX_PAGES = 3;
export const MAX_MOVIES_TO_SHOW = 5;

export function queryMovies(
  // searchTerm,
  fromYear,
  toYear,
  movieType,
  usableSearchTerm
) {
  let cancelFetch = false;

  const promise = new Promise((resolve, reject) => {
    let numPages;
    // let usableSearchTerm = searchTerm.trim();
    let movies = [];
    // let currPage = 1;

    function fetchNextPage(currPage) {
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

      fetchMovies(usableSearchTerm, movieType, currPage).then(data => {
        if (data.Response === 'False') {
          reject(data.Error);
          return;
        }
        if (numPages === undefined) {
          numPages = Math.ceil(data.totalResults / 10);
        }
        data.Search.map(item => {
          const passFilter = yearsFilter(item, fromYear, toYear);
          if (passFilter) {
            movies.push(item);
          }
        });
        // currPage++;
        fetchNextPage(currPage + 1);
      });
    }

    fetchNextPage(1);
  });

  const cancelPromise = () => {
    cancelFetch = true;
  };

  const queryMeta = { promise, cancelPromise };

  return queryMeta;
}
const apiUrlBuilder = (query, type, page) => {
  let url;
  return (url = `https://www.omdbapi.com/?s=${query}&type=${type.filter}&page=${page}&apikey=81b34f15`);
};
const fetchMovies = async (query, type, pageNum) => {
  const url = apiUrlBuilder(query, type, pageNum);

  const res = await fetch(url);
  const data = await res.json();
  return data;
};
const yearsFilter = (movieObj, filterMinYear, filterMaxYear) => {
  let movieObjYearMin;
  let movieObjYearMax;
  let yearStrLength = movieObj.Year.length;
  // console.log('yearStrLength:', yearStrLength);
  if (yearStrLength === 4 || yearStrLength === 5) {
    movieObjYearMin = parseInt(movieObj.Year.slice(0, 4));
    return movieObjYearMin >= filterMinYear && movieObjYearMin <= filterMaxYear;
    // console.log('movieObjYearMin:', movieObjYearMin);
  }
  if (yearStrLength === 9) {
    movieObjYearMin = parseInt(movieObj.Year.slice(0, 4));
    movieObjYearMax = parseInt(movieObj.Year.slice(5));
    console.log('movieObjYearMin:', movieObjYearMin);
    console.log('movieObjYearMax:', movieObjYearMax);

    return (
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
