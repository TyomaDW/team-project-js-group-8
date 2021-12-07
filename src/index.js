import modalHandler from './card_modal';
import { request } from './js/moviesApi';
import { refs, renderGallery } from './js/renderGallery';

modalHandler.init();

import './footer_modal';

request.fetchTrendingMovies().then(data => {
  renderGallery(data);
});

