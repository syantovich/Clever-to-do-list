import {
  getFirestore,
  Firestore,
  setDoc,
  doc,
  collection,
} from '@firebase/firestore';
import '../firebase';
import { getDoc } from 'firebase/firestore';

class Db {
  db: Firestore;

  constructor() {
    this.db = getFirestore();
  }

  setUserInfo(name: string | null, email: string | null, uid: string) {
    return setDoc(doc(collection(this.db, 'usersinfo'), uid), {
      name,
      email,
      uid,
    });
  }

  getUserInfo(uid: string) {
    return getDoc(doc(this.db, 'usersinfo', uid));
  }
}

const db = new Db();
export { db };
