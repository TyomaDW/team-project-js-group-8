const axios = require('axios').default;
axios.defaults.baseURL = `https://api.themoviedb.org/`;
const KEY = `aa799e6d0297de166f5b00a47e312b46`;

export const request = {
  async fetchTrendingMovies() {
    try {
      const response = await axios.get(`3/trending/movie/week?api_key=${KEY}`);
      const movies = await response.data.results;
      return movies;
    } catch (error) {
      console.log(error.message);
    }
  },
};
