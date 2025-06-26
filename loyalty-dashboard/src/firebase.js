import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

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

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
