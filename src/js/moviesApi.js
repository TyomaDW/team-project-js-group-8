const axios = require('axios').default;
axios.defaults.baseURL = `https://api.themoviedb.org/`;
const KEY = `aa799e6d0297de166f5b00a47e312b46`;

export const request = {
  query: '',

  async fetchTrendingMovies() {
    const response = await axios.get(`3/trending/movie/day?api_key=${KEY}`);
    const movies = response.data.results;
    return movies;
  },

  async fetchGenres() {
    const response = await axios.get(`3/genre/movie/list?api_key=${KEY}&language=en-US`);
    const genres = response;
    return genres.data.genres;
  },

  async fetchApiConfig() {
    const response = await axios.get(`https://api.themoviedb.org/3/configuration?api_key=${KEY}`);
    const config = response;
    console.log(config);
  },

  get query() {
    return this.query;
  },
  set query(newQuery) {
    this.query = newQuery;
  },

  async fetchMovieDetails(movieId) {
    try {
      const response = await axios.get(`3/movie/${movieId}?api_key=${KEY}`);
      const movies = await response.data;
      return movies;
    } catch (error) {
      console.log(error.message);
    }
  }
};
