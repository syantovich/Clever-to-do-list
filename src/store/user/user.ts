import { makeAutoObservable } from 'mobx';
import {
  AuthError,
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  signOut,
} from 'firebase/auth';
import { toast } from 'react-toastify';
import { db } from '../../services/db';
import isLoading, { IsLoadingEnum } from '../isLoading/isLoading';

class User {
  name: string | undefined | null = undefined;

  email: string | undefined | null = undefined;

  uid: string | undefined | null = undefined;

  constructor() {
    makeAutoObservable(this);
  }

  signIn(email: string, password: string) {
    isLoading.setLoading(IsLoadingEnum.pending);
    let auth = getAuth();
    const promise = signInWithEmailAndPassword(auth, email, password);
    return toast
      .promise(promise, {
        pending: 'Loading',
        success: 'OK',
      })
      .then(result => db.getUserInfo(result.user.uid))
      .then(res => {
        let result = res.data();

        if (result) {
          this.name = result.name;
          this.email = result.email;
          this.uid = result.uid;
        }
      })
      .catch((err: AuthError) => {
        toast.error(err.message);
      })
      .finally(() => {
        isLoading.setLoading(IsLoadingEnum.success);
      });
  }

  signUp(name: string, email: string, password: string) {
    isLoading.setLoading(IsLoadingEnum.pending);
    const auth = getAuth();
    let promise = createUserWithEmailAndPassword(auth, email, password);
    return toast
      .promise(promise, {
        pending: 'Loading',
        success: 'OK',
      })
      .then(result => {
        toast.success('User created');
        this.email = email;
        this.name = name;
        this.uid = result.user.uid;
        return result;
      })
      .then(result => db.setUserInfo(name, email, result.user.uid))
      .catch((error: AuthError) => toast.error(error.message))
      .finally(() => {
        isLoading.setLoading(IsLoadingEnum.success);
      });
  }

  signWithGoogle() {
    isLoading.setLoading(IsLoadingEnum.pending);

    const auth = getAuth();
    const google = new GoogleAuthProvider();
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
        navigator.userAgent,
      )
    ) {
      return signInWithRedirect(auth, google);
    } else {
      return signInWithPopup(auth, google)
        .then(result => {
          this.email = result.user.email;
          this.name = result.user.displayName;
          this.uid = result.user.uid;
          toast.success('Entered');
          console.log(this);
        })

        .finally(() => {
          isLoading.setLoading(IsLoadingEnum.success);
        })
        .catch((error: AuthError) => {
          toast.error(error.message);
        });
    }
  }

  signOut() {
    let auth = getAuth();
    return signOut(auth).then(() => {
      this.email = undefined;
      this.name = undefined;
      this.uid = undefined;
    });
  }

  checkingUser() {
    getAuth().onAuthStateChanged(result => {
      this.email = result?.email;
      this.name = result?.displayName;
      this.uid = result?.uid;
    });
  }
}
export default new User();
