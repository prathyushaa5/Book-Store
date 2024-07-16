// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA0n2aUqzG9WT5gLPFE_TnmkcwbGBd4Dtw",
  authDomain: "mern-book-inventory-4eba3.firebaseapp.com",
  projectId: "mern-book-inventory-4eba3",
  storageBucket: "mern-book-inventory-4eba3.appspot.com",
  messagingSenderId: "287534690611",
  appId: "1:287534690611:web:6a4d568b21039269f1ce46"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;