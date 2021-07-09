import firebase from "firebase";
const firebaseConfig = {
    apiKey: "AIzaSyCgXt1y8xmJGvpEPSbdTXf1B7c38lIILC4",
    authDomain: "chat-app-372.firebaseapp.com",
    projectId: "chat-app-372",
    storageBucket: "chat-app-372.appspot.com",
    messagingSenderId: "228808271979",
    appId: "1:228808271979:web:7afade3cb10d2cc76c692e",
    measurementId: "G-9S588C3ZMD"
  };

  const firebaseApp=firebase.initializeApp(firebaseConfig);
  const db=firebaseApp.firestore();
  const auth =firebase.auth();
  const provider= new firebase.auth.GoogleAuthProvider();
  
  export {auth,provider};
  export default db;
