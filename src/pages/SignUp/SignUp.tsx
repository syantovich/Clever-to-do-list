import React from 'react';
import { Box, Button, Grid, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import './SignUp.css';
import GoogleIcon from '@mui/icons-material/Google';
import LoadingSpinner from '../../components/LoadingSpiner/LoadingSpiner';
import useGoogleAuth from '../../hooks/useGoogleAuth';
import useCreateUser from '../../hooks/useCreateUser';
import { observer } from 'mobx-react-lite';

const SignUp = observer(() => {
  const { googleAuth } = useGoogleAuth();
  const {
    errorConfirmPass,
    errorEmail,
    errorName,
    errorPassword,
    getConfirmPass,
    getName,
    getEmail,
    getPassword,
    name,
    email,
    password,
    confirmPass,
    createUser,
  } = useCreateUser();

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
                onChange={getName}
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
                onChange={getEmail}
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
                onChange={getPassword}
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
                onChange={getConfirmPass}
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
});
export default SignUp;
