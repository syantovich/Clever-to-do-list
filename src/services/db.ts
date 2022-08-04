import {
  getFirestore,
  Firestore,
  setDoc,
  doc,
  collection,
  updateDoc,
  getDocs,
} from '@firebase/firestore';
import '../firebase';
import { getDoc } from 'firebase/firestore';
import { IinfoPlan } from '../Modal/IinfoPlan';
import { PlanType } from './db.type';

class Db {
  db: Firestore;

  constructor() {
    this.db = getFirestore();
  }

  setUserInfo(name: string | null, email: string | null, uuid: string) {
    return setDoc(doc(collection(this.db, 'usersinfo'), uuid), {
      name,
      email,
      uid: uuid,
    });
  }

  getUserInfo(uuid: string) {
    return getDoc(doc(this.db, 'usersinfo', uuid));
  }

  getPlansOnMonth(month: string) {
    return getDocs(collection(this.db, month));
  }

  updatePlans({
    name,
    desc,
    important,
    date,
    timeStart,
    timeEnd,
    id,
    isFinished,
  }: PlanType) {
    let collecton = date.slice(0, 7);
    let keyInCollection = date.slice(8);
    let addingObj: { [key: string]: IinfoPlan } = {};
    addingObj[id] = {
      name,
      desc,
      important,
      date,
      timeStart,
      timeEnd,
      isFinished,
      id,
    };
    return updateDoc(
      doc(collection(this.db, collecton), keyInCollection),
      addingObj,
    );
  }

  addPlans({
    name,
    desc,
    important,
    date,
    timeStart,
    timeEnd,
    id,
    isFinished,
  }: PlanType) {
    let collecton = date.slice(0, 7);
    let keyInCollection = date.slice(8);
    let addingObj: { [key: string]: IinfoPlan } = {};
    addingObj[id] = {
      name,
      desc,
      important,
      date,
      timeStart,
      timeEnd,
      isFinished,
      id,
    };
    return setDoc(
      doc(collection(this.db, collecton), keyInCollection),
      addingObj,
    );
  }
}

const db = new Db();
export { db };
