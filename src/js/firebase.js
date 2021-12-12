// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import * as auth from 'firebase/auth';
import { doc, getFirestore } from 'firebase/firestore';
import { refs } from './authForm';

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

// Initialize Firebase and firestore
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const authenticate = auth.getAuth();
const db = getFirestore();
console.log(authenticate);

const signUpForm = document.querySelector('#sign-up__form');
const signInForm = document.querySelector('#sign-in__form');

signUpForm.addEventListener('submit', e => {
  e.preventDefault();
  const email = signUpForm['sign-up__email'].value;
  const password = signUpForm['sign-up__password'].value;
  console.log(email, password);
  auth.createUserWithEmailAndPassword(authenticate, email, password).then(credentials => {
    console.log(credentials.user).catch(error => {
      console.log(error);
    });
  });
});

signInForm.addEventListener('submit', e => {
  e.preventDefault();
  const email = signInForm['sign-in__email'].value;
  const password = signInForm['sign-in__password'].value;
  console.log(email, password);
});
