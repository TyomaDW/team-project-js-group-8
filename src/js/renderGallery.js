import { request } from './moviesApi';
export const refs = {
  genreField: document.querySelector('.genre'),
  gallery: document.querySelector('.gallery__list'),
};
export function renderGallery(movies, genres) {
  
  const markup = movies
    .map(({ id, genre_ids, title, release_date, poster_path }) => {
      let matchedId = [];
      let releaseYear = release_date.slice(0,4);
      genres.forEach(genre => {
        if (genre_ids.includes(genre.id)) {
          matchedId.push(genre.name);
        }
      });

      return `<li class="card gallery__item">
      <a href="#" class="card__link">
          <img class="card__img" src="https://image.tmdb.org/t/p/w780/${poster_path}" alt="movie's poster">
          <div class="card__wraper">
              <h2 class="card__title">${title}</h2>
              <p class="card__info"><span class="card__info-genre">${matchedId}</span> | <span class="card__info-year">${releaseYear}</span></p>
          </div>
      </a>
  </li>`;

      return `<li class="gallery__item">
      <div>
        <a href="#" class="gallery__item-link" data-id="${id}">
        <img class="film-image" src="https://image.tmdb.org/t/p/w780/${poster_path}" alt="film-image">
        <p class="film-heading">${title}</p>
        <p class="film-info"><span class="film-genre">${matchedId}</span> | <span class="film-year">${release_date}</span></p>
        </a>
      </div>  
        </li>`;

    })
    .join('');
  refs.gallery.insertAdjacentHTML('beforeend', markup);
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
