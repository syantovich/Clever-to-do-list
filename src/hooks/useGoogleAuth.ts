import { IsLoadingEnum, setLoading } from '../store/isLoading/isLoadingSlice';
import {
  AuthError,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
} from 'firebase/auth';
import { login } from '../store/user/userSlice';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const useGoogleAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const googleAuth = () => {
    dispatch(setLoading(IsLoadingEnum.pending));
    const auth = getAuth();
    const google = new GoogleAuthProvider();
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
        navigator.userAgent,
      )
    ) {
      signInWithRedirect(auth, google);
    } else {
      signInWithPopup(auth, google)
        .then(result => {
          dispatch(
            login({
              email: result.user.email,
              name: result.user.displayName,
              uid: result.user.uid,
            }),
          );
          navigate('../');
          toast.success('Entered');
        })
        .catch((error: AuthError) => {
          toast.error(error.message);
        })
        .finally(() => {
          dispatch(setLoading(IsLoadingEnum.success));
        });
    }
  };
  return { googleAuth };
};
export default useGoogleAuth;
