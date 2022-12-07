// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import {getFirestore} from "firebase/firestore"
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDjwfyXL1yuh31xIZjkPozMDkBjdLoFP10",
//   authDomain: "farm-rexxord.firebaseapp.com",
//   projectId: "farm-rexxord",
//   storageBucket: "farm-rexxord.appspot.com",
//   messagingSenderId: "861253793046",
//   appId: "1:861253793046:web:986715fcec2aad31898c37"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export const db = getFirestore(app)









// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getDatabase} from"firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAygFmC-fuKmUkWwy0jvYlINRkycNR3QpY",
  authDomain: "fb-crud-10eb9.firebaseapp.com",
  projectId: "fb-crud-10eb9",
  storageBucket: "fb-crud-10eb9.appspot.com",
  messagingSenderId: "751757775811",
  appId: "1:751757775811:web:d6068b17f36bf4823f6376"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db =getDatabase(app)