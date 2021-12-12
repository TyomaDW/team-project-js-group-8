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
  refs.signInModal.style.display = 'block';
});
refs.signUpTrigger.addEventListener('click', () => {
  if (signedIn) {
    Notiflix.Notify.failure('You are already signed in!', {
      position: 'center-center',
      timeout: 3000,
    });
    return;
  }
  refs.signUpModal.style.display = 'block';
});
refs.signInClose.addEventListener('click', () => {
  refs.signInModal.style.display = 'none';
});
refs.signUpClose.addEventListener('click', () => {
  refs.signUpModal.style.display = 'none';
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
  if (user) {
    signedIn = true;
    refs.libraryTrigger.style.display = 'block';
    refs.signInTrigger.style.display = 'none';
    refs.signUpTrigger.style.display = 'none';
    refs.logoutTrigger.style.display = 'block';
    console.log(signedIn);
  } else {
    console.log('Please sign up or sign in!');
    refs.libraryTrigger.style.display = 'none';
    refs.signInTrigger.style.display = 'block';
    refs.signUpTrigger.style.display = 'block';
    refs.logoutTrigger.style.display = 'none';
    signedIn = false;
    console.log(signedIn);
  }
});

// sign up

signUpForm.addEventListener('submit', e => {
  e.preventDefault();
  const email = signUpForm['sign-up__email'].value;
  const password = signUpForm['sign-up__password'].value;
  console.log(email, password);
  auth.createUserWithEmailAndPassword(identity, email, password).catch(error => console.log(error));
  refs.signUpModal.style.display = 'none';
  signUpForm.reset();
  Notiflix.Notify.success('Your profile was successfully created. Welcome to Filmoteka!', {
    position: 'center-center',
    timeout: 3000,
  });
});

// sign in

signInForm.addEventListener('submit', e => {
  e.preventDefault();
  const email = signInForm['sign-in__email'].value;
  const password = signInForm['sign-in__password'].value;
  auth.signInWithEmailAndPassword(identity, email, password).catch(error => console.log(error));

  refs.signInModal.style.display = 'none';
  signInForm.reset();
  console.log(email, password);
});

// log out

refs.logoutTrigger.addEventListener('click', e => {
  e.preventDefault();
  auth.signOut(identity).then(() => {
    Notiflix.Notify.warning(`You was successfully logged out.Bye!`, {
      position: 'center-center',
      timeout: 3000,
    });
  });
});
