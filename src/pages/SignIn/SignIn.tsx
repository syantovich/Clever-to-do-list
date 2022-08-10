import { Button, TextField, Grid, Box } from '@mui/material';
import React, { useState } from 'react';
import {
  AuthError,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { login } from '../../store/user/userSlice';
import { db } from '../../services/db';
import GoogleIcon from '@mui/icons-material/Google';

import './SignIn.css';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const authWithPass = () => {
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
      });
  };
  const googleAuth = () => {
    const auth = getAuth();
    const google = new GoogleAuthProvider();

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
      });
  };
  return (
    <Box className={'sign'}>
      <Box className={'center around'}>
        <Grid
          container
          spacing={2}
          direction={'column'}
          justifyContent="center"
          alignItems="center"
          className={'signin'}>
          <Grid item xs={12}>
            <TextField
              id="input_email"
              label="Email"
              variant="outlined"
              className={'inputText'}
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
              className={'inputText'}
              value={password}
              onChange={value => {
                setPassword(value.target.value);
              }}
            />
          </Grid>
          <Grid item xs={5}>
            <Grid container spacing={2}>
              <Grid item>
                <Button
                  variant="contained"
                  onClick={() => {
                    authWithPass();
                  }}>
                  Sign In
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  onClick={() => {
                    googleAuth();
                  }}>
                  {<GoogleIcon />}
                </Button>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Link to={'../signup'}>Sign Up</Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
export default SignIn;
