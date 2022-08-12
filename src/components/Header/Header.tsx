import React from 'react';
import { useSelector } from 'react-redux';
import { userSelector } from '../../store/user/selector';
import { Grid } from '@mui/material';
import './Header.css';
import Logo from '../Logo/Logo';
import ButtonLink from '../ButtonLink/ButtonLink';
import ButtonSign from '../ButtonsSing/ButtonSign';

const Header = () => {
  const { name } = useSelector(userSelector);
  return (
    <header>
      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent="flex-start"
        alignItems="stretch"
        className={'button_entry'}>
        <Grid item>
          <Logo />
        </Grid>
        <Grid item>
          <ButtonLink to={name ? 'plans' : 'signin'}>Plans</ButtonLink>
        </Grid>
        <Grid item>
          {name ? (
            <ButtonLink to={'profile'}>Profile</ButtonLink>
          ) : (
            <ButtonSign />
          )}
        </Grid>
      </Grid>
    </header>
  );
};

export default Header;
