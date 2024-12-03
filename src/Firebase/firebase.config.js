// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCL9YkJPBzAEq5m3sp4Vm6r8BpnGFH0PpI",
  authDomain: "movienest-a10.firebaseapp.com",
  projectId: "movienest-a10",
  storageBucket: "movienest-a10.firebasestorage.app",
  messagingSenderId: "447354280698",
  appId: "1:447354280698:web:272421a6c89c34ee30c743",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
