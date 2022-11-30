// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBurxEEhA3aHtbt_ZmuiidIO1DN4zttzoc",
  authDomain: "firstproject-4d0dc.firebaseapp.com",
  projectId: "firstproject-4d0dc",
  storageBucket: "firstproject-4d0dc.appspot.com",
  messagingSenderId: "937511952405",
  appId: "1:937511952405:web:dfe14a8e01e9a5edeb6e1c",
  measurementId: "G-H66KBPYK5D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);