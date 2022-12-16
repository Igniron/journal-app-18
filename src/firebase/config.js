// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCdk6H7jzpnUco5hkkGpjQDroRIC18Blcs",
  authDomain: "journal-app-react-18.firebaseapp.com",
  projectId: "journal-app-react-18",
  storageBucket: "journal-app-react-18.appspot.com",
  messagingSenderId: "403446635734",
  appId: "1:403446635734:web:bcdf2f705cfc4cb046fd77"
};

// Initialize Firebase
const FirebaseApp  = initializeApp( firebaseConfig );
const FirebaseAuth = getAuth( FirebaseApp );
const FirebaseDB   = getFirestore ( FirebaseApp );

export {
    FirebaseApp,
    FirebaseAuth,
    FirebaseDB,
}