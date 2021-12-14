import { request } from './moviesApi';
import { refs } from './templates/refs';
import renderGallery from './templates/createCardMarkup';
import Notiflix from 'notiflix';
import VanillaTilt from 'vanilla-tilt';
const homePage = document.querySelector('#home-page');
const erasePage = () => {
  refs.gallery.innerHTML = '';
};

const submitHandler = e => {
  e.preventDefault();
  request.query = refs.searchInput.value.trim();
  if (request.query === '') {
    Notiflix.Notify.info('The query string is empty! Please, enter a title of movie.', {
      position: 'center-center',
      timeout: 3000,
    });
    return;
  }
  renderMoviesOnQuery();
  refs.searchForm.reset();
};

if (homePage) {
  refs.searchForm.addEventListener('submit', submitHandler);
  refs.searchIcon.addEventListener('click', submitHandler);
}

export async function renderMoviesOnQuery() {
  try {
    const movies = await request.fetchMoviesOnQuery();
    const genres = await request.fetchGenres();
    if (movies.length === 0) {
      Notiflix.Notify.failure('Sorry! There are no movies with such title found in database!', {
        position: 'center-center',
        timeout: 3000,
      });
      return;
    }
    const genreIds = movies.map(movie => {
      return movie.genre_ids;
    });
    erasePage();
    renderGallery(movies, genres);
    const element = document.querySelectorAll('.card');
    VanillaTilt.init(element);
  } catch (error) {
    console.log(error.message);
  }
}

export async function renderMainSection() {
  if (!refs.homePage) {
    return;
  }

  try {
    const movies = await request.fetchTrendingMovies();
    const genres = await request.fetchGenres();
    const genreIds = movies.map(movie => {
      return movie.genre_ids;
    });
    renderGallery(movies, genres);
    const element = document.querySelectorAll('.card');
    VanillaTilt.init(element);
  } catch (error) {
    console.log(error.message);
  }
}
renderMainSection();
