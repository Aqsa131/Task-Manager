import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from 'https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js'


import {
  getFirestore,
  doc, onSnapshot, serverTimestamp, setDoc, addDoc, collection, deleteDoc,
  query, where
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js"

const firebaseConfig = {
  apiKey: "AIzaSyCV2sNyAi20Q3y6Eu56wB--p5xkAtDhcKM",
  authDomain: "task-managment-bdb92.firebaseapp.com",
  projectId: "task-managment-bdb92",
  storageBucket: "task-managment-bdb92.firebasestorage.app",
  messagingSenderId: "721114809226",
  appId: "1:721114809226:web:1eaea737d5d75a87acfe73"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {
  getAuth, auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged, signOut
  , db, doc, onSnapshot, serverTimestamp,
  setDoc, addDoc, collection, deleteDoc,
  query, where
}