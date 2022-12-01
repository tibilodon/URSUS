// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCgEhBDK69oHGWmgavukailrSwUQkvVOjM",
  authDomain: "ursus-4c6be.firebaseapp.com",
  projectId: "ursus-4c6be",
  storageBucket: "ursus-4c6be.appspot.com",
  messagingSenderId: "471814446513",
  appId: "1:471814446513:web:c48b8b34f050198f97f190",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
