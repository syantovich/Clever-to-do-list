import React from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  MenuItem,
  TextField,
} from '@mui/material';
import { importance } from '../../constants';
import { toast } from 'react-toastify';
import { db } from '../../services/db';
import { AddPlanType } from './AddPlan.type';
import { uid } from 'uid';
import { useSelector } from 'react-redux';
import { userSelector } from '../../store/user/selector';

const AddPlan = ({
  name,
  setName,
  desc,
  setDesc,
  setImportant,
  important,
  addingDate,
  setAddingDate,
  timeStart,
  setTimeStart,
  setTimeEnd,
  timeEnd,
  plans,
  setPlans,
}: AddPlanType) => {
  const { email } = useSelector(userSelector);
  return (
    <Card sx={{ width: 275, paddingLeft: 2, paddingRight: 2 }}>
      <CardContent className={'inputs'}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              id="standard-basic"
              label="Name"
              variant="standard"
              fullWidth
              defaultValue={name}
              onChange={e => setName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="standard-basic"
              label="Description"
              variant="standard"
              fullWidth
              defaultValue={desc}
              onChange={e => setDesc(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              select
              label={'Important'}
              fullWidth
              onChange={e => setImportant(e.target.value)}
              defaultValue={important}>
              {importance.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Date"
              type="date"
              defaultValue={addingDate}
              onChange={e => setAddingDate(e.target.value)}
              sx={{ width: 220 }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="time"
              label="Time Start"
              type="time"
              defaultValue={timeStart}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, // 5 min
              }}
              onChange={e => setTimeStart(e.target.value)}
              sx={{ width: 150 }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="time"
              label="Time End"
              type="time"
              defaultValue={timeEnd}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, // 5 min
              }}
              onChange={e => setTimeEnd(e.target.value)}
              sx={{ width: 150 }}
            />
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Button
          onClick={() => {
            if (timeStart <= timeEnd && name.length) {
              let id = uid(32);
              toast
                .promise(
                  db
                    .updatePlans({
                      email: email!,
                      name,
                      desc,
                      important,
                      date: addingDate,
                      timeStart,
                      timeEnd,
                      id,
                      isFinished: false,
                    })
                    .catch(() => {
                      return db.addPlans({
                        email: email!,
                        name,
                        desc,
                        important,
                        date: addingDate,
                        timeStart,
                        timeEnd,
                        id,
                        isFinished: false,
                      });
                    }),
                  {
                    success: 'Plan added',
                    error: 'Something wrong',
                    pending: 'Loading',
                  },
                )
                .then(() => {
                  let newPlans = { ...plans };
                  // if (newPlans[addingDate.slice(0, 7)]) {
                  //   if (
                  //     !newPlans[addingDate.slice(0, 7)][addingDate.slice(8)]
                  //   ) {
                  //     newPlans[addingDate.slice(0, 7)][addingDate.slice(8)] =
                  //       {};
                  //   }
                  // } else {
                  //   newPlans[addingDate.slice(0, 7)] = {};
                  //   newPlans[addingDate.slice(0, 7)][addingDate.slice(8)] = {};
                  // }
                  newPlans[addingDate.slice(0, 7)][addingDate.slice(8)][id] = {
                    name,
                    desc,
                    important,
                    date: addingDate,
                    timeStart,
                    timeEnd,
                    id,
                  };
                  setPlans(newPlans);
                });
            }
          }}>
          Add
        </Button>
      </CardActions>
    </Card>
  );
};
export default AddPlan;
