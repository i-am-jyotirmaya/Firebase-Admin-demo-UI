import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDP3deLJCH382aQOsukF0T_pZfQJfk1oIg",
    authDomain: "flutter-app-ca6d2.firebaseapp.com",
    databaseURL: "https://flutter-app-ca6d2.firebaseio.com",
    projectId: "flutter-app-ca6d2",
    storageBucket: "flutter-app-ca6d2.appspot.com",
    messagingSenderId: "524450293536",
    appId: "1:524450293536:web:3b2cc53a502bd0ab181945",
    measurementId: "G-1K77799FDV"
};

const Firebase = firebase.initializeApp(firebaseConfig);

export default Firebase;