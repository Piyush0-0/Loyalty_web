// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// 🔐 Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyB36PDlauAZwXXGMTWZZiw90Af9wo-tFeQ",
  authDomain: "loyalty-h6.firebaseapp.com",
  databaseURL: "https://loyalty-h6-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "loyalty-h6",
  storageBucket: "loyalty-h6.firebasestorage.app",
  messagingSenderId: "723216823769",
  appId: "1:723216823769:web:92b114476ea4be3435d5c8",
  measurementId: "G-R8REE4C8YV"
};

// 🔧 Initialize Firebase services
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// 🚀 Export to use in components
export { db, auth, provider };
