// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDt7pFeUWGFldDlkbZkooCh_6iv-ZYLHUE",
  authDomain: "email-password-auth-7307c.firebaseapp.com",
  projectId: "email-password-auth-7307c",
  storageBucket: "email-password-auth-7307c.firebasestorage.app",
  messagingSenderId: "954703758040",
  appId: "1:954703758040:web:781c3b2b7de9bddc624dad"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export default auth;