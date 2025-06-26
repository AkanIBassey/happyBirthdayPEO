// scripts/app.js
const firebaseConfig = {
    apiKey: "AIzaSyBmR6gmbM8RDQupc1PH4040d5UROUDKTmk",
    authDomain: "happybirthdaypeo.firebaseapp.com",
    projectId: "happybirthdaypeo",
    storageBucket: "happybirthdaypeo.firebasestorage.app",
    messagingSenderId: "1080675049446",
    appId: "1:1080675049446:web:e07618a7cac6c16c6b4027",
    measurementId: "G-XGJLKCQTH4"
  };

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();
const auth = firebase.auth();