import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthError } from 'firebase/auth';
import { toast } from 'react-toastify';
import user from '../store/user/user';

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
  const authWithPass = () => {
    user
      .signIn(email!, password)
      .then(() => {
        navigate('../');
      })

      .catch((err: AuthError) => {
        toast.error(err.message);
      });
  };
  return { getEmail, getPassword, authWithPass, email, password };
};

export default useAuthWithPass;
