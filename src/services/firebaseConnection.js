import firebase from "firebase/app";
import 'firebase/database';
import 'firebase/auth';

let firebaseConfig = {
  apiKey: "AIzaSyCIkVNjjPe2azn71eVEygt-gkfT3FoIuLU",
  authDomain: "tarefas-235e6.firebaseapp.com",
  projectId: "tarefas-235e6",
  storageBucket: "tarefas-235e6.appspot.com",
  messagingSenderId: "359626579087",
  appId: "1:359626579087:web:1bd66784b920c120d9a4fa"
};

//caso não exista uma base, será iniciada essa do IF, caso já exista não irá iniciar outra
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export default firebase;