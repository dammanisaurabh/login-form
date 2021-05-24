import firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBN4uB1zXayer08E_P0PButEo2X6Qnqiro",
    authDomain: "login-form-56d7c.firebaseapp.com",
    projectId: "login-form-56d7c",
    storageBucket: "login-form-56d7c.appspot.com",
    messagingSenderId: "252287434376",
    appId: "1:252287434376:web:554be2453d116b84e2293d",
    measurementId: "G-L2TF2WPDF2"
  };

  firebase.initializeApp(firebaseConfig);

  export default firebase;