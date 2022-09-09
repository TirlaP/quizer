import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  serverTimestamp,
  doc,
  orderBy,
  limit,
  onSnapshot,
  query,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAja6lFWNkmvYPj3vKV3Yw0aEGpFyPgJHA",
  authDomain: "fir-crud-835bc.firebaseapp.com",
  projectId: "fir-crud-835bc",
  storageBucket: "fir-crud-835bc.appspot.com",
  messagingSenderId: "371086947634",
  appId: "1:371086947634:web:09ae317bcbbda43036532b",
  measurementId: "G-MZ5JT0PF4Q",
};

// init firebase app
const app = initializeApp(firebaseConfig);

// init services
const db = getFirestore();
const auth = getAuth(app);

export {
  db,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  serverTimestamp,
  doc,
  auth,
  orderBy,
  limit,
  onSnapshot,
  query,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
};
