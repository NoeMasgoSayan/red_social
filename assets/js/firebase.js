// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";

// Firestore
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  onSnapshot,
  deleteDoc,
  updateDoc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBjSX_sNGTnGeSni4PXr9S12GKLOE2Wfh8",
  authDomain: "red-social-c9118.firebaseapp.com",
  projectId: "red-social-c9118",
  storageBucket: "red-social-c9118.firebasestorage.app",
  messagingSenderId: "242287681501",
  appId: "1:242287681501:web:c8526363de56ca4d116034",
  measurementId: "G-C2ZXSY3VDH",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Firestore
export const db = getFirestore();

// Operaciones CRUD post
//TODO: CREATE
export const createPost = (title, description) =>
  addDoc(collection(db, "Post"), { title, description });

//TODO: READ
export const onGetPost = (callback) =>
  onSnapshot(collection(db, "Post"), callback);

//TODO: UPDATE
export const getPost = (id) => getDoc(doc(db, "Post", id));

export const updatePost = (id, newData) =>
  updateDoc(doc(db, "Post", id), newData);

//TODO: DELETE
export const deletePost = (id) => deleteDoc(doc(db, "Post", id));
