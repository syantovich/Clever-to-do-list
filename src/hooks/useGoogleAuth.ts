import { useNavigate } from 'react-router-dom';

import user from '../store/user/user';
import { useEffect } from 'react';
import isLoading, { IsLoadingEnum } from '../store/isLoading/isLoading';

const useGoogleAuth = () => {
  const navigate = useNavigate();
  useEffect(() => {
    isLoading.setLoading(IsLoadingEnum.success);
  }, []);
  const googleAuth = () => {
    user.signWithGoogle().then(() => {
      navigate('../');
    });
  };
  return { googleAuth };
};
export default useGoogleAuth;
