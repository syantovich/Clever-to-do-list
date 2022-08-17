import React, { useEffect, useState } from 'react';
import * as validReg from '../regexp/validators';
import { AuthError } from 'firebase/auth';
import { toast } from 'react-toastify';
import user from '../store/user/user';

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
    if (!errorName && !errorEmail && !errorConfirmPass && !errorPassword) {
      user
        .signUp(name, email, password)
        .catch((error: AuthError) => toast.error(error.message));
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
