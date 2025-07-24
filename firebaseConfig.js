// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyACQwU3rcCZXQE5YSfCDrQPlAv8vBOu8WI",
  authDomain: "clickcito-aa2bd.firebaseapp.com",
  projectId: "clickcito-aa2bd",
  storageBucket: "clickcito-aa2bd.firebasestorage.app",
  messagingSenderId: "716981872312",
  appId: "1:716981872312:web:014b9a53d55615f62a764d",
  measurementId: "G-1KBEV24V82"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
