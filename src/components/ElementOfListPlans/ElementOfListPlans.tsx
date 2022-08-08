import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { ElementOfListPlansType } from './ElementOfListPlans.type';
import './ElementOfPlans.css';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';
import { db } from '../../services/db';
import { useSelector } from 'react-redux';
import { userSelector } from '../../store/user/selector';

const ElementOfListPlans = ({
  id,
  name,
  desc,
  important,
  addingDate,
  timeStart,
  timeEnd,
  setOpenedPlan,
  isFinished,
  date,
}: ElementOfListPlansType) => {
  const disabled = isFinished || `${addingDate}T${timeEnd}` < date;
  const { email } = useSelector(userSelector);
  return (
    <Box
      className={`${important} element_of_plan ${
        disabled ? 'opacity_element' : ''
      }`}
      onClick={() => {
        setOpenedPlan({
          id,
          name,
          desc,
          important,
          date: addingDate,
          timeStart,
          timeEnd,
          isFinished,
        });
      }}>
      <Grid
        container
        spacing={2}
        justifyContent="space-between"
        alignItems="center">
        <Grid item xs={11}>
          <Typography>
            {name} from {timeStart}
          </Typography>
        </Grid>
        <Grid
          item
          xs={1}
          className={'icon_del'}
          onClick={e => {
            e.stopPropagation();
            toast
              .promise(db.deletePlan(email!, addingDate, id), {
                pending: 'deleting',
                error: 'error',
                success: 'ok',
              })
              .then(result => {
                console.log(result);
              })
              .catch(ev => console.log(ev));
          }}>
          <DeleteIcon />
        </Grid>
        <Grid item xs={1} className={'icon_full'}>
          <OpenInFullIcon />
        </Grid>
      </Grid>
    </Box>
  );
};
export default ElementOfListPlans;
