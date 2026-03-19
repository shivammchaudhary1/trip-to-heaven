import admin from "firebase-admin";
import type { ServiceAccount } from "firebase-admin";
import envs from "../config/environment/envs.js";

// Initialize Firebase Admin SDK
let firebaseApp: admin.app.App;

if (!admin.apps.length) {
  firebaseApp = admin.initializeApp({
    credential: admin.credential.cert(
      envs.firebaseServiceAccount as ServiceAccount,
    ),
    projectId: envs.firebaseProjectId,
  });
} else {
  firebaseApp = admin.app();
}

export const getFirebaseAuth = () => admin.auth(firebaseApp);
export const getFirebaseDb = () => admin.database(firebaseApp);
export default firebaseApp;

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyAZ_hh2KhPqAhquy-AZHakI6efHBXgES7U",
//   authDomain: "trip-to-heaven-766c8.firebaseapp.com",
//   projectId: "trip-to-heaven-766c8",
//   storageBucket: "trip-to-heaven-766c8.firebasestorage.app",
//   messagingSenderId: "152447187790",
//   appId: "1:152447187790:web:7ea673573cfc5e9cbd3c1f",
//   measurementId: "G-C77TENF3K7",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
