import {
  getFirestore,
  Firestore,
  setDoc,
  doc,
  collection,
  updateDoc,
  deleteField,

  // getDocs,
} from '@firebase/firestore';
import '../firebase';
import { getDoc } from 'firebase/firestore';
import { IinfoPlan } from '../pages/Plans/IinfoPlan';
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

  getPlansOnMonth(email: string, month: string) {
    return getDoc(doc(this.db, email, month));
  }

  async deletePlan(email: string, date: string, id: string) {
    let collecton = date.slice(0, 7);
    let delObj: any = {};
    delObj[`${date.slice(8)}.${id}`] = deleteField();
    return updateDoc(doc(this.db, email, collecton), delObj);
  }

  async updatePlans({
    email,
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
    let obj: any = {};
    obj[`${keyInCollection}.${id}`] = {
      name,
      desc,
      important,
      date,
      timeStart,
      timeEnd,
      isFinished,
      id,
    };
    return updateDoc(doc(this.db, email, collecton), obj);
  }

  addPlans({
    email,
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
    let obj: { [key: string]: { [uid: string]: IinfoPlan } } = {};
    obj[keyInCollection] = addingObj;
    return setDoc(doc(this.db, email, collecton), obj);
  }
}

const db = new Db();
export { db };
