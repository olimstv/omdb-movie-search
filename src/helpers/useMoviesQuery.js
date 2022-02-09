export function queryMovies(
  searchTerm,
  fromYear,
  toYear,
  movieType,
  usableSearchTerm
) {
  return new Promise((resolve, reject) => {
    let numPages;
    let usableSearchTerm = searchTerm.trim();
    let movies = [];
    let currPage = 1;
    // 1. Make a first fetch to get the totalResults number (if success)
    fetchMovies(searchTerm, movieType, currPage)
      .then(data => {
        let totalResults;
        let moviesData = [];
        // error message
        console.log(`response: ${data.Response}`);
        if (data.Response === 'False') {
          moviesData.push(data);
        } else {
          // returning only 1 page (10 movies per page)
          totalResults = data.totalResults;
          console.log('totalResults:', totalResults);
          if (totalResults <= 10) {
            moviesData.push(data.Search);
          } else {
            moviesData = data.Search;
            currPage++;
            numPages = Math.ceil(totalResults / 10);
            for (currPage; currPage <= numPages; currPage++) {
              fetchMovies(searchTerm, movieType, currPage).then(dataLoad => {
                // console.log('moviesData:', moviesData);
                // console.log('dataLoad:', dataLoad.Search);

                dataLoad.Search.map(item => {
                  const passFilter = yearsFilter(item, fromYear, toYear);
                  if (passFilter) {
                    moviesData.push(item);
                  }
                });
              });
            }
          }
        }
        return moviesData;
      })
      .then(dataPromis => {
        console.log('dataPromis:', dataPromis);

        resolve(dataPromis);
      });
  });
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
const yearsFilter = (movieObj, yearMin, yearMax) => {
  let movieObjYearMin;
  let movieObjYearMax;
  let yearStrLength = movieObj.Year.length;
  // console.log('yearStrLength:', yearStrLength);
  if (yearStrLength === 4 || yearStrLength === 5) {
    movieObjYearMin = parseInt(movieObj.Year.slice(0, 4));
    return movieObjYearMin >= yearMin;
  }
  if (yearStrLength === 9) {
    movieObjYearMin = parseInt(movieObj.Year.slice(0, 4));
    movieObjYearMax = parseInt(movieObj.Year.slice(5));

    return movieObjYearMin >= yearMin && movieObjYearMax <= yearMax;
  }
};
