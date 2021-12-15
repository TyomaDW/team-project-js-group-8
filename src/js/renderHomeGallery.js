import { request } from './moviesApi';
import { refs } from './templates/refs';
import renderGallery from './templates/createCardMarkup';
import Notiflix from 'notiflix';
import VanillaTilt from 'vanilla-tilt';
import 'tui-pagination/dist/tui-pagination.min.css';
import { pagination } from './pagination';

let isSearch = false;
export const homePage = document.querySelector('#home-page');
export const erasePage = () => {
  refs.gallery.innerHTML = '';
};

pagination.on('afterMove', event => {
  const currentPage = event.page;
  erasePage();
  if (!isSearch) {
    renderMainSection(currentPage);
  } else {
    renderMoviesOnQuery(currentPage);
  }
});

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

export async function renderMoviesOnQuery(page = 1) {
  try {
    const movies = await request.fetchMoviesOnQuery(page);
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

export async function renderMainSection(page = 1) {
  if (!refs.homePage) {
    return;
  }

  try {
    const movies = await request.fetchTrendingMovies(page);
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
