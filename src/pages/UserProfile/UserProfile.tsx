import React from 'react';
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './UserProfile.css';
import user from '../../store/user/user';
import { observer } from 'mobx-react-lite';

const UserProfile = observer(() => {
  const navigate = useNavigate();
  return (
    <section className={'user_profile'}>
      <Card sx={{ width: 500 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Name
          </Typography>
          <Typography variant="h5" component="div">
            {user.name}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Email
          </Typography>
          <Typography variant="h5" component="div">
            {user.email}
          </Typography>
          <Typography sx={{ fontSize: 8 }} color="text.secondary" gutterBottom>
            UID
          </Typography>
          <Typography variant="h5" sx={{ fontSize: 8 }} component="div">
            {user.uid}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            onClick={() => {
              user.signOut().then(() => {
                navigate('../');
              });
            }}>
            Sign Out
          </Button>
        </CardActions>
      </Card>
    </section>
  );
});
export default UserProfile;
