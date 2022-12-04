//firebase.js
import firebase from "firebase/compat/app"
import 'firebase/compat/firestore';
import 'firebase/storage';
import {initializeApp} from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

//전규한 파이어 베이스
const firebaseConfig = {
  apiKey: "AIzaSyBurxEEhA3aHtbt_ZmuiidIO1DN4zttzoc",
  authDomain: "firstproject-4d0dc.firebaseapp.com",
  projectId: "firstproject-4d0dc",
  storageBucket: "firstproject-4d0dc.appspot.com",
  messagingSenderId: "937511952405",
  appId: "1:937511952405:web:dfe14a8e01e9a5edeb6e1c",
  measurementId: "G-H66KBPYK5D"
};
const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);
export const storage = getStorage(app);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();


export const signInWithGoogle = () => {
  signInWithPopup(auth, provider).then((result) => {
    console.log(result);
    const name = result.user.displayName;
    const email = result.user.email;
    const profilePic = result.user.photoURL;
    
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("profilePic", profilePic);
  }).catch((error) => {
    console.log(error);
  })
};



//민형님 파이어 베이스
// const firebaseConfig = {
//     // firebase 설정과 관련된 개인 정보
//     apiKey: "AIzaSyBs0S61mQ1_FVuZOXXse8tcdBPjdsgHGVQ",
//     authDomain: "isour-6fdb0.firebaseapp.com",
//     projectId: "isour-6fdb0",
//     storageBucket: "isour-6fdb0.appspot.com",
//     messagingSenderId: "401033832008",
//     appId: "1:401033832008:web:2e89eafdf0e03229ebda7d",
//     measurementId: "G-R236HPRYRK"
// };

// firebaseConfig 정보로 firebase 시작
firebase.initializeApp(firebaseConfig);

// firebase의 firestore 인스턴스를 변수에 저장
const firestore = firebase.firestore();

// 필요한 곳에서 사용할 수 있도록 내보내기
// 다른 곳에서 불러올때 firestore로 불러와야 함!!
export { firestore };

firebase.initializeApp(firebaseConfig);
// getAnalytics(app);
// const storage = getStorage(app);
// export {storage};
// export const db = getDatabase(app);
//  export const db = getFirestore();