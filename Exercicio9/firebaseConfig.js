import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAHsdmCMJ19hueLQjW1JPQmzqnDCb8Djdw",
  authDomain: "exercicio9-c46c2.firebaseapp.com",
  databaseURL: "https://exercicio9-c46c2-default-rtdb.firebaseio.com",
  projectId: "exercicio9-c46c2",
  storageBucket: "exercicio9-c46c2.firebasestorage.app",
  messagingSenderId: "282730729880",
  appId: "1:282730729880:web:c6957b542977b8f6fcdbed"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);