import React from 'react';
import { Grid } from '@mui/material';
import ButtonLink from '../ButtonLink/ButtonLink';

const ButtonSign = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={5}>
        <ButtonLink to={'signin'}>Sign in</ButtonLink>
      </Grid>
      <Grid item xs={5}>
        <ButtonLink to={'signup'}>Sign Up</ButtonLink>
      </Grid>
    </Grid>
  );
};
export default ButtonSign;
