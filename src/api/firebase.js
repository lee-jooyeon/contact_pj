import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, set, remove, update } from 'firebase/database';

import { v4 as uuidv4 } from 'uuid';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDERID,
  appId: process.env.REACT_APP_APPID,
  measurementId: process.env.REACT_APP_MEASUREMENTID,
  databaseURL: process.env.REACT_APP_DATABASEURL,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

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
