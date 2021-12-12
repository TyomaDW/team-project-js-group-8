import { refs } from './refs';
export default function renderGallery(movies, genres) {
  const markup = movies
    .map(({ id, genre_ids, title, release_date, poster_path }) => {
      let matchedId = [];
      let releaseYear = release_date.slice(0, 4);
      genres.forEach(genre => {
        if (genre_ids.includes(genre.id)) {
          matchedId.push(genre.name);
        }
      });
      let cardMatchedId =
        matchedId.length < 3 ? matchedId : `${matchedId[0]}, ${matchedId[1]}, other`;
      if (poster_path === null) {
        return `<li class="card gallery__item">
          <a href="#" class="card__link" data-id="${id}">
            <div class="card__wraper-img">
              <img class="card__img" src="https://via.placeholder.com/280x420.png?text=Image+Not+Available" alt="absence of movie's poster">
            </div>
            <div class="card__wraper">
              <h3 class="card__title">${title}</h3>
              <p class="card__info"><span class="card__info-genre">${cardMatchedId}</span> | <span class="card__info-year">${releaseYear}</span></p>
            </div>
          </a>
        </li>`;
      }
      return `<li class="card gallery__item">
        <a href="#" class="card__link" data-id="${id}">
          <div class="card__wraper-img">
            <img class="card__img" src="https://image.tmdb.org/t/p/w780/${poster_path}" alt="movie's poster">
          </div>
          <div class="card__wraper">
            <h3 class="card__title">${title}</h3>
            <p class="card__info"><span class="card__info-genre">${cardMatchedId}</span> | <span class="card__info-year">${releaseYear}</span></p>
          </div>
        </a>
      </li>`;
    })
    .join('');
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}
