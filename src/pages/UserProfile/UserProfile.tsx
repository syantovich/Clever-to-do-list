import React from 'react';
import { userSelector } from '../../store/user/selector';
import { useDispatch, useSelector } from 'react-redux';
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../store/user/userSlice';
import './UserProfile.css';

const UserProfile = () => {
  const { name, email, uid } = useSelector(userSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <section className={'user_profile'}>
      <Card sx={{ width: 500 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Name
          </Typography>
          <Typography variant="h5" component="div">
            {name}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Email
          </Typography>
          <Typography variant="h5" component="div">
            {email}
          </Typography>
          <Typography sx={{ fontSize: 8 }} color="text.secondary" gutterBottom>
            UID
          </Typography>
          <Typography variant="h5" sx={{ fontSize: 8 }} component="div">
            {uid}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            onClick={() => {
              dispatch(logout());
              navigate('../');
            }}>
            Sign Out
          </Button>
        </CardActions>
      </Card>
    </section>
  );
};
export default UserProfile;
