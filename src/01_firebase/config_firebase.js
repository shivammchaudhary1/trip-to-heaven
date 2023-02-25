// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC9ITc-qx8vQU5wwmMJyuWNPK2fuhLRjgA",
  authDomain: "makemytrip-authantication.firebaseapp.com",
  databaseURL: "https://makemytrip-authantication-default-rtdb.firebaseio.com",
  projectId: "makemytrip-authantication",
  storageBucket: "makemytrip-authantication.appspot.com",
  messagingSenderId: "17638617178",
  appId: "1:17638617178:web:a745ac4ac49388320c6863"
};

// Initialize Firebase
const firebase_app = initializeApp(firebaseConfig);

export default firebase_app