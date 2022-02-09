export function queryMovies(
  searchTerm,
  fromYear,
  toYear,
  movieType,
  usableSearchTerm
  // apiUrlBuilder
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
        if (!data.Response) {
          moviesData.push(data);
        } else {
          // returning only 1 page (10 movies per page)
          totalResults = data.totalResults;
          if (totalResults <= 10) {
            moviesData.push(data.Search);
          } else {
            moviesData = data.Search;
            numPages = Math.ceil(totalResults / 10);
            for (let i = 2; i <= numPages; i++) {
              fetchMovies(searchTerm, movieType, i).then(dataLoad => {
                // console.log('moviesData:', moviesData);
                // console.log('dataLoad:', dataLoad.Search);

                dataLoad.Search.map(item => {
                  moviesData.push(item);
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

// const composeMoviesObj = async queryRes => {
// let totalResults;
// let data = [];
// // error message
// if (!queryRes.Response) {
//   data.push(queryRes);
// } else {
//   // returning only 1 page (10 movies per page)
//   totalResults = queryRes.totalResults;
//   if (totalResults <= 10) {
//     data.push(queryRes.Search);
//   } else {
//     data = queryRes.Search;
//     numPages = Math.ceil(totalResults / 10);
//     for (let i = 2; i <= numPages; i++) {
//       let dataLoad = await fetchMovies(searchTerm, movieType, i);
//       await data.push(dataLoad);
//     }
//   }
// }
// return data;
// };
