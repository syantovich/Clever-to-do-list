import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from '../../store/user/selector';
import { Grid, Button } from '@mui/material';
import { logout } from '../../store/user/userSlice';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import logo from '../../img/Time Square.svg';

const Header = () => {
  const { name } = useSelector(userSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <header>
      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent="space-between"
        alignItems="stretch"
        className={'button_entry'}>
        <Grid item xs={4}>
          <div className={'logo'} onClick={() => navigate('../')}>
            <img src={logo} alt="logo" height={'100%'} /> Plan your day
          </div>
        </Grid>
        {name ? (
          <Grid item xs={4}>
            <Grid container spacing={2}>
              <Grid item xs={5}>
                {name}
              </Grid>
              <Grid item xs={5}>
                <Button
                  variant={'text'}
                  onClick={() => {
                    dispatch(logout());
                    navigate('./');
                  }}>
                  Sign Out
                </Button>
              </Grid>
            </Grid>
          </Grid>
        ) : (
          <Grid item xs={4}>
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
          </Grid>
        )}
      </Grid>
    </header>
  );
};

export default Header;
