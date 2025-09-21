// database/firebase.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Indsæt din egen config her fra Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyBf8T8s7G58z_VPzIE0lVbLYlBYIGgA-Yw",
  authDomain: "chat-forum-d15d7.firebaseapp.com",
  databaseURL: "https://chat-forum-d15d7-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "chat-forum-d15d7",
  storageBucket: "chat-forum-d15d7.firebasestorage.app",
  messagingSenderId: "628804860305",
  appId: "1:628804860305:web:237566afdf0f793ff08230"
};

// Init kun én gang
export const firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Brug RTDB-URL’en fra Realtime Database (Belgium = europe-west1)
export const rtdb = getDatabase(
  firebaseApp,
  "https://chat-forum-d15d7-default-rtdb.europe-west1.firebasedatabase.app"
);
