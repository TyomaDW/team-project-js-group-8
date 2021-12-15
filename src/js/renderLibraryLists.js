import { request } from './moviesApi';
import { pagination } from './pagination';

const watchedGalleryBtn = document.querySelector('.watched_list');
const queueGalleryBtn = document.querySelector('.queue_list');
const gallery = document.querySelector('.gallery__list');
const myLibraryPage = document.querySelector('#my-library-page');

const userLists = {
  init: function () {
    if (!myLibraryPage) {
      return;
    }

    this.loadInitialMovies();
    this.initWatchedMovies();
    this.initQueueMovies();

  },

  loadInitialMovies: function () {
    this.resetPage();
    this.fetchMovies('queueMovieId');
  },

  initWatchedMovies: function () {
    watchedGalleryBtn.onclick = () => {
      this.toggleBtn();
      this.resetPage();
      this.fetchMovies('wachedMovieId');
    };
  },

  initQueueMovies: function () {
    queueGalleryBtn.onclick = () => {
      this.toggleBtn();
      this.resetPage();
      this.fetchMovies('queueMovieId');
    };
  },

  fetchMovies: function (storageKey) {
    const moviesIds = JSON.parse(localStorage.getItem(storageKey));
     console.log(moviesIds);

    if (!moviesIds) {
      pagination.reset(0);
      return;
    }

    moviesIds.forEach(movieId => {
      request.fetchMovieDetails(movieId).then(data => {
        this.renderMovie(data);
      });
    });
  },

  renderMovie: function ({ id, genres, title, release_date, poster_path, vote_average }) {
    let genresNames = [];
    let releaseYear = release_date.slice(0, 4);

    genres.forEach(genre => {
      genresNames.push(genre.name);
    });

    const shortGenresNames = genresNames.slice(0, 2);

    const renderedGenres = shortGenresNames.join(', ');

    const markup = `<li class="card gallery__item">
                            <a href="#" class="card__link" data-id="${id}">
                                <div class="card__wrapper-img">
                                <img class="card__img" src="https://image.tmdb.org/t/p/w780/${poster_path}" alt="movie's poster">
                                </div>
                                <div class="card__wrapper">
                                <h3 class="card__title">${title}</h3>
                                <p class="card__info"><span class="card__info-genre">${renderedGenres}...</span> | <span class="card__info-year">${releaseYear}</span><span class="card__info-vote">${vote_average}</span></p>
                                </div>
                            </a>
                        </li>`;

    gallery.insertAdjacentHTML('beforeend', markup);
    const element = document.querySelectorAll('.card');
    VanillaTilt.init(element);
  },

  resetPage: function () {
    gallery.innerHTML = '';
  },

  toggleBtn: function () {
    queueGalleryBtn.classList.toggle('is-active');
    watchedGalleryBtn.classList.toggle('is-active');
  },
};

userLists.init();

export default userLists;
