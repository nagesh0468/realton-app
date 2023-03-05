import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyBGQ1JO-JVyNmv2Y4zinWUHF8Fmq6D4CkA",
    authDomain: "realton-app.firebaseapp.com",
    projectId: "realton-app",
    storageBucket: "realton-app.appspot.com",
    messagingSenderId: "26044248822",
    appId: "1:26044248822:web:0644a1c6e4d4239475b2d7"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const storage = getStorage(app);

  export { auth,db,storage };