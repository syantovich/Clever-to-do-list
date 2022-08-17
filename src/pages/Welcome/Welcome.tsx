import React from 'react';
import './Welcome.css';
import { Grid, Button } from '@mui/material';
import planImg from '../../img/plans.jpg';
import { useNavigate } from 'react-router-dom';
import user from '../../store/user/user';
import { observer } from 'mobx-react-lite';

const Welcome = observer(() => {
  const navigator = useNavigate();
  return (
    <div className={'wrapper_welcome'}>
      <Grid
        container
        spacing={2}
        direction={'column'}
        justifyContent="center"
        alignItems="center">
        <Grid item xs={2} className={'img'}>
          <img src={planImg} alt="planning your day" />
        </Grid>
        <Grid item xs={2} className={'text'}>
          <h3>PLAN YOUR EVENTS AHEAD OF TIME</h3>
        </Grid>
        <Grid item xs={2}>
          <Button
            variant="outlined"
            className={'explore'}
            onClick={() => {
              if (user.name) {
                navigator('plans');
              } else {
                navigator('signin');
              }
            }}>
            Explore
          </Button>
        </Grid>
      </Grid>
    </div>
  );
});
export default Welcome;
