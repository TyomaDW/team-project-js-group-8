import { request } from './moviesApi';
export const refs = {
  genreField: document.querySelector('.genre'),
  gallery: document.querySelector('.gallery__list'),
};
export function renderGallery(movies, genres) {
  const markup = movies
    .map(({ genre_ids, title, release_date }) => {
      let matchedId = [];
      console.log(genre_ids);
      genres.forEach(genre => {
        if (genre_ids.includes(genre.id)) {
          matchedId.push(genre.name);
          console.log(matchedId);
        }
      });

      return `<li class="gallery__item">
        <p>${title}</p>
        <p class="genre">${matchedId}</p>
        <p>${release_date}</p>
        </li>`;
    })
    .join('');
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}

export async function renderMainSection() {
  const movies = await request.fetchTrendingMovies();
  const genres = await request.fetchGenres();
  const genreIds = movies.map(movie => {
    return movie.genre_ids;
  });
  console.log(genreIds);
  console.log(genres);
  renderGallery(movies, genres);
}
renderMainSection();
