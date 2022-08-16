import { useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { login } from '../store/user/userSlice';
import { useDispatch } from 'react-redux';

const useCheckingAuth = () => {
  let isUser = false;
  const dispatch = useDispatch();
  useEffect(() => {
    getAuth().onAuthStateChanged(result => {
      dispatch(
        login({
          name: result?.displayName,
          email: result?.email,
          uid: result?.uid,
        }),
      );
      isUser = true;
    });
  }, []);
  return isUser;
};
export default useCheckingAuth;
