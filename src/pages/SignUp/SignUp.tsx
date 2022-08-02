import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Grid, TextField } from '@mui/material';
import { login } from '../../store/user/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import './SignUp.css';
import {
  getAuth,
  createUserWithEmailAndPassword,
  AuthError,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
// import { collection, getDocs, getFirestore } from '@firebase/firestore';

import * as validReg from '../../regexp/validators';
import { toast } from 'react-toastify';

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
  const createUser = () => {
    if (!errorName && !errorEmail && !errorConfirmPass && !errorPassword) {
      const auth = getAuth();
      // const db = getFirestore();
      // try {
      //   let querySnapshot = await getDocs(collection(db, 'usersinfo'));
      //   querySnapshot.forEach(doc => {
      //     console.log(doc);
      //   });
      // } catch (e) {
      //   console.log(e);
      // }

      let promise = createUserWithEmailAndPassword(auth, email, password);
      toast.promise(promise, {
        pending: 'Loading',
        success: 'OK',
      });
      promise
        .then(result => {
          console.log(result);
          toast.success('User created');
          dispatch(login({ name, email }));
          navigate('../');
        })
        .catch((error: AuthError) => toast.error(error.message));
    } else {
      toast.error('You need to check all areas');
    }
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
            error={errorName}
            id="input_name"
            label="Name"
            variant="outlined"
            value={name}
            onChange={value => {
              setName(value.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            error={errorEmail}
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
            error={errorPassword}
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
        <Grid item xs={12}>
          <TextField
            error={errorConfirmPass}
            id="input_confirm_password"
            label="Confirm password"
            variant="outlined"
            type={'password'}
            value={confirmPass}
            onChange={value => {
              setConfirmPass(value.target.value);
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="contained"
            onClick={() => {
              createUser();
            }}>
            Sign Up
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
          <Link to={'../signin'}>Sign In</Link>
        </Grid>
      </Grid>
    </section>
  );
};
export default SignUp;
