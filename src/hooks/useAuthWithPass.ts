import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { IsLoadingEnum, setLoading } from '../store/isLoading/isLoadingSlice';
import { AuthError, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';
import { db } from '../services/db';
import { login } from '../store/user/userSlice';

const useAuthWithPass = (defaultEmail = '', defaultPassword = '') => {
  const [email, setEmail] = useState(defaultEmail);
  const [password, setPassword] = useState(defaultPassword);
  const navigate = useNavigate();

  const getPassword = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setPassword(event.target.value);
  };
  const getEmail = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setEmail(event.target.value);
  };
  const dispatch = useDispatch();
  const authWithPass = () => {
    dispatch(setLoading(IsLoadingEnum.pending));
    let auth = getAuth();
    const promise = signInWithEmailAndPassword(auth, email, password);
    toast
      .promise(promise, {
        pending: 'Loading',
        success: 'OK',
      })
      .then(result => db.getUserInfo(result.user.uid))
      .then(res => {
        let result = res.data();

        if (result) {
          dispatch(
            login({ name: result.name, email: result.email, uid: result.uid }),
          );
        }

        navigate('../');
      })
      .catch((err: AuthError) => {
        toast.error(err.message);
      })
      .finally(() => {
        dispatch(setLoading(IsLoadingEnum.success));
      });
  };
  return { getEmail, getPassword, authWithPass, email, password };
};

export default useAuthWithPass;
