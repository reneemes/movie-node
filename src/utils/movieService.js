const request = require('postman-request');  
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

const headers = {
  accept: 'application/json',
  Authorization: `Bearer ${process.env.MOVIE_DB_KEY}`
};
    
const getMovieId = (title, callback) => {
  const url = `${TMDB_BASE_URL}/search/movie?query=${encodeURIComponent(title)}&include_adult=false&language=en-US&page=1`;
  
  request({url, headers, json: true}, (error, response) => {
    if (error) {
      return callback('Unable to connect to TMDB', undefined);
    } else if (!response?.body?.results?.length) {
      return callback('Movie not found', undefined);
    } else {
      callback(undefined, response.body.results[0].id);
    }
  });
};

const getSimilarMovies = (movieId, callback) => {
  const url = `${TMDB_BASE_URL}/movie/${movieId}/similar?language=en-US&page=1`;

  request({url, headers, json: true}, (error, response) => {
    if (error) {
      return callback('Unable to connect to TMDB', undefined);
    } else if (!response?.body?.results?.length) {
      return callback('Movies not found', undefined);
    } else {
      callback(undefined, response.body.results);
    }
  });
}

const getPopularMovies = (callback) => {
  const url = `${TMDB_BASE_URL}/movie/top_rated`;

  request({url, headers, json: true}, (error, response) => {
    if (error) {
      return callback('Unable to connect to TMDB', undefined);
    } else if (!response?.body?.results?.length) {
      return callback('Popular movies not found', undefined);
    } else {
      callback(undefined, response.body.results);
    }
  });
}

module.exports = {
  getMovieId,
  getSimilarMovies,
  getPopularMovies
};