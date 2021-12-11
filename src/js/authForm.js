const refs = {
  loginTrigger: document.querySelector('#login-trigger'),
  signUpTrigger: document.querySelector('#sign-up-trigger'),
  signInModal: document.querySelector('#sign-in'),
  signUpModal: document.querySelector('#sign-up'),
  signInClose: document.querySelector('.sign-in__close'),
  signUpClose: document.querySelector('.sign-up__close'),
};
const headerHeight = document.querySelector('.header').clientHeight;
const formWrapper = document.querySelectorAll('.flex-container');
formWrapper.forEach(element => {
  element.style.marginTop = `${headerHeight + 20}px`;
});
refs.loginTrigger.addEventListener('click', () => {
  refs.signInModal.style.display = 'block';
});
refs.signUpTrigger.addEventListener('click', () => {
  refs.signUpModal.style.display = 'block';
});
refs.signInClose.addEventListener('click', () => {
  refs.signInModal.style.display = 'none';
});
refs.signUpClose.addEventListener('click', () => {
  refs.signUpModal.style.display = 'none';
});
console.log(headerHeight);
