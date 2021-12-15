const footerRefs = {
    isHidden: 'is-hidden',
    openModalBtnFooter: document.querySelector('.js-footer-text-link'),
    closeModalBtnFooter: document.querySelector('.js-modal-footer__close-btn'),
    modalFooter: document.querySelector('.js-backdrop-footer'),

}
footerRefs.openModalBtnFooter.addEventListener('click', openModalFooter);
footerRefs.closeModalBtnFooter.addEventListener('click', closeModalFooter);

export function openModalFooter(e) {
    e.preventDefault();
  footerRefs.modalFooter.classList.remove(footerRefs.isHidden);
  document.body.classList.add('no-scroll');
}

export function closeModalFooter() {
  footerRefs.modalFooter.classList.add(footerRefs.isHidden);
   document.body.classList.remove('no-scroll');
}

window.addEventListener('keydown', onEscKey);

export function onEscKey(e) {
  if (e.code === 'Escape') {
    footerRefs.modalFooter.classList.add(footerRefs.isHidden);
  }
  document.body.classList.remove('no-scroll');
}

footerRefs.modalFooter.addEventListener('click', onClickMouse);

export function onClickMouse(e) {
  const backdrop = e.target;

  if (backdrop === footerRefs.modalFooter) {
    footerRefs.modalFooter.classList.add(footerRefs.isHidden);
  }
  document.body.classList.remove('no-scroll');
}
