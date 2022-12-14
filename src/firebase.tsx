// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCNMRbMq74dgDaViFh-EEf4ObJb8YRFPv4",
  authDomain: "car-maintenance-17df9.firebaseapp.com",
  projectId: "car-maintenance-17df9",
  storageBucket: "car-maintenance-17df9.appspot.com",
  messagingSenderId: "666033764071",
  appId: "1:666033764071:web:0e44ec885e82d8eb875442",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth(app);
export default db;
