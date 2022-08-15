import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as validReg from '../regexp/validators';
import { IsLoadingEnum, setLoading } from '../store/isLoading/isLoadingSlice';
import {
  AuthError,
  createUserWithEmailAndPassword,
  getAuth,
} from 'firebase/auth';
import { toast } from 'react-toastify';
import { login } from '../store/user/userSlice';
import { db } from '../services/db';

const useCreateUser = (
  defaultName = '',
  defaultEmail = '',
  defaultPassword = '',
  defaultConfirmPass = '',
) => {
  const [name, setName] = useState(defaultName);
  const [email, setEmail] = useState(defaultEmail);
  const [password, setPassword] = useState(defaultPassword);
  const [confirmPass, setConfirmPass] = useState(defaultConfirmPass);
  const [errorName, setErrorName] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorConfirmPass, setErrorConfirmPass] = useState(false);
  const navigate = useNavigate();

  const getName = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setName(event.target.value);
  };
  const getEmail = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setEmail(event.target.value);
  };
  const getPassword = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setPassword(event.target.value);
  };
  const getConfirmPass = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setConfirmPass(event.target.value);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    if (!validReg.email.test(email)) {
      setErrorEmail(true);
    } else {
      setErrorEmail(false);
    }
  }, [email]);
  useEffect(() => {
    if (validReg.pass.test(password)) {
      setErrorPassword(false);
    } else {
      setErrorPassword(true);
    }
  }, [password]);
  useEffect(() => {
    if (validReg.name.test(name)) {
      setErrorName(false);
    } else {
      setErrorName(true);
    }
  }, [name]);
  useEffect(() => {
    if (confirmPass === password) {
      setErrorConfirmPass(false);
    } else {
      setErrorConfirmPass(true);
    }
  }, [confirmPass]);
  const createUser = (): void => {
    dispatch(setLoading(IsLoadingEnum.pending));
    if (!errorName && !errorEmail && !errorConfirmPass && !errorPassword) {
      const auth = getAuth();
      let promise = createUserWithEmailAndPassword(auth, email, password);
      toast
        .promise(promise, {
          pending: 'Loading',
          success: 'OK',
        })
        .then(result => {
          toast.success('User created');
          dispatch(login({ name, email, uid: result.user.uid }));
          navigate('../');
          return result;
        })
        .then(result => db.setUserInfo(name, email, result.user.uid))
        .catch((error: AuthError) => toast.error(error.message))
        .finally(() => {
          dispatch(setLoading(IsLoadingEnum.success));
        });
    } else {
      toast.error('You need to check all areas');
    }
  };
  return {
    errorConfirmPass,
    errorEmail,
    errorName,
    errorPassword,
    getConfirmPass,
    getName,
    getEmail,
    getPassword,
    createUser,
    name,
    email,
    password,
    confirmPass,
  };
};

export default useCreateUser;
