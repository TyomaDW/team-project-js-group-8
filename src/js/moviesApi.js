const axios = require('axios').default;
axios.defaults.baseURL = `https://api.themoviedb.org/`;
const KEY = `aa799e6d0297de166f5b00a47e312b46`;

export const request = {
  async fetchTrendingMovies() {
    try {
      const response = await axios.get(`3/trending/movie/week?api_key=${KEY}`);
      const movies = response.data.results;
      return movies;
    } catch (error) {
      console.log(error.message);
    }
  },
  async fetchGenres() {
    try {
      const response = await axios.get(`3/genre/movie/list?api_key=${KEY}&language=en-US`);
      const genres = response;
      return genres.data.genres;
    } catch (error) {
      console.log(error.message);
    }
  },
};
