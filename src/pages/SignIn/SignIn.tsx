import { Button, TextField, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import { login } from '../../store/user/userSlice';

import './SignIn.css';
import { Link, useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const dispatch = useDispatch();
  useEffect(() => {
    console.log(`${email} ${password}`);
  }, [email, password]);
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
        <Grid item xs={12}>
          {' '}
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
          <Link to={'../signup'}>Sign Up</Link>
        </Grid>
      </Grid>
    </section>
  );
};
export default SignIn;
