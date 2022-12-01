//firebase.js
import firebase from "firebase/compat/app"
import 'firebase/compat/firestore';
import 'firebase/storage';
import {initializeApp} from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    // firebase 설정과 관련된 개인 정보
    apiKey: "AIzaSyBs0S61mQ1_FVuZOXXse8tcdBPjdsgHGVQ",
    authDomain: "isour-6fdb0.firebaseapp.com",
    projectId: "isour-6fdb0",
    storageBucket: "isour-6fdb0.appspot.com",
    messagingSenderId: "401033832008",
    appId: "1:401033832008:web:2e89eafdf0e03229ebda7d",
    measurementId: "G-R236HPRYRK"
};

// firebaseConfig 정보로 firebase 시작
firebase.initializeApp(firebaseConfig);

// firebase의 firestore 인스턴스를 변수에 저장
const firestore = firebase.firestore();

// 필요한 곳에서 사용할 수 있도록 내보내기
// 다른 곳에서 불러올때 firestore로 불러와야 함!!
export { firestore };

firebase.initializeApp(firebaseConfig);
// getAnalytics(app);
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export {storage};
// export const db = getDatabase(app);
//  export const db = getFirestore();