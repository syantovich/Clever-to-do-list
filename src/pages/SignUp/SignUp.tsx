import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Button, Grid, TextField } from '@mui/material';
import { login } from '../../store/user/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import './SignUp.css';
import {
  AuthError,
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
} from 'firebase/auth';
import { db } from '../../services/db';

import * as validReg from '../../regexp/validators';
import { toast } from 'react-toastify';
import GoogleIcon from '@mui/icons-material/Google';
import LoadingSpinner from '../../components/LoadingSpiner/LoadingSpiner';
import {
  IsLoadingEnum,
  setLoading,
} from '../../store/isLoading/isLoadingSlice';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [errorName, setErrorName] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorConfirmPass, setErrorConfirmPass] = useState(false);
  const navigate = useNavigate();

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
  const googleAuth = (): void => {
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

  return (
    <LoadingSpinner>
      <Box className={'sign'}>
        <Box className={'center around'}>
          <Grid
            container
            spacing={2}
            direction={'column'}
            justifyContent="center"
            alignItems="center"
            className={'signup'}>
            <Grid item xs={12}>
              <TextField
                error={errorName}
                id="input_name"
                label="Name"
                variant="outlined"
                className={'inputText'}
                value={name}
                onChange={(
                  event: React.ChangeEvent<
                    HTMLInputElement | HTMLTextAreaElement
                  >,
                ) => {
                  setName(event.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={errorEmail}
                id="input_email"
                label="Email"
                className={'inputText'}
                variant="outlined"
                value={email}
                onChange={(
                  event: React.ChangeEvent<
                    HTMLInputElement | HTMLTextAreaElement
                  >,
                ) => {
                  setEmail(event.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={errorPassword}
                id="input_password"
                label="password"
                variant="outlined"
                className={'inputText'}
                type={'password'}
                value={password}
                onChange={(
                  event: React.ChangeEvent<
                    HTMLInputElement | HTMLTextAreaElement
                  >,
                ) => {
                  setPassword(event.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={errorConfirmPass}
                id="input_confirm_password"
                label="Confirm password"
                variant="outlined"
                className={'inputText'}
                type={'password'}
                value={confirmPass}
                onChange={(
                  event: React.ChangeEvent<
                    HTMLInputElement | HTMLTextAreaElement
                  >,
                ) => {
                  setConfirmPass(event.target.value);
                }}
              />
            </Grid>
            <Grid item xs={5}>
              <Grid container spacing={2}>
                <Grid item>
                  <Button variant="contained" onClick={createUser}>
                    Sign Up
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" onClick={googleAuth}>
                    {<GoogleIcon />}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Link to={'../signin'}>Sign In</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </LoadingSpinner>
  );
};
export default SignUp;
