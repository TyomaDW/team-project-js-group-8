import './js/cardModal';
import { refs, renderGallery } from './js/renderHomeGallery';
import './js/footer_modal';
import './js/renderHomeGallery';
import './js/templates/spinner';
import './js/renderLibraryLists';

import * as Snow from './js/efects/snow';
const snow = new Snow.default({
  id: 'snow',
  min_size: 1,
  max_size: 5,
});
snow.start();

// snow.toggle();
