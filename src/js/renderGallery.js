import { request } from './moviesApi';
import Notiflix from 'notiflix';
export const refs = {
  searchForm: document.querySelector('#search-form'),
  searchInput: document.querySelector('.hero__form-input'),
  genreField: document.querySelector('.genre'),
  gallery: document.querySelector('.gallery__list'),
};

const erasePage = () => {
  refs.gallery.innerHTML = '';
};

const submitHandler = e => {
  e.preventDefault();
  erasePage();
  request.query = refs.searchInput.value.trim();
  request.query === '' &&
    Notiflix.Notify.info('The query string is empty! Please, enter a title of movie.', {
      position: 'center-center',
      timeout: 3000,
    });
  console.log(request.query);
  renderMoviesOnQuery();
  refs.searchForm.reset();
};
refs.searchForm.addEventListener('submit', submitHandler);

export function renderGallery(movies, genres) {
  const markup = movies
    .map(({ id, genre_ids, title, release_date, poster_path }) => {
      let matchedId = [];
      let releaseYear = release_date.slice(0, 4);
      genres.forEach(genre => {
        if (genre_ids.includes(genre.id)) {
          matchedId.push(genre.name);
        }
      });
      if (poster_path === null) {
        return `<li class="card gallery__item">
      <a href="#" class="card__link" data-id="${id}">
      <div class ="img-wrapper">
          <img class="card__img" src="https://via.placeholder.com/280x420.png?text=Image+Not+Available" alt="absence of movie's poster">
          </div>
          <div class="card__wraper">
              <h3 class="card__title">${title}</h3>
              <p class="card__info"><span class="card__info-genre">${matchedId}</span> | <span class="card__info-year">${releaseYear}</span></p>
          </div>
      </a>
  </li>`;
      }
      return `<li class="card gallery__item">
      <a href="#" class="card__link" data-id="${id}">
          <img class="card__img" src="https://image.tmdb.org/t/p/w780/${poster_path}" alt="movie's poster">
          <div class="card__wraper">
              <h3 class="card__title">${title}</h3>
              <p class="card__info"><span class="card__info-genre">${matchedId}</span> | <span class="card__info-year">${releaseYear}</span></p>
          </div>
      </a>
  </li>`;
    })
    .join('');
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}

export async function renderMoviesOnQuery() {
  try {
    const movies = await request.fetchMoviesOnQuery();
    const genres = await request.fetchGenres();
    movies.length === 0 &&
      Notiflix.Notify.failure('Sorry! There are no movies with such title found in database!', {
        position: 'center-center',
        timeout: 3000,
      });
    const genreIds = movies.map(movie => {
      return movie.genre_ids;
    });
    renderGallery(movies, genres);
  } catch (error) {
    console.log(error.message);
  }
}

export async function renderMainSection() {
  try {
    const movies = await request.fetchTrendingMovies();
    const genres = await request.fetchGenres();
    const genreIds = movies.map(movie => {
      return movie.genre_ids;
    });
    renderGallery(movies, genres);
  } catch (error) {
    console.log(error.message);
  }
}
renderMainSection();
