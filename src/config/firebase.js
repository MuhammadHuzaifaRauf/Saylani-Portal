// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
//     apiKey: process.env.REACT_APP_API_KEY,
//   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_MESSAGING_SENDER_ID,
//   messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_APP_ID,
//   measurementId: process.env.REACT_APP_MEASUREMENT_ID
// apiKey: "AIzaSyB1AUJF7HznFteTUH4jLUZNyufSeI3lx6k",
// authDomain: "saylaniportal.firebaseapp.com",
// projectId: "saylaniportal",
// storageBucket: "saylaniportal.appspot.com",
// messagingSenderId: "19091709118",
// appId: "1:19091709118:web:5e5136549ea1c87cb112ef",
// measurementId: "G-0KZJQ84Y1G"
apiKey: "AIzaSyA6V_eMltyYpZ8O_lFIeywewdOTh2Hm3B8",
authDomain: "coconut-firebase-993eb.firebaseapp.com",
projectId: "coconut-firebase-993eb",
storageBucket: "coconut-firebase-993eb.appspot.com",
messagingSenderId: "67434621596",
appId: "1:67434621596:web:316a0be48556b7c33f1b59",
measurementId: "G-F61P6QZ947"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export {analytics, auth, firestore, storage}