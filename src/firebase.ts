import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBs2VQL_cR9hLwTFtKZKNrZ6D0_UoQcpKM",
  authDomain: "instituto-horizonte.firebaseapp.com",
  projectId: "instituto-horizonte",
  storageBucket: "instituto-horizonte.firebasestorage.app",
  messagingSenderId: "641302345750",
  appId: "1:641302345750:web:1fd71d98e808bc8eca9d37",
  measurementId: "G-7XZE5BJSZF"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
