// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import * as auth from 'firebase/auth';
import { doc, getFirestore } from 'firebase/firestore';
import { refs } from './authForm';
import Notiflix from 'notiflix';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCO28bDbA5CR_JRTNANfHW78IVpw7hEqYI',
  authDomain: 'goit-team8-filmoteka.firebaseapp.com',
  projectId: 'goit-team8-filmoteka',
  storageBucket: 'goit-team8-filmoteka.appspot.com',
  messagingSenderId: '739988652973',
  appId: '1:739988652973:web:5cb961d0082fd2ac7fd724',
  measurementId: 'G-R25JXZ3JWZ',
};

// listeners

refs.loginTrigger.addEventListener('click', () => {
  if (signedIn) {
    Notiflix.Notify.failure('You are already signed in!', {
      position: 'center-center',
      timeout: 3000,
    });
    return;
  }
  refs.signInModal.classList.remove('is-hidden');
});
refs.signUpTrigger.addEventListener('click', () => {
  if (signedIn) {
    Notiflix.Notify.failure('You are already signed in!', {
      position: 'center-center',
      timeout: 3000,
    });
    return;
  }
  refs.signUpModal.classList.remove('is-hidden');
});
refs.signInClose.addEventListener('click', () => {
  refs.signInModal.classList.add('is-hidden');
});
refs.signUpClose.addEventListener('click', () => {
  refs.signUpModal.classList.add('is-hidden');
});

// Initialize Firebase and firestore
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const identity = auth.getAuth();
const db = getFirestore();
const signUpForm = document.querySelector('#sign-up__form');
const signInForm = document.querySelector('#sign-in__form');

// check state

export let signedIn;
auth.onAuthStateChanged(identity, user => {
  const homePage = document.querySelector('#home-page');
  if (user) {
    signedIn = true;

    if (homePage) {
      refs.libraryRef.setAttribute('href', './my-library.html');
    }

    refs.loggedOutItems.forEach(item => {
      item.style.display = 'none';
    });
    refs.logoutTrigger.style.display = 'block';

    console.log(signedIn);
  } else {
    console.log('Please sign up or sign in!');
    refs.loggedOutItems.forEach(item => {
      item.style.display = 'block';
    });
    refs.logoutTrigger.style.display = 'none';

    if (homePage) {
      refs.libraryRef.setAttribute('href', '#');
    }

    refs.libraryRef.addEventListener('click', () => {
      Notiflix.Notify.failure(
        'Access to the library page is allowed only for registered users. Please sign in!',
        {
          position: 'top-right',
          timeout: 3000,
        },
      );
    });
    signedIn = false;
    console.log(signedIn);
  }
});

// sign up

signUpForm.addEventListener('submit', e => {
  e.preventDefault();
  const email = signUpForm['sign-up__email'].value;
  const password = signUpForm['sign-up__password'].value;
  auth
    .createUserWithEmailAndPassword(identity, email, password)
    .then(() => {
      refs.signUpModal.style.display = 'none';
      signUpForm.reset();
      Notiflix.Notify.success('Your profile was successfully created. Welcome to Filmoteka!', {
        position: 'top-right',
        timeout: 3000,
      });
    })
    .catch(error =>
      Notiflix.Notify.failure(`${error.message}`, {
        position: 'top-right',
        timeout: 3000,
      }),
    );
});

// sign in

signInForm.addEventListener('submit', e => {
  e.preventDefault();
  const email = signInForm['sign-in__email'].value;
  const password = signInForm['sign-in__password'].value;
  auth
    .signInWithEmailAndPassword(identity, email, password)
    .then(() => {
      refs.signInModal.style.display = 'none';
      signUpForm.reset();
      Notiflix.Notify.success(`Hello, user with email: ${email}. It's good to see you again!`, {
        position: 'top-right',
        timeout: 3000,
      });
    })
    .catch(error =>
      Notiflix.Notify.failure(`${error.message}`, {
        position: 'top-right',
        timeout: 3000,
      }),
    );
});

// log out

refs.logoutTrigger.addEventListener('click', e => {
  auth.signOut(identity).then(() => {
    Notiflix.Notify.info(`You was successfully logged out.Bye!`, {
      position: 'top-right',
      timeout: 3000,
    });
    e.preventDefault();
  });
});
