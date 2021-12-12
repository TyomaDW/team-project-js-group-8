import { doc } from 'firebase/firestore';
export const refs = {
  loginTrigger: document.querySelector('#login-trigger'),
  signUpTrigger: document.querySelector('#sign-up-trigger'),
  signInTrigger: document.querySelector('#login-trigger'),
  signInModal: document.querySelector('#sign-in'),
  signUpModal: document.querySelector('#sign-up'),
  signInClose: document.querySelector('.sign-in__close'),
  signUpClose: document.querySelector('.sign-up__close'),
  logoutTrigger: document.querySelector('#logout-trigger'),
  authNav: document.querySelector('.auth__nav-list'),
  libraryTrigger: document.querySelector('#library-trigger'),
  libraryRef: document.querySelector('#onlyForRegistered'),
};
const headerHeight = document.querySelector('.header').clientHeight;
const formWrapper = document.querySelectorAll('.flex-container');
formWrapper.forEach(element => {
  element.style.paddingTop = `${headerHeight + 20}px`;
});
