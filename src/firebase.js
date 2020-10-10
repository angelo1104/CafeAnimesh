import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAbUBehUj3bRXkAM6IqCh2O93-48TGp4HQ",
    authDomain: "mystic-berm-278710.firebaseapp.com",
    databaseURL: "https://mystic-berm-278710.firebaseio.com",
    projectId: "mystic-berm-278710",
    storageBucket: "mystic-berm-278710.appspot.com",
    messagingSenderId: "662599816832",
    appId: "1:662599816832:web:220197903805d720497865",
    measurementId: "G-WEG5HLQ95T"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)

const auth = firebaseApp.auth()
const database = firebaseApp.firestore()
const storage = firebaseApp.storage()

export {auth,database,storage}