// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
  authDomain: "ai-logo-maker-21a86.firebaseapp.com",
  projectId: "ai-logo-maker-21a86",
  storageBucket: "ai-logo-maker-21a86.firebasestorage.app",
  messagingSenderId: "858484458921",
  appId: "1:858484458921:web:98518bdb2746b24a2af0b8",
  measurementId: "G-3X39Q9DM3K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const db=getFirestore(app)
export {db};