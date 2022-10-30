// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  updateProfile,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBXSh0yhDLlEYu741ykmsPQNbi6wahDr94',
  authDomain: 'gambit-challenge-465dd.firebaseapp.com',
  projectId: 'gambit-challenge-465dd',
  storageBucket: 'gambit-challenge-465dd.appspot.com',
  messagingSenderId: '555931745207',
  appId: '1:555931745207:web:dc314f219f245583710632',
  measurementId: 'G-5PJ756LSXE',
};

// Initialize Firebase
initializeApp(firebaseConfig);

//init services
const auth = getAuth();

export {
  auth,
  updateProfile,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
};
