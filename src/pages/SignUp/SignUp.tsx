import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Grid, TextField } from '@mui/material';
import { login } from '../../store/user/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import './SignUp.css';
// import {
//   getAuth,
//   createUserWithEmailAndPassword,
//   AuthError,
//   GoogleAuthProvider,
//   signInWithRedirect,
//   signInWithPopup,
// } from 'firebase/auth';
// import * as validReg from '../../regexp/validators';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  // const [errorName, setErrorName] = useState(false);
  // const [errorEmail, setErrorEmail] = useState(false);
  // const [errorPassword, setErrorPassword] = useState(false);
  // const [errorConfirmPass, setErrorConfirmPass] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  // useEffect(() => {
  //   if (!validReg.email.test(email)) {
  //     setErrorEmail(true);
  //   } else {
  //     setErrorEmail(false);
  //   }
  // }, [email]);
  // useEffect(() => {
  //   if (validReg.pass.test(password)) {
  //     setErrorPassword(false);
  //   } else {
  //     setErrorPassword(true);
  //   }
  // }, [password]);
  // useEffect(() => {
  //   if (validReg.name.test(name)) {
  //     setErrorName(false);
  //   } else {
  //     setErrorName(true);
  //   }
  // }, [name]);
  // useEffect(() => {
  //   if (confirmPass === password) {
  //     setErrorConfirmPass(false);
  //   } else {
  //     setErrorConfirmPass(true);
  //   }
  // }, [confirmPass]);

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
        <Grid item xs={12}>
          <TextField
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
        <Grid item xs={12}>
          <Button
            variant="contained"
            onClick={() => {
              dispatch(login({ name: 'Alexey', email }));
              navigate('../');
            }}>
            Login
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
