// Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
  import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
  import { getFirestore } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCgBw-xVygjw3GEBM1RAoFERSOvxyVKdgg",
    authDomain: "learning-platform-20988.firebaseapp.com",
    projectId: "learning-platform-20988",
    storageBucket: "learning-platform-20988.firebasestorage.app",
    messagingSenderId: "713164992656",
    appId: "1:713164992656:web:4b9ccf9f507076631c6815",
    measurementId: "G-2PC28CT65S"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);

  // Initialize Firestore
  export const db = getFirestore(app);

