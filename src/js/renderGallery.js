export const refs = {
  gallery: document.querySelector('.gallery__list'),
};
export function renderGallery(movies) {
  const markup = movies
    .map(({ genre_ids, title, release_date }) => {
      return `<li class="gallery__item">
        <p>${title}</p>
        <p>${genre_ids}</p>
        <p>${release_date}</p>
        </li>`;
    })
    .join('');
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}
