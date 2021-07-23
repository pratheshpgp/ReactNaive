import firebase from 'firebase/app'
import 'firebase/auth';
import 'firebase/firestore'


// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyA1Lw57mHiaybY73l3aorEOcRqc4OHvSFA",
    authDomain: "chatproject-13b24.firebaseapp.com",
    projectId: "chatproject-13b24",
    storageBucket: "chatproject-13b24.appspot.com",
    messagingSenderId: "252318879768",
    appId: "1:252318879768:web:1ea6f8ec3f5ad36772336d"
  };

  let app;

  if(firebase.apps.length === 0)
  {
   app = firebase.initializeApp(firebaseConfig);
  }
  else{
      app = firebase.app();
  }

  const db = app.firestore();
  const auth = firebase.auth();

  export {db, auth}