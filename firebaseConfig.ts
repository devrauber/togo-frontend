import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig: any = {
  apiKey: "AIzaSyBJUFZ4q8Z-XWtg1uwqLrY6BorMH5hDaRo",
  authDomain: "togo-b3cd9.firebaseapp.com",
  projectId: "togo-b3cd9",
  storageBucket: "togo-b3cd9.appspot.com",
  messagingSenderId: "449460802562",
  appId: "1:449460802562:web:5ce222caef70277119431b",
  measurementId: "G-2DY52GEWDQ",
};

export const app = initializeApp(firebaseConfig);

