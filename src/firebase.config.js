// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC3xtHPE0JianhEhQtQ4h2ctYBByinKmEw",
  authDomain: "react-chat-app-5c230.firebaseapp.com",
  projectId: "react-chat-app-5c230",
  storageBucket: "react-chat-app-5c230.appspot.com",
  messagingSenderId: "49682887918",
  appId: "1:49682887918:web:5b110cbb14c6b35b21afff"
};

// Initialize Firebase
export const APP = initializeApp(firebaseConfig);
export const AUTH = getAuth(APP);
export const STORAGE = getStorage();
export const DB = getFirestore(APP);









// // Import the functions you need from the SDKs you need
// import firebase from "firebase/compat/app";
// import { initializeApp } from "firebase/app";
// import { getFirestore, collection, getDocs } from 'firebase/firestore';
// import { getAuth, GoogleAuthProvider } from "firebase/auth";

// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBccAghCIHRSgnOVjT4504uar57y2tg8OE",
//   authDomain: "whatsapp-demo-5de2c.firebaseapp.com",
//   projectId: "whatsapp-demo-5de2c",
//   storageBucket: "whatsapp-demo-5de2c.appspot.com",
//   messagingSenderId: "300472060554",
//   appId: "1:300472060554:web:6dc89a34f56af0872dbb73"
// };

// // Initialize Firebase
// const APP = !firebase.apps.length ? initializeApp(firebaseConfig) : firebase.app();

// const DB = getFirestore(APP);
// const AUTH = getAuth(APP);
// const PROVIDER = new GoogleAuthProvider();
// // const SIGN_IN_WITH_PROVIDER = signInWithPopup(AUTH, PROVIDER);

// export { APP, DB, AUTH, PROVIDER };
 