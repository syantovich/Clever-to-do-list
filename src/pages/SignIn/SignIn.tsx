import { Button, TextField, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import {
  AuthError,
  getAuth,
  GoogleAuthProvider,
  // GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  // signInWithPopup,
} from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { login } from '../../store/user/userSlice';

import './SignIn.css';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const dispatch = useDispatch();
  useEffect(() => {
    console.log(`${email} ${password}`);
  }, [email, password]);
  const authWithPass = () => {
    let auth = getAuth();
    const promise = signInWithEmailAndPassword(auth, email, password);
    toast.promise(promise, {
      pending: 'Loading',
      success: 'OK',
    });
    promise
      .then(() => {
        dispatch(login({ name: email, email }));
        navigate('../');
      })
      .catch((err: AuthError) => {
        toast.error(err.message);
      });
  };
  const googleAuth = () => {
    const auth = getAuth();
    const google = new GoogleAuthProvider();

    signInWithPopup(auth, google)
      .then(result => {
        console.log(result);
        dispatch(
          login({ email: result.user.email, name: result.user.displayName }),
        );
        navigate('../');
        toast.success('Entered');
      })
      .catch((error: AuthError) => {
        toast.error(error.message);
      });
  };
  return (
    <section className={'center'}>
      <Grid
        container
        spacing={2}
        direction={'column'}
        justifyContent="center"
        alignItems="center">
        <Grid item xs={12}>
          <TextField
            id="input_email"
            label="Email"
            variant="outlined"
            value={email}
            onChange={value => {
              setEmail(value.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="input_password"
            label="password"
            variant="outlined"
            type={'password'}
            value={password}
            onChange={value => {
              setPassword(value.target.value);
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="contained"
            onClick={() => {
              authWithPass();
            }}>
            Sign In
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="contained"
            onClick={() => {
              googleAuth();
            }}>
            Continue with Google
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Link to={'../signup'}>Sign Up</Link>
        </Grid>
      </Grid>
    </section>
  );
};
export default SignIn;
