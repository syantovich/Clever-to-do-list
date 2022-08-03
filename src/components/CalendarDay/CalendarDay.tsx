import React from 'react';
import { Stack, Grid } from '@mui/material';
import { ICalendarDay } from '../../Modal/ICalendarDay';
import './CalendarDay.css';
import { MonthArr } from '../../constants';

const CalendarDay = ({
  dayOfWeek,
  dayOfMonth,
  month,
  isSelected,
  onClick,
  selected,
}: ICalendarDay) => {
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
        onClick={() => onClick(selected)}>
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
          {MonthArr[month]}
        </Grid>
      </Grid>
    </Stack>
  );
};
export default CalendarDay;
