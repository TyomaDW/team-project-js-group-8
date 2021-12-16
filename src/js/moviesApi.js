import { refs } from './templates/refs';
const axios = require('axios').default;
axios.defaults.baseURL = `https://api.themoviedb.org/`;
const KEY = `aa799e6d0297de166f5b00a47e312b46`;

import { pagination } from './pagination';

export const request = {
  searchQuery: '',

  async fetchTrendingMovies(page = 1) {
    const response = await axios.get(`3/trending/movie/day?api_key=${KEY}&page=${page}`);
    const movies = response.data.results;
    const quantity = response.data.total_results;
    if (page == 1) {
      pagination.reset(quantity);
      pagination.setTotalItems(quantity);
    }
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

  async fetchMoviesOnQuery(page = 1) {
    const response = await axios.get(
      `3/search/movie?api_key=${KEY}&language=en-US&page=1&include_adult=false&query=${this.searchQuery}&page=${page}`,
    );
    const movies = response.data.results;
    if (page == 1) {
      pagination.reset(response.data.total_results);
    }
    if (!response.data.total_results) {
      pagination.reset(0);
      pagination.setTotalItems(0);
      refs.gallery.innerHTML = '';
      try {
        document.getElementById('tui-pagination-container').style.display = 'none';
      } catch(err) {}
    }
     else {
      document.getElementById('tui-pagination-container').style.display = 'block';
     }
    return movies;
  },

  get query() {
    return this.searchQuery;
  },
  set query(newQuery) {
    this.searchQuery = newQuery;
  },

  async fetchMovieDetails(movieId) {
    try {
      const response = await axios.get(`3/movie/${movieId}?api_key=${KEY}`);
      const movies = await response.data;
      return movies;
    } catch (error) {
      console.log(error.message);
    }
  },
};
