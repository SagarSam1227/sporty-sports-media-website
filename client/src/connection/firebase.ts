// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyA2OnkTyWZHeJi9lhsResmiGQjGGOj1F6g",
  authDomain: "fir-4bdbf.firebaseapp.com",
  projectId: "fir-4bdbf",
  storageBucket: "fir-4bdbf.appspot.com",
  messagingSenderId: "556283502322",
  appId: "1:556283502322:web:d8aac928fc5e457277fa6b",
  measurementId: "G-N0624XQ8HQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)

export const provider =new GoogleAuthProvider()

