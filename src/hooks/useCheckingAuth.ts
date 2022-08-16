import { useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { login } from '../store/user/userSlice';
import { useDispatch } from 'react-redux';
import { IsLoadingEnum, setLoading } from '../store/isLoading/isLoadingSlice';

const useCheckingAuth = () => {
  let isUser = false;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setLoading(IsLoadingEnum.pending));
    getAuth().onAuthStateChanged(result => {
      dispatch(
        login({
          name: result?.displayName,
          email: result?.email,
          uid: result?.uid,
        }),
      );
      isUser = true;
      dispatch(setLoading(IsLoadingEnum.success));
    });
  }, []);
  return isUser;
};
export default useCheckingAuth;
