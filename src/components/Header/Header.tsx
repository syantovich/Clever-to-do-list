import React from 'react';
import { useSelector } from 'react-redux';
import { userSelector } from '../../store/user/selector';
import { Grid, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import logo from '../../img/Time Square.svg';

const Header = () => {
  const { name } = useSelector(userSelector);
  const navigate = useNavigate();
  return (
    <header>
      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent="flex-start"
        alignItems="stretch"
        className={'button_entry'}>
        <Grid item xs={4}>
          <div className={'logo'} onClick={() => navigate('../')}>
            <img src={logo} alt="logo" height={'100%'} /> Plan your day
          </div>
        </Grid>
        <Grid item xs={3}>
          <Link to={name ? 'plans' : 'signin'}>
            <Button>Plans</Button>
          </Link>
        </Grid>
        <Grid item>
          {name ? (
            <Link to="profile">
              <Button>{name}</Button>
            </Link>
          ) : (
            <Grid container spacing={2}>
              <Grid item xs={5}>
                <Button variant={'text'} onClick={() => navigate('./signin')}>
                  Sign In
                </Button>
              </Grid>
              <Grid item xs={5}>
                <Button variant={'text'} onClick={() => navigate('./signup')}>
                  Sign Up
                </Button>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
    </header>
  );
};

export default Header;
