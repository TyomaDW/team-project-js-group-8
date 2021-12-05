export const refs = {
  gallery: document.querySelector('.gallery__list'),
};
export function renderGallery(movies) {
  const markup = movies
    .map(movie => {
      return `<li>
        <p>${movie.title}</p>
        <p>${movie.genre_ids}</p>
        <p>${movie.release_date}</p>
        </li>`;
    })
    .join('');
  console.log(markup);
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}
