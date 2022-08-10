import React, { useState } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from '../../store/user/selector';
import { addPlan, deletePlan } from '../../store/plans/plansSlice';
import { getSelected } from '../../store/workMode/selector';
import './AddPlan.css';

const AddPlan = ({ defaultObj, setIsEdit, setOpenedPlan }: AddPlanType) => {
  const { email } = useSelector(userSelector);
  const dispatch = useDispatch();
  const [oldDate, setOldDate] = useState(defaultObj?.date);
  const [uuid, setUuid] = useState(defaultObj?.id || uid(32));
  const [name, setName] = useState(defaultObj?.name || '');
  const [desc, setDesc] = useState(defaultObj?.desc || '');
  const selectedDate = defaultObj?.date || useSelector(getSelected);
  const [important, setImportant] = useState(
    defaultObj?.important || importance[0].value,
  );
  const [addingDate, setAddingDate] = useState(selectedDate);
  const [timeStart, setTimeStart] = useState<string>(
    defaultObj?.timeStart || '09:30',
  );
  const [timeEnd, setTimeEnd] = useState<string>(
    defaultObj?.timeEnd || '10:30',
  );
  return (
    <Card sx={{ minWidth: 275, paddingLeft: 2, paddingRight: 2 }}>
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
              sx={{ width: 150 }}
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
      <CardActions className={'inputs'}>
        <Button
          onClick={() => {
            if (timeStart <= timeEnd && name.length) {
              if (defaultObj?.date !== addingDate && !!defaultObj?.date) {
                toast
                  .promise(db.deletePlan(email!, oldDate!, uuid), {
                    error: 'Save error',
                    success: 'deleted',
                    pending: 'deleting',
                  })
                  .then(() => {
                    setOldDate(addingDate);
                    setIsEdit(false);
                    setOpenedPlan(null);
                    dispatch(deletePlan({ date: oldDate, id: uuid }));
                  });
              }
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
                      id: uuid,
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
                        id: uuid,
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
                  if (!defaultObj?.id) {
                    setUuid(uid(32));
                  }
                  dispatch(
                    addPlan({
                      name,
                      desc,
                      important,
                      date: addingDate,
                      timeStart,
                      timeEnd,
                      id: uuid,
                      isFinished: false,
                    }),
                  );
                });
            } else {
              if (timeStart > timeEnd) {
                toast.error('Time start could be more then time end');
              }

              if (!name.length) {
                toast.error('Name is required');
              }
            }
          }}>
          {defaultObj?.id && 'Save'}
          {!defaultObj?.id && 'Add'}
        </Button>
      </CardActions>
    </Card>
  );
};
export default AddPlan;
