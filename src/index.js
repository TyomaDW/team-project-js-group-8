import './js/cardModal';
import { refs, renderGallery } from './js/renderGallery';
import './js/footer_modal';
import './js/renderGallery';
import './js/spinner';

import * as Snow from './js/efects/snow';
  const snow = new Snow.default({
  id: 'snow',
  min_size: 1,
  max_size: 5
});
snow.start();

// snow.toggle();
