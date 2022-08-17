import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { ElementOfListPlansType } from './ElementOfListPlans.type';
import './ElementOfPlans.css';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import DeleteIcon from '@mui/icons-material/Delete';
import plans from '../../store/plans/plans';
import { observer } from 'mobx-react-lite';
import processingDate from '../../helpers/ProcessingData';

const ElementOfListPlans = observer(
  ({
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
    const disabled =
      isFinished ||
      `${processingDate.getDateWithoutHour(addingDate)}T${timeEnd}` < date;
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
          <Grid item xs={10}>
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
              plans.deletePlan(addingDate, id).catch(ev => console.log(ev));
            }}>
            <DeleteIcon />
          </Grid>
          <Grid item xs={1} className={'icon_full'}>
            <OpenInFullIcon />
          </Grid>
        </Grid>
      </Box>
    );
  },
);
export default ElementOfListPlans;
