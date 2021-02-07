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

Firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);

export default Firebase;

export const loginWithFirebase = async (email: string, password: string) => {
    try {
        const userCredential = await Firebase.auth().signInWithEmailAndPassword(email, password);
        return userCredential;
    } catch (error) {
        throw error;
        // if(error.code === "auth/wrong-password") {
        //     return error.code+'';
        // } else {
        //     return error.message+'';
        // }
    }
}

export const refreshLoginWithFirebase = async () => {
    try {
        const user = await Firebase.auth().currentUser;
        if(user) {
            const idTokenResult = await user.getIdTokenResult(true);
            console.log(idTokenResult);
            const isAdmin = idTokenResult.claims.admin ? !!idTokenResult.claims.admin : false;
            return {
                displayName: user.displayName ? user.displayName : '',
                isAdmin
            }
        }
        return null;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const signupWithFirebase = async (email: string, password: string) => {
    const userCredential = await Firebase.auth().createUserWithEmailAndPassword(email, password);
    return userCredential;
}

export const logoutWithFirebase = async () => {
    Firebase.auth().signOut();
}

export const checkAdminWithFirebase = async (user: firebase.User) => {
    const idTokenResult = await user.getIdTokenResult(true);
    // console.log("idTOken", idTokenResult);
    if(idTokenResult.claims.admin) {
        return true;
    }
    return false;
}