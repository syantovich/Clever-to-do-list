import React from 'react';
import { Grid } from '@mui/material';
import './Header.css';
import Logo from '../Logo/Logo';
import ButtonLink from '../ButtonLink/ButtonLink';
import ButtonSign from '../ButtonsSing/ButtonSign';
import user from '../../store/user/user';
import { observer } from 'mobx-react-lite';

const Header = observer(() => {
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
          <ButtonLink to={user.name ? 'plans' : 'signin'}>Plans</ButtonLink>
        </Grid>
        <Grid item>
          {user.name ? (
            <ButtonLink to={'profile'}>Profile</ButtonLink>
          ) : (
            <ButtonSign />
          )}
        </Grid>
      </Grid>
    </header>
  );
});

export default Header;
