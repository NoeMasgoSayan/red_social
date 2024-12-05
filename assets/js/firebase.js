// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-analytics.js";
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
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app };
