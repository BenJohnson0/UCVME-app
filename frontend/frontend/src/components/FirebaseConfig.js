// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const FirebaseConfig = {
  apiKey: "AIzaSyAaz4W9IHhP4HiNwWrC9QIXGDC9SKr2rH4",
  authDomain: "fir-upload-e6811.firebaseapp.com",
  projectId: "fir-upload-e6811",
  storageBucket: "fir-upload-e6811.appspot.com",
  messagingSenderId: "566333731793",
  appId: "1:566333731793:web:cda5af3a4796b7191066f0"
};

// Initialize Firebase
export const app = initializeApp(FirebaseConfig);
export const storage = getStorage(app);