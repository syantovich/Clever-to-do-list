import { Box, Button, Grid, TextField } from '@mui/material';
import React from 'react';
import GoogleIcon from '@mui/icons-material/Google';
import './SignIn.css';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpiner/LoadingSpiner';
import useAuthWithPass from '../../hooks/useAuthWithPass';
import useGoogleAuth from '../../hooks/useGoogleAuth';
import { observer } from 'mobx-react-lite';

const SignIn = observer(() => {
  const { getEmail, getPassword, authWithPass, email, password } =
    useAuthWithPass();
  const { googleAuth } = useGoogleAuth();
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
            className={'signin'}>
            <Grid item xs={12}>
              <TextField
                id="input_email"
                label="Email"
                variant="outlined"
                className={'inputText'}
                value={email}
                onChange={getEmail}
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
                onChange={getPassword}
              />
            </Grid>
            <Grid item xs={5}>
              <Grid container spacing={2}>
                <Grid item>
                  <Button variant="contained" onClick={authWithPass}>
                    Sign In
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
              <Link to={'../signup'}>Sign Up</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </LoadingSpinner>
  );
});
export default SignIn;
