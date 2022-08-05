import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { ElementOfListPlansType } from './ElementOfListPlans.type';
import './ElementOfPlans.css';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';

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
        console.log('cllick');
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
        <Grid item xs={1} className={'icon_edit'}>
          <OpenInFullIcon />
        </Grid>
      </Grid>
    </Box>
  );
};
export default ElementOfListPlans;
