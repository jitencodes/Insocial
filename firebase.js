import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  apiKey: "AIzaSyDDksz-QYJEUeuJUjf5CD6bgGxWvwgqh7M",
    authDomain: "storage-e8afa.firebaseapp.com",
    projectId: "storage-e8afa",
    storageBucket: "storage-e8afa.appspot.com",
    messagingSenderId: "957061059312",
    appId: "1:957061059312:web:b1a66dc46ea75a722c2835"
});

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const db = firebaseApp.firestore();
const storage = firebase.storage();

export { auth, db, provider, storage };
