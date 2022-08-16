import React, { memo } from 'react';
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
import { AddPlanType } from './AddPlan.type';
import './AddPlan.css';
import useAddPlan from '../../hooks/useAddPlan';

const AddPlan = memo(
  ({ defaultObj, setIsEdit, setOpenedPlan }: AddPlanType) => {
    const {
      name,
      getName,
      addPlan,
      desc,
      getDesc,
      important,
      getImportant,
      addingDate,
      getAddingDate,
      timeStart,
      timeEnd,
      getTimeStart,
      getTimeEnd,
    } = useAddPlan({ defaultObj, setIsEdit, setOpenedPlan });
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
                onChange={getName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="standard-basic"
                label="Description"
                variant="standard"
                fullWidth
                defaultValue={desc}
                onChange={getDesc}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                select
                label={'Important'}
                onChange={getImportant}
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
                onChange={getAddingDate}
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
                onChange={getTimeStart}
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
                onChange={getTimeEnd}
                sx={{ width: 150 }}
              />
            </Grid>
          </Grid>
        </CardContent>
        <CardActions className={'inputs'}>
          <Button onClick={addPlan}>
            {defaultObj?.id && 'Save'}
            {!defaultObj?.id && 'Add'}
          </Button>
        </CardActions>
      </Card>
    );
  },
);
AddPlan.displayName = 'AddPlan';
export default AddPlan;
