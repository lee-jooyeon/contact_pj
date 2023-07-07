import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, set, remove, update } from 'firebase/database';
import { getAuth, signInWithPopup, signOut, onAuthStateChanged, GoogleAuthProvider } from 'firebase/auth';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  databaseURL: process.env.REACT_APP_DATABASEURL,
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();
const provider = new GoogleAuthProvider();

// auth
export async function login(){
  return signInWithPopup(auth, provider)
  .then((result) => {
    const user = result.user;
    return user; 
  })
  .catch(console.error);
}

export async function logout(){
  return signOut(auth)
  .catch(console.error);
}

export function onUserStateChange(callback){
  onAuthStateChanged(auth, (user) => {
    callback(user);
  });
}

// contact API
export async function getLists() {
  return get(ref(database, 'lists')).then(snapshot => {
    if (snapshot.exists()) {
      return Object.values(snapshot.val());
    }
    return [];
  });
}

export async function addLists(userData, imgUrl) {
  const id = uuidv4();
  set(ref(database, `lists/${id}`), {
    ...userData,
    id,
    group: userData.group,
    name: userData.name,
    number: userData.number,
    imgUrl,
  });
}

export async function updateList(id, userData, imgUrl) {
  update(ref(database, `lists/${id}`), {
    ...userData,
    id,
    userData,
    imgUrl: imgUrl || userData.imgUrl,
  });
}

export async function deleteList(id) {
  remove(ref(database, `lists/${id}`));
}
