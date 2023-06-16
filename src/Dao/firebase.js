// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDLNHUPTQZPQ6L0_41davDQVV68S7QQuFo",
    authDomain: "upload-file-1e59d.firebaseapp.com",
    projectId: "upload-file-1e59d",
    storageBucket: "upload-file-1e59d.appspot.com",
    messagingSenderId: "1065542435315",
    appId: "1:1065542435315:web:52d48240e14b1e1280d286",
    measurementId: "G-VCJ72CYCLJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const fireBaseStorage = getStorage(app);