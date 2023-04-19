// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6VjNv4gemWADjCOzPaad50vWrxSCog1E",
  authDomain: "apple-2cdb1.firebaseapp.com",
  projectId: "apple-2cdb1",
  storageBucket: "apple-2cdb1.appspot.com",
  messagingSenderId: "628455239413",
  appId: "1:628455239413:web:f15e654555ac8c150d5fbc",
  measurementId: "G-MKY2TV0PZ9"
};
// Initialize Firebase
const firebase_app = initializeApp(firebaseConfig);

export default firebase_app