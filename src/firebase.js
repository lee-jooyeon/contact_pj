// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app"
import 'firebase/compat/firestore';
import {  collection, getDocs, onSnapshot } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDERID,
  appId: process.env.REACT_APP_APPID,
  measurementId: process.env.REACT_APP_MEASUREMENTID,
};

// Initialize Firebase
// firebaseConfig 정보로 firebase 시작
firebase.initializeApp(firebaseConfig);
// firebase의 firestore 인스턴스를 변수에 저장
const db = firebase.firestore();
// 필요한 곳에서 사용할 수 있도록 내보내기
export async function getData(){
  await getDocs(collection(db,'contacts'))
    .then((querySnapshot) => {
      const contactData = querySnapshot.docs.map((doc) => ({...doc.data(), id: doc.id}));
      return contactData;
  });
}

// export async function getData(){
//   return get(ref(db, 'contacts')).then(snapshot => {
//     if(snapshot.exits()){
//       return Object.values(snapshot.val());
//     }
//     return [];
//   })
// }
