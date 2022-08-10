import React from 'react';
import { Stack, Grid } from '@mui/material';
import { ICalendarDay } from './ICalendarDay';
import './CalendarDay.css';
import { MonthArr } from '../../constants';
import { useDispatch } from 'react-redux';
import { setSelected, setWorkMode } from '../../store/workMode/workModeSlice';
import { setGraphs } from '../../store/switchGraphs/switchGraphsSlice';
import { setLoading } from '../../store/isLoading/isLoadingSlice';

const CalendarDay = ({
  dayOfWeek,
  dayOfMonth,
  month,
  isSelected,
  selected,
}: ICalendarDay) => {
  const dispatch = useDispatch();
  return (
    <Stack
      alignItems="center"
      padding={1}
      spacing={1}
      width={70}
      height={50}
      marginLeft={3}
      draggable={false}>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        className={`day_element ${isSelected ? 'selected' : ''}`}
        onClick={() => {
          dispatch(setLoading(true));
          dispatch(setGraphs(false));
          dispatch(setSelected(selected));
          dispatch(setWorkMode(0));
          dispatch(setLoading(false));
        }}>
        <Grid item xs={12}>
          {dayOfMonth}
        </Grid>
        <Grid
          item
          xs={12}
          className={`day_of_week ${dayOfWeek[0] === 'S' ? 'day_of' : ''}`}>
          {dayOfWeek}
        </Grid>
        <Grid item xs={12} className={`month`}>
          {MonthArr[month % 12]}
        </Grid>
      </Grid>
    </Stack>
  );
};
export default CalendarDay;
